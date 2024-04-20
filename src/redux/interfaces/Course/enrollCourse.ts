export interface IEnrollReq {
  courseId: string;
  courseName: string;
  price: string;
  category?: string;
}

export interface IEnrollRes {
  status: number;
  message: string;
  data?: string;
}
