export interface IUser {
  _id?: string;
  name: string;
  email: string;
  password: string;
  avatar?: {
    public_id: string;
    url: string;
  };
  role?: "user" | "instructor" | "admin";
  status?: "active" | "frozen";
  isVerified?: boolean;
  courses?: Array<{ courseId: string }>;
  enrolledCourses?: Array<{ courseId: string }>;
}

export interface IUserState {
  isLoading: boolean;
  userData: IUser;
}

export type RegistrationRes = {
  //register
  success: boolean;
  message: string;
};

export type RegistrationReq = {
  //register
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export interface ILoginReq {
  email: string;
  password: string;
}

export interface ILoginRes {
  user: IUser;
  message: string;
}

export interface IForgotPasswordEmailSubmissionReq {
  email: string;
}

export interface IForgotPasswordEmailSubmissionRes {
  status: boolean;
  data?:{
    status:boolean,
    message:string
  };
  message?:string
}
