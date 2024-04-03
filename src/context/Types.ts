import { Socket } from "socket.io-client";
import { ICourse } from "../redux/interfaces/Course/generalInterface";
import { IInstructorRequest } from "../redux/interfaces/Admin/InstructorRequest";

export interface ServerToClientEvents {
  serverSideLogin: (message: string) => void;
  serverSideLogout: (message: string) => void;
  fromServerCourseAdded: (course: ICourse, message: string) => void;
  fromServerInstructorRequestSubmitted: (agreement: IInstructorRequest) => void;
  fromServerInstrctorRequestApproval: (message: string) => void;
  fromServerCourseApproved: (message: string) => void;
  fromServerCourseApprovedNotificationForAllUsers: (message: string) => void;
}

export interface ClientToServerEvents {
  clientSideLogin: (message: string) => void;
}

export type SocketContextType = {
  socket: Socket<ServerToClientEvents, ClientToServerEvents> | null;
  socketStore: {
    addedCourses: ICourse[];
    instructorRequests: IInstructorRequest[];
  };
  notificationStore: { message: string; url: string }[];
  setNotificationStore: React.Dispatch<
    React.SetStateAction<
      {
        message: string;
        url: string;
      }[]
    >
  >;
};
