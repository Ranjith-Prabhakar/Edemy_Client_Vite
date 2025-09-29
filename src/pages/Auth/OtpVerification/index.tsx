import { BsShieldLockFill } from "react-icons/bs";
import { useOtpVerification } from "./hook";

const OtpVerification = (): JSX.Element => {
  const {
    otp,
    timer,
    resendOtp,
    inputRefs,
    handleChange,
    handleClick,
    handleKeyDown,
  } = useOtpVerification();

  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <div className="flex  flex-col justify-center items-center  p-6 pb-12 rounded-md shadow-lg bg-[#063134]">
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
