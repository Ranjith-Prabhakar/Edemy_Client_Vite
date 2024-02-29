import toast from "react-hot-toast";
import { IForgotPasswordEmailSubmissionRes } from "../redux/interfaces/authApi";

const responseErrorCatch = (error:unknown) => {
  if (error) {
    const newError = error as IForgotPasswordEmailSubmissionRes;
    toast.error(newError.data.message);
  }
}

export default responseErrorCatch