export interface IGetOnlineUsersRes {
  result: {
    data?: {
      onlineUsers: [{ _id: string; name: string }];
      allUsers: [{ _id: string; name: string }];
    };
    message: string;
    success: boolean;
  };
}

export interface IGetOnlineUsersReq {
  courseId: string;
}
