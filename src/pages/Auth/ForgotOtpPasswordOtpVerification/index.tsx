import { BsShieldLockFill } from "react-icons/bs";
import { useForgotOtpPasswordOtpVerification } from "./hook";

const ForgotOtpPasswordOtpVerification = (): JSX.Element => {
  const { otp, inputRefs, handleChange, handleClick, handleKeyDown } =
    useForgotOtpPasswordOtpVerification();
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex  flex-col justify-center items-center   bg-c_color-colorOne text-white border p-6 pb-12 rounded-md shadow-sm">
        <BsShieldLockFill size={60} className="mb-2 " />
        <h1 className="text-3xl font-bold mb-5 ">Verify Otp</h1>
        <div className="flex gap-2">
          {otp.map((value, index) => (
            <input
              className="text-black w-[75px] h-[75px] rounded-lg focus focus:ring-1 focus:ring-[#FFD700]"
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
      </div>
    </div>
  );
};

export default ForgotOtpPasswordOtpVerification;
