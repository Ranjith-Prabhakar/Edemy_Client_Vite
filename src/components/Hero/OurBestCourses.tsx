import CourseCard from "../Card/CourseCard";
import { useGetCoursesForUserQuery } from "../../redux/features/course/courseApi";
import { ICourse } from "../../redux/interfaces/Course/generalInterface";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const OurBestCourses = () => {
  const navigate = useNavigate()
  const { data, isSuccess } = useGetCoursesForUserQuery();
  const [courseCategory, setCourseCategory] = useState<ICourse[]>([]);

  useEffect(() => {
    if (isSuccess) {
      const coursesData = data.data as ICourse[];
      console.log("data", data);
      console.log("coursesData", coursesData);
      setCourseCategory(coursesData);
    }
  }, [data, isSuccess]);
  return (
    <div className="flex flex-col items-center mt-[8%] overflow-x-scroll">
      <h1 className="text-5xl font-bold italic">
        Find the <span className="text-[#FFD700]"> best course </span>
        for your needs
      </h1>

      <div className=" mt-16 overflow-x-auto ">
        <div className="flex overflow-x-auto gap-4 ">
          {courseCategory.map((item) => (
            <CourseCard courseCategory={item} />
          ))}
        </div>
        <div className="text-center mt-6 ">
          <button
            className="bg-transparent border  border-[#FFD700] px-3 py-1 rounded"
            onClick={() => navigate("/category/all_category")}
          >
            View more
          </button>
        </div>
      </div>
    </div>
  );
};

export default OurBestCourses;
