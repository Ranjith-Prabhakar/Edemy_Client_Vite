import { FaStar, FaStarHalfAlt } from "react-icons/fa";

const ReviewAndRating = () => {
  return (
    <div className="dark:bg-c_color-colorSix px-8 py-10 rounded-b-md w-full flex justify-between gap-2">
      <div className="overflow-scroll capitalize px-10 py-2 w-full rounded-lg text-gray-300 ">
        very good course
      </div>
      <div className="flex shadow-2xl px-10 py-5 rounded-md dark:bg-[#062e2a]">
        <FaStar size={40} color="#dec314" />
        <FaStar size={40} color="#dec314" />
        <FaStar size={40} color="#dec314" />
        <FaStar size={40} color="#dec314" />
        <FaStarHalfAlt size={40} color="#dec314" />
      </div>
    </div>
  );
};

export default ReviewAndRating;
