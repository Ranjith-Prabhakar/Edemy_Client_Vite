import { useNavigate } from "react-router-dom";
import { useForgotPasswordOtpVerificationMutation } from "../../../redux/features/auth/authApi";
import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import responseErrorCatch from "../../../utils/responseErrorToast";

export function useForgotOtpPasswordOtpVerification() {
  const [
    forgotPasswordOtpVerification,
    { isSuccess, data, isError, isLoading, error },
  ] = useForgotPasswordOtpVerificationMutation();

  const navigate = useNavigate();
  const length = 4;
  const [otp, setOtp] = useState(new Array(length).fill(""));

  const inputRefs = useRef<HTMLInputElement[]>([]);

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  useEffect(() => {
    if (isLoading) {
      console.log("loading....");
    } else if (isSuccess) {
      toast.success("enter the new password");
      navigate("/auth/reset_forgot_password");
    } else if (isError) {
      responseErrorCatch(error);
    }
  }, [data, isError, isLoading, isSuccess, navigate, error]);

  const onSubmit = async (newOtp: string) => {
    await forgotPasswordOtpVerification({ verificationCode: newOtp });
  };

  const handleChange = (index: number, e: ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value);
    if (isNaN(newValue)) return;
    const value = newValue.toString();
    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);
    // move to next field
    if (value && index < length - 1 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
    }
    const combinedOtp = newOtp.join("");
    if (combinedOtp.length === length) {
      onSubmit(combinedOtp);
    }
  };

  const handleClick = (index: number) => {
    //to place the cursor at the end when clicking a field
    inputRefs.current[index].setSelectionRange(1, 1);

    // to move if there is any empty field before of the current clicked field
    if (index > 0 && !otp[index - 1]) {
      inputRefs.current[otp.indexOf("")].focus(); //finding the first index of empty
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    // move back by deleting a field
    if (
      e.key === "Backspace" &&
      !otp[index] &&
      index > 0 &&
      inputRefs.current[index - 1]
    ) {
      inputRefs.current[index - 1].focus();
    }
  };

  return {
    otp,
    inputRefs,
    handleChange,
    handleClick,
    handleKeyDown,
  };
}
