import { useState, ChangeEvent, KeyboardEvent, useRef, useEffect } from "react";
import toast from "react-hot-toast";
import { BsShieldLockFill } from "react-icons/bs";
import { useCreateUserMutation } from "../../redux/features/auth/authApi";
import { useNavigate } from "react-router-dom";
import { catchError } from "../../utils/catchError";
import { useResendOtpMutation } from "../../redux/features/auth/authApi";

const OtpVerification = (): JSX.Element => {
  const [timer, serTimer] = useState("");
  const [resendOtp, { isSuccess:resendOtpIsSuccess, data:resendOtpData }] =
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
      <div>Loading...</div>;
    } else if (isSuccess) {
      navigate("/auth/Login");
      toast.success("user has been created successfully , please login");
    } else if (isError) {
      console.log("error", error);

      toast.error("verification code mis-matches");
      // catchError(error)
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
    const combinedOtp = newOtp.join(""); // at this point if we console log otp it wont updated because it is asyncrounous so that take the newOtp
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

  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <div className="flex  flex-col justify-center items-center  p-6 pb-12 rounded-md shadow-lg dark:bg-[#063134]">
          <BsShieldLockFill size={60} className="mb-2 " />
          <h1 className="text-3xl font-bold mb-5 ">Verify Otp</h1>
          <div className="flex gap-2">
            {otp.map((value, index) => (
              <input
                className="text-black w-[75px] h-[75px] rounded-lg focus focus:ring-1 focus:ring-[#FFD700] font-bold text-center text-2xl"
                key={index}
                type="text"
                ref={(input) =>
                  (inputRefs.current[index] = input as HTMLInputElement)
                }
                value={value}
                onChange={(e) => handleChange(index, e)}
                onClick={() => handleClick(index)}
                onKeyDown={(e) => handleKeyDown(index, e)}
              />
            ))}
          </div>
          <div className="flex items-start  mt-5">
            {timer !== "Timer expired!" ? (
              <>
                <p>Resend OTP in :&nbsp;</p>
                <div className="ms-auto">{timer}</div>
              </>
            ) : (
              <button
                onClick={() => resendOtp()}
                className="border border-[#FFD700] p-1 hover:scale-x-110 px-4 rounded-full"
              >
                Resend OTP{" "}
              </button>
            )}
          </div>
        </div>
      </div>
      

    </>
  );
};

export default OtpVerification;
