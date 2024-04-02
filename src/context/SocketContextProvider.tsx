import React, { useEffect, useState, useContext, createContext } from "react";
import { io, Socket } from "socket.io-client";
import useGetUser from "../hooks/useGetUser";
import {
  ClientToServerEvents,
  ServerToClientEvents,
  SocketContextType,
} from "./Types";
import notificationSound from "../assets/notification.mp3";
import { ICourse } from "../redux/interfaces/Course/generalInterface";
import { IInstructorRequest } from "../redux/interfaces/Admin/InstructorRequest";

const SocketContext = createContext<SocketContextType>({
  socket: null,
  socketStore: { addedCourses: [], instructorRequests: [] },
  notificationStore: [{ message: "", url: "" }],
  setNotificationStore: () => {},
});

export const useSocketContext = () => {
  return useContext(SocketContext);
};

type Props = {
  children?: React.ReactNode;
};

const SocketContextProvider = ({ children }: Props) => {
  const user = useGetUser();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [socket, setSocket] = useState<any>(null);

  const [socketStore, setSocketStore] = useState<{
    addedCourses: ICourse[];
    instructorRequests: IInstructorRequest[];
  }>({
    addedCourses: [],
    instructorRequests: [],
  });

  const [notificationStore, setNotificationStore] = useState<
    { message: string; url: string }[]
  >([{ message: "", url: "" }]);

  const sound = new Audio(notificationSound);

  useEffect(() => {
    if (user._id) {
      const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
        import.meta.env.VITE_SOCKETURL,
        {
          query: { userId: user._id },
        }
      );

      //user logout
      socket.on("serverSideLogout", () => {
        sound.play();
      });

      // course added by instructor
      socket.on("fromServerCourseAdded", (e) => {
        sound.play();
        setSocketStore({
          ...socketStore,
          addedCourses: [...socketStore.addedCourses, e],
        });
        setNotificationStore([
          {
            message: "A new course has been added",
            url: `/admin/dash_bord/courses`,
          },
          ...notificationStore,
        ]);
      });

      // instructor request for admin
      socket.on(
        "fromServerInstructorRequestSubmitted",
        (instructroAgreement) => {
          sound.play();
          console.log("instructor agreement ", instructroAgreement);
          setSocketStore({
            ...socketStore,
            instructorRequests: [
              ...socketStore.instructorRequests,
              instructroAgreement,
            ],
          });
          setNotificationStore([
            {
              message:
                "A Request from a user to be instructor has been registered",
              url: `/admin/dash_bord/instructors`,
            },
            ...notificationStore,
          ]);
        }
      );
      // instroctor approval or rejection by admin
      socket.on("fromServerInstrctorRequestApproval",(message)=>{
        sound.play()
        console.log("(*^*)",message)
         setNotificationStore([
           {
             message,
             url: `/`,
           },
           ...notificationStore,
         ]);
      })
      //
      setSocket(socket);
      setSocketStore({ ...socketStore });
      setNotificationStore([...notificationStore]);
      return () => {
        socket.close();
      };
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [user]);

  return (
    <SocketContext.Provider
      value={{ socket, socketStore, notificationStore, setNotificationStore }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export default SocketContextProvider;
