export interface IGetOnlineUsersRes {
  result: {
    data?: [{ _id: string; name: string }];
    message: string;
    success: boolean;
  };
}

export interface IGetOnlineUsersReq {
  courseId: string;
}
 