import React, { useEffect, useState, useContext, createContext } from "react";
import {io,Socket} from "socket.io-client";
import useGetUser from "../hooks/useGetUser";
const SocketContext = createContext(null);

export const useSocketContext = () => {
  return useContext(SocketContext);
};

type Props = {
  children?: React.ReactNode;
};

export interface ServerToClientEvents {
  serverSideLogin: (message: string) => void;
  serverSideLogout: (message: string) => void;
}
export interface ClientToServerEvents {
  clientSideLogin: (message: string) => void;
}

const SocketContextProvider = ({ children }: Props) => {
  const user = useGetUser();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [socket, setSocket] = useState<any>(null);
  const [store, setStore] = useState({});

  useEffect(() => {
    if (user._id) {
      console.log("from socket",user)
      const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
        import.meta.env.VITE_SOCKETURL,
        {
          query: { userId: user._id },
        }
      );
      socket.on("serverSideLogout", (e) => {
        console.log("serverSideLogout ****", e);
      });
      setSocket(socket);
      setStore({ ...store, test: "test" });

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
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export default SocketContextProvider;
