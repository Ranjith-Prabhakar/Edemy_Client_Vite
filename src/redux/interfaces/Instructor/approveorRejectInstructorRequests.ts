import { IInstructorAgreement } from "./generalInterfaces";

export interface IapproveorRejectInstructorRequestsReq {
  agreementId: string;
  userId: string;
  action: "approved" | "rejected";
}
export interface IapproveorRejectInstructorRequestsRes {
  success: boolean;
  message: string;
  status?:number;
  data?: IInstructorAgreement | IInstructorAgreement[] | null;
}
