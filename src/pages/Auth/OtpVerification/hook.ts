import { useNavigate } from "react-router-dom";
import {
  useCreateUserMutation,
  useResendOtpMutation,
} from "../../../redux/features/auth/authApi";
import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { catchError } from "../../../utils/catchError";

export function useOtpVerification() {
  const [timer, serTimer] = useState("");
  const [resendOtp, { isSuccess: resendOtpIsSuccess, data: resendOtpData }] =
    useResendOtpMutation();
  const [createUser, { isLoading, isSuccess, isError, error }] =
    useCreateUserMutation();
  const navigate = useNavigate();
  const length = 4;
  const [otp, setOtp] = useState(new Array(length).fill(""));

  const inputRefs = useRef<HTMLInputElement[]>([]);

  useEffect(() => {
    if (resendOtpIsSuccess) console.log("resendOtpData", resendOtpData);
  }, [resendOtpIsSuccess]);

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  useEffect(() => {
    if (isLoading) {
      console.log("loading...");
    } else if (isSuccess) {
      navigate("/auth/Login");
      toast.success("user has been created successfully , please login");
    } else if (isError) {
      console.log("error", error);

      toast.error("verification code mis-matches");
    }
  }, [isError, isLoading, isSuccess, navigate, error]);

  const onSubmit = async (newOtp: string) => {
    try {
      await createUser({ verificationCode: newOtp });
    } catch (error: unknown) {
      catchError(error);
    }
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

  useEffect(() => {
    const handleTimer = async () => {
      // Set the initial minute and second values
      let minutes = 1;
      let seconds = 0;

      // set  the initial time
      formatTime(minutes, seconds);

      // Create an interval that decrements the time every second
      const timerInterval = setInterval(() => {
        // Decrement the seconds
        seconds--;

        // If seconds reach zero, decrement minutes and reset seconds to 59
        if (seconds < 0) {
          minutes--;
          seconds = 5;
        }

        // set the updated time
        formatTime(minutes, seconds);

        // If the timer reaches zero, stop the interval
        if (minutes === 0 && seconds === 0) {
          clearInterval(timerInterval);
          serTimer("Timer expired!");
        }
      }, 1000);

      // Helper function to format time
      function formatTime(minutes: number, seconds: number) {
        const timeString = `${minutes.toString().padStart(2, "0")}:${seconds
          .toString()
          .padStart(2, "0")}`;
        serTimer(timeString);
      }
    };
    handleTimer();
  }, []);

  useEffect(() => {
    if (resendOtpIsSuccess) {
      toast.success("OTP has been re-sent to the Mail");
      const handleTimer = async () => {
        // Set the initial minute and second values
        let minutes = 1;
        let seconds = 0;

        // set  the initial time
        formatTime(minutes, seconds);

        // Create an interval that decrements the time every second
        const timerInterval = setInterval(() => {
          // Decrement the seconds
          seconds--;

          // If seconds reach zero, decrement minutes and reset seconds to 59
          if (seconds < 0) {
            minutes--;
            seconds = 5;
          }

          // set the updated time
          formatTime(minutes, seconds);

          // If the timer reaches zero, stop the interval
          if (minutes === 0 && seconds === 0) {
            clearInterval(timerInterval);
            serTimer("Timer expired!");
          }
        }, 1000);

        // Helper function to format time
        function formatTime(minutes: number, seconds: number) {
          const timeString = `${minutes.toString().padStart(2, "0")}:${seconds
            .toString()
            .padStart(2, "0")}`;
          serTimer(timeString);
        }
      };
      handleTimer();
    }
  }, [resendOtpIsSuccess]);

  return {
    otp,
    timer,
    resendOtp,
    inputRefs,
    handleChange,
    handleClick,
    handleKeyDown,
  };
}
