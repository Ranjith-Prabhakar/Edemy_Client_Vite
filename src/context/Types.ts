import { Socket } from "socket.io-client";
import { ICourse } from "../redux/interfaces/Course/generalInterface";

export interface ServerToClientEvents {
  serverSideLogin: (message: string) => void;
  serverSideLogout: (message: string) => void;
  fromServerCourseAdded: (course: ICourse) => void;
}

export interface ClientToServerEvents {
  clientSideLogin: (message: string) => void;
}

export type SocketContextType = {
  socket: Socket<ServerToClientEvents, ClientToServerEvents> | null;
  socketStore: {
    addedCourses: ICourse[];
  };
  notificationStore:{message:string,url:string}[]
};
