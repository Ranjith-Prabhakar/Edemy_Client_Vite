import { PiNotePencilBold } from "react-icons/pi";
import { BiSupport } from "react-icons/bi";
import { LiaCertificateSolid } from "react-icons/lia";

const WhyUs = () => {
  return (
    <div className="mt-12  max-w-[90%] w-full m-auto rounded-lg p-[25px] flex flex-col">
      <h1 className="text-5xl font-semibold text-center">
        Why Choose <span className="text-[#FFD700]"> Us </span>
      </h1>
      <div className="grid grid-cols-3 gap-5 mt-16 ">
        <div className="flex flex-col items-center space-y-2">
          <PiNotePencilBold size={35} color="#FFD700" />
          <h3 className="text-center font-medium text-2xl">Quick Learning</h3>
          <p className="text-start me-4  leading-7 text-gray-400">
            Empower your growth with Quick Learning – concise, focused modules
            for rapid skill acquisition. Tailored for efficiency, our platform
            ensures swift comprehension, letting you learn at your own pace
            seamlessly.
          </p>
        </div>

        <div className="flex flex-col items-center space-y-2">
          <BiSupport size={35} color="#FFD700" />
          <h3 className="text-center font-medium text-2xl">Al Time Support</h3>
          <p className="text-start me-4 leading-7 text-gray-400">
            24/7 Support: Elevate your learning experience with our
            always-available support. Our dedicated team ensures immediate
            assistance, making your educational journey seamless, responsive,
            and stress-free. Choose uninterrupted guidance.
          </p>
        </div>

        <div className="flex flex-col items-center space-y-2">
          <LiaCertificateSolid size={35} color="#FFD700" />
          <h3 className="text-center font-medium text-2xl">Certificate</h3>
          <p className="text-start  leading-7 text-gray-400">
            24/7 Support: Elevate your learning experience with our
            always-available support. Our dedicated team ensures immediate
            assistance, making your educational journey seamless, responsive,
            and stress-free. Choose uninterrupted guidance.
          </p>
        </div>
      </div>
    </div>
  );
};

export default WhyUs;
