"use client";
import React, { ReactNode } from "react";
import web_development from "../../../public/Assets/web_development.avif";
import { FaStar } from "react-icons/fa";
import { FaStarHalf } from "react-icons/fa";
import { MdFormatListBulletedAdd } from "react-icons/md";
import { FaRupeeSign } from "react-icons/fa";

interface Course {
  name: string;
  url: string;
  thumbnail: string;
  trainer: string;
  duration: string;
}

type Props = {
  courseCategory: Array<{
    name: string;
    courses: Array<Course>;
  }>;
};

const CourseCard = ({ courseCategory }: Props): ReactNode => {
  return (
    <div className="flex justify-between gap-3  w-full">
      {courseCategory.map((item, index) => (
        <div
          key={index}
          className="flex flex-col w-[300px] rounded-2xl overflow-hidden bg-gray-950  pb-4 space-y-2"
        >
          <img src={web_development} alt="" className="w-full h-[200px]" />
          <h4 className="text-[#fffff] mt-2 text-xl ps-4">
            {item.courses[0].name}
          </h4>
          <div className="space-y-2">
            <div className="flex justify-between px-4">
              <div className="flex ">
                <FaStar color={"#fffff"} />
                <FaStar color={"#fffff"} />
                <FaStar color={"#fffff"} />
                <FaStar color={"#fffff"} />
                <FaStarHalf color={"#fffff"} />
              </div>
              <div className="flex items-center ">
                <FaRupeeSign />
                <h3>  5000/-</h3>
              </div>
            </div>
            <div className="flex px-4 justify-between">
              <div className="flex gap-1 items-center">
                <MdFormatListBulletedAdd size={20} />
                <h4> 12 Lessons</h4>
              </div>
              <div className="">
                <button className="bg-white text-gray-950 py-1 px-2 rounded-sm font-semibold">
                  Enroll Now
                </button>
              </div>
            </div>
            <div className=""></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CourseCard;
