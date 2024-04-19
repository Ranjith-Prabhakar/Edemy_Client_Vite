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
import { ENotificationMsg } from "../hooks/useInitialNotificationLoader";

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
        setNotificationStore([{ message: "", url: "" }]);
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
            message: ENotificationMsg.courseApprovalRequest,
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
          setSocketStore({
            ...socketStore,
            instructorRequests: [
              instructroAgreement,
              ...socketStore.instructorRequests,
            ],
          });

          setNotificationStore([
            {
              message: ENotificationMsg.instructorRequests,
              url: `/admin/dash_bord/instructors`,
            },
            ...notificationStore,
          ]);
        }
      );
      // instroctor approval or rejection by admin
      socket.on("fromServerInstrctorRequestApproval", () => {
        sound.play();
        setNotificationStore([
          {
            message: ENotificationMsg.instructorRequestApproval,
            url: `/instructor/profile`,
          },
          ...notificationStore,
        ]);
      });
      
      // course approval by admin(to the instructor)
      socket.on("fromServerCourseApproved", () => {
        sound.play();
        setNotificationStore([
          {
            message: ENotificationMsg.courseApprovalApprovance,
            url: `/instructor/profile/mytutorials`,
          },
          ...notificationStore,
        ]);
      });
      // course approval by admin(to every users)
      socket.on(
        "fromServerCourseApprovedNotificationForAllUsers",
        () => {
          sound.play();
          
          setNotificationStore([
            {
              message: ENotificationMsg.courseApprovalApprovanceForAllUsers,
              url: `/`,
            },
            ...notificationStore,
          ]);
        }
      );
      //
      setSocket(socket);
      // setSocketStore({ ...socketStore });
      // setNotificationStore([...notificationStore]);
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
