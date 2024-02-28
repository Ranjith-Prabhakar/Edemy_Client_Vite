import CourseCard from "../utils/CourseCard";
import { useGetCoursesForUserQuery } from "../../redux/features/course/courseApi";
import { ICourse } from "../../redux/interfaces/Course/generalInterface";
import { useEffect, useState } from "react";

const OurBestCourses = () => {
  const { data, isSuccess } = useGetCoursesForUserQuery();
  const [courseCategory, setCourseCategory] = useState<ICourse[]>([]);

  useEffect(() => {
    if (isSuccess) {
      const coursesData = data.data as ICourse[];
      console.log("data", data);
      console.log("coursesData", coursesData);
      setCourseCategory(coursesData);
    }
  }, [isSuccess]);
  return (
    <div className="flex flex-col items-center w-full mt-[8%]">
      <h1 className="text-5xl font-bold italic">
        Find the <span className="text-[#FFD700]"> best course </span>
        for your needs
      </h1>

      <div className="w-full mt-16">
        <CourseCard courseCategory={courseCategory} />
        <div className="text-center mt-6">
          <button className="bg-transparent border  border-[#FFD700] px-3 py-1 rounded">
            View more
          </button>
        </div>
      </div>
    </div>
  );
};

export default OurBestCourses;
