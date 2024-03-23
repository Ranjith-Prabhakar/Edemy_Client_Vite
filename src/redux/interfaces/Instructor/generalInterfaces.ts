export interface IInstructorAgreement {
  _id: string;
  userId: string;
  userName: string;
  status: "approved" | "pending" | "rejected";
  qualification: string;
  consent: boolean;
  contract: string;
  certificate?: string;
}




