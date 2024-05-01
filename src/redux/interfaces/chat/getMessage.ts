export interface IGetMessageReq {
  courseId: string;
}

export interface IMessage {
  _id: string;
  courseId: string;
  createdAt: string;
  updatedAt: string;
  senderId: { _id: string; name: string };
  message: string;
}

export interface IGetMessageRes {
  result: {
    data: {
      messages: IMessage[];
    };
    message: string;
    success: boolean;
  };
}
