export interface IInstructorRequest {
  _id: string;
  userId: string;
  userName: string;
  status: "approved" | "pending" | "rejected";
  qualification: string;
  consent: boolean;
  contract: string;
  certificate:string;
}

export interface IInstructorState {
  isLoading: boolean;
  instructorRequest: IInstructorRequest[];
}
