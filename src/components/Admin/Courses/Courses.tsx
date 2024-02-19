import { useState } from "react";
import CourseTable from "./Tables/CourseTable";
import CourseRequestTable from "./Tables/CourseRequestTable";

const Courses = () => {
  const [toggler, setToggler] = useState(1);
  return (
    <div className="h-full w-full">
      <div className="flex items-center justify-between">
        <div className="flex gap-3">
          <h2
            className="font-bold tracking-[2px] text-[25px] text-gray-500 dark:text-gray-400 cursor-pointer"
            onClick={() => {
              setToggler(1);
            }}
          >
            Courses
          </h2>

          <h2
            className="font-bold tracking-[2px] text-[25px] text-gray-500 dark:text-gray-400 cursor-pointer"
            onClick={() => {
              setToggler(2);
            }}
          >
            Courses Requests
          </h2>
        </div>

        <div className="flex gap-2">
          <input type="text" className="bg-gray-800 rounded-md h-[30px]" />
          <button className=" px-3 rounded-sm h-[30px] font-bold dark:bg-gray-700 dark:text-gray-400">
            Search
          </button>
        </div>
      </div>
      {toggler === 1 && <CourseTable />}
      {toggler === 2 && <CourseRequestTable />}
    </div>
  );
};

export default Courses;
