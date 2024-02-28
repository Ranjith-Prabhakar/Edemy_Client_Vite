import { PiNotePencilBold } from "react-icons/pi";
import { BiSupport } from "react-icons/bi";
import { LiaCertificateSolid } from "react-icons/lia";

const WhyUs = () => {
  return (
    <div className="flex flex-col mt-[8%]">
      <h1 className="text-5xl font-extrabold text-center italic">
        Why Choose <span className="text-[#FFD700]"> Us </span>
      </h1>
      <div className="grid grid-cols-3 gap-5 mt-16 ">
        <div className="flex flex-col gap-5 items-center ">
          <PiNotePencilBold size={45} color="#FFD700" />
          <h3 className="text-center font-bold text-3xl italic">
            Quick Learning
          </h3>
          <p className="text-start me-4  leading-7 text-lg italic opacity-85">
            Empower your growth with Quick Learning – concise, focused modules
            for rapid skill acquisition. Tailored for efficiency, our platform
            ensures swift comprehension, letting you learn at your own pace
            seamlessly.
          </p>
        </div>

        <div className="flex flex-col items-center gap-5 ">
          <BiSupport size={45} color="#FFD700" />
          <h3 className="text-center font-medium text-3xl italic">Al Time Support</h3>
          <p className="text-start me-4 leading-7 text-lg italic opacity-85">
            24/7 Support: Elevate your learning experience with our
            always-available support. Our dedicated team ensures immediate
            assistance, making your educational journey seamless, responsive,
            and stress-free. Choose uninterrupted guidance.
          </p>
        </div>

        <div className="flex flex-col items-center gap-5  ">
          <LiaCertificateSolid size={45} color="#FFD700" />
          <h3 className="text-center font-medium text-3xl italic">Certificate</h3>
          <p className="text-start  leading-7 text-lg italic opacity-85">
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
