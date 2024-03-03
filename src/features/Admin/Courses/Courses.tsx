import { useState } from "react";
import CourseTable from "./Tables/CourseTable";
import CourseRequestTable from "./Tables/CourseRequestTable";
import SearchButton from "../../../components/Buttons/SearchButton";
import DashBordSearch from "../../../components/inputFields/DashBordSearch";

const Courses = () => {
  const [toggler, setToggler] = useState(1);
  return (
    <div className="h-full w-full">
      <div className="flex items-center justify-between mb-1">
        <div className="flex gap-3 ms-3">
          <h2
            className={`${
              toggler === 1
                ? "bg-c_color-colorSeven shadow-md shadow-cyan-600 "
                : ""
            } font-bold tracking-[2px] text-[25px] cursor-pointer px-5 rounded-t-lg`}
            onClick={() => {
              setToggler(1);
            }}
          >
            Courses
          </h2>

          <h2
            className={`${
              toggler === 2
                ? "bg-c_color-colorSeven shadow-md shadow-cyan-600 "
                : ""
            } font-bold tracking-[2px] text-[25px] cursor-pointer px-5 rounded-t-lg`}
            onClick={() => {
              setToggler(2);
            }}
          >
            Courses Requests
          </h2>
        </div>

        <div className="flex gap-2">
          <DashBordSearch/>
          <SearchButton/>
        </div>
      </div>
      {toggler === 1 && <CourseTable />}
      {toggler === 2 && <CourseRequestTable />}
    </div>
  );
};

export default Courses;
