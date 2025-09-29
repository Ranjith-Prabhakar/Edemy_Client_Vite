import CourseCard from "../../../components/Card/CourseCard";
import { useOurBestCourse } from "./hook";

const OurBestCourses = () => {
  const { navigate, courseCategory } = useOurBestCourse();
  return (
    <div className="flex flex-col items-center mt-[8%] overflow-x-scroll">
      <h1 className="text-3xl text-center p-1 400px:p-0 400px:text-start 400px:text-5xl font-bold italic">
        Find the <span className="text-[#FFD700]"> best course </span>
        for your needs
      </h1>

      <div className="mt-8 400px:mt-16 ">
        <div className="flex flex-col  400px:flex-row  overflow-x-scroll gap-4 ">
          {courseCategory.map((item, index) => (
            <CourseCard courseCategory={item} key={index} />
          ))}
        </div>
        <div className="text-center mt-6 ">
          <button
            className="bg-transparent border  border-[#FFD700] px-3 py-1 rounded"
            onClick={() =>
              navigate("/category/all_category", {
                state: { sort: "A-Z", filter: "date" },
              })
            }
          >
            View more
          </button>
        </div>
      </div>
    </div>
  );
};

export default OurBestCourses;
