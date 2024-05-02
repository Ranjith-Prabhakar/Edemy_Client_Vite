import carousal from "../../../public/Assets/carousal.png";

const Carousal = () => {
  return (
    <div className="400px:flex items-center justify-between">
      <div className="mt-[8%] w-full 400px:w-2/5 ">
        <img
          src={carousal}
          className="ps-10 400px:p-0 1000px:ms-[80px] w-full h-[80vh] "
          alt="carousal image"
        />
      </div>

      <div className="hidden  400px:flex flex-col 800px:ms-[100px] 1000px:ms-[200px] text-start w-3/5  mt-7">
        <h1 className="font-bold text-4xl 1000px:text-5xl italic  leading-[60px] ">
          Find The Best Courses
          <br /> To Grow Your <span className="text-[#FFD700]">Skills</span>
        </h1>
        <p className="leading-6 mt-5   w-[90%] text-xl italic opacity-85">
          Discover a world of learning with our online courses! Our expert
          tutors are here to guide you as you unlock your potential and grow
          your skills. Learn anytime, anywhere, with interactive lessons and a
          flexible approach. Stay ahead with up-to-date content
        </p>
        <div className="mt-4">
          <div className="flex gap-10 mt-7">
            <div className="flex flex-col">
              <h1 className="font-bold text-4xl text-[#FFD700]">
                100<sup>+</sup>
              </h1>
              <h4>Expert Instructors</h4>
            </div>

            <div className="flex flex-col">
              <h1 className="font-bold text-4xl text-[#FFD700]">
                150<sup>+</sup>
              </h1>
              <h4>Total Courses</h4>
            </div>

            <div className="flex flex-col">
              <h1 className="font-bold text-4xl text-[#FFD700]">
                50K<sup>+</sup>
              </h1>
              <h4>Happy Students</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Carousal;
