"use client";
import { ReactNode, useEffect, useState } from "react";
import web_development from "../../../public/Assets/web_development.avif";
import { FaStar } from "react-icons/fa";
import { FaStarHalf } from "react-icons/fa";
import { MdFormatListBulletedAdd } from "react-icons/md";
import { FaRupeeSign } from "react-icons/fa";
import { ICourse } from "../../redux/interfaces/Course/generalInterface";
import { useNavigate } from "react-router-dom";
import { useGetThumbnailImagesPreSignedUrlMutation } from "../../redux/features/course/courseApi";

type Props = {
  // courseCategory: ICourse[];
  courseCategory: ICourse;
};

const CourseCard = ({ courseCategory }: Props): ReactNode => {
  console.log("courseCategory", courseCategory);
  console.log(
    "courseCategory.modules ===>",
    courseCategory.modules.reduce((acc, curr) => {
      return acc + curr.videos.length;
    }, 0)
  );

  const [getThumbnailImagesPreSignedUrl, { data, isSuccess }] =
    useGetThumbnailImagesPreSignedUrlMutation();
  const navigate = useNavigate();
  const [imgUrl, setImagUrl] = useState("");
  useEffect(() => {
    getThumbnailImagesPreSignedUrl({
      thumbnail: courseCategory.thumbnail,
    });
  }, []);
  useEffect(() => {
    if (isSuccess) {
      console.log("data ******", data);
      setImagUrl(data?.data as string);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);

  console.log("courseCategory", courseCategory);
  return (
    <div
      key={courseCategory.courseName}
      className="flex flex-col w-[300px] rounded-2xl overflow-hidden dark:bg-c_color-colorSeven shadow-lg pb-4 space-y-2"
    >
      <img
        src={imgUrl || web_development}
        alt=""
        className="w-full h-[200px]"
        onClick={() => {
          navigate("/course_single_page", {
            state: { courseData: courseCategory },
          });
        }}
      />
      <h4
        className="text-[#fffff] mt-2 text-xl ps-4 cursor-pointer"
        onClick={() => {
          navigate("/course_single_page", {
            state: { courseData: courseCategory },
          });
        }}
      >
        {courseCategory.courseName}
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
            <h3>{courseCategory.price}</h3>
          </div>
        </div>
        <div className="flex px-4 justify-between">
          <div className="flex gap-1 items-center">
            <MdFormatListBulletedAdd size={20} />
            <h4>
              {courseCategory.modules.reduce((acc, curr) => {
                return acc + curr.videos.length;
              }, 0)}
            </h4>
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
  );
};

export default CourseCard;

{
  /* <div className="flex justify-start gap-3  w-full overflow-x-scroll">
  {courseCategory.map((item, index) => (
    <div
      key={index}
      className="flex flex-col w-[300px] rounded-2xl overflow-hidden dark:bg-c_color-colorSeven shadow-lg pb-4 space-y-2"
    >
      <img
        src={
          // getThumbnailImagesPreSignedUrl({ thumbnail: item.thumbnail }) ||
          imgUrl || web_development
        }
        alt=""
        className="w-full h-[200px]"
        onClick={() => {
          navigate("/course_single_page", {
            state: { courseData: item },
          });
        }}
      />
      <h4
        className="text-[#fffff] mt-2 text-xl ps-4 cursor-pointer"
        onClick={() => {
          navigate("/course_single_page", {
            state: { courseData: item },
          });
        }}
      >
        {item.courseName}
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
            <h3>{item.price}</h3>
          </div>
        </div>
        <div className="flex px-4 justify-between">
          <div className="flex gap-1 items-center">
            <MdFormatListBulletedAdd size={20} />
            <h4>{item.modules.map((module) => module.videos.length)}</h4>
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
</div>; */
}
