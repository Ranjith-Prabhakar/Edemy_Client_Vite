export interface IEnrollReq {
  courseName: string;
  price: string;
}

export interface IEnrollRes {
  status: number;
  message: string;
  data?: string;
}
