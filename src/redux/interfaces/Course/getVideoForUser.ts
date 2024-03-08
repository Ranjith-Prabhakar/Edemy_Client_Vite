export interface IGetVideoForUserReq {
  courseId: string;
  moduleNo:string;
  videoNo:string
  videoName:string;
}

export interface IGetVideoForUserRes{
  success:boolean,
  message:string,
  data?:string
}