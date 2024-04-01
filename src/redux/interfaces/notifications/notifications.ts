import { ICourse } from "../Course/generalInterface";

export enum ENotification {
  "instructorRequests" = "instructorRequests",
  "instructorRequestApproval" = "instructorRequestApproval",
  "courseApprovalRequest" = "courseApprovalRequest",
  "courseApprovalApprovance" = "courseApprovalApprovance",
  "broadCasting" = "broadCasting",
}

export interface INotificationResponse {
  success: boolean;
  message: string;
  data: {
    _id: string;
    userId: string;
    instructorRequests?: boolean;
    instructorRequestApproval?: boolean;
    courseApprovalRequest?: boolean;
    courseApprovalApprovance?: boolean;
    broadCasting?: ICourse[];
  };
}
