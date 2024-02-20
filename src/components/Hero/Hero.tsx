"use client";
import AboutUs from "./AboutUs";
import OurBestCourses from "./OurBestCourses";
import WhyUs from "./WhyUs";

const Hero = () => {
 
  return (
    <div className="mt-[150px]">
      {/* <hr className="w-1/3 m-auto bg-[#FFD700]  my-10" /> */}
      <AboutUs />
      <OurBestCourses />
      <WhyUs />
    </div>
  );
};

export default Hero;
