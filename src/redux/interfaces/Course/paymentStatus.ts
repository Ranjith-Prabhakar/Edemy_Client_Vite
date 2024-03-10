import { IUser } from "../authApi";

export interface IPaymentStatusReq {
  data: {
    success: boolean;
    message: string;
    data: IUser;
  };
}