import { useState } from "react";
import AddCourseData from "./AddCourseData";

type Props = {};

const Courses = (props: Props) => {
  const [stepper, setStepper] = useState(1);
  const [coursesList, setCoursesList] = useState<
    Array<{ [key: string]: string | number }>
  >([]);

  const handleNext = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (stepper < 3) {
      setStepper((prevState) => prevState + 1);
    }
  };

  const handlePrev = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (stepper > 1) {
      setStepper((prevState) => prevState - 1);
    }
  };

  return (
    <div>
      <div className="flex p-3 flex-wrap h-full">
        <div className="flex-auto ">
          <AddCourseData
            setStepper={setStepper}
            stepper={stepper}
            setCoursesList={setCoursesList}
          />
        </div>

        <div className="flex-1 flex-col justify-between h-full">
          <div className="flex justify-center items-center">
            <div
              className={`rounded-full w-11 h-11 text-black font-bold ${
                stepper === 1 ? "bg-green-950" : "bg-slate-500"
              } flex justify-center items-center`}
            >
              <h1>1</h1>
            </div>
            <hr className="w-12 border-[2px]" />
            <div
              className={`rounded-full w-11 h-11 text-black font-bold ${
                stepper === 2 ? "bg-green-950" : "bg-slate-500"
              } flex justify-center items-center`}
            >
              <h1>2</h1>
            </div>
            <hr className="w-12 border-[2px]" />
            <div
              className={`rounded-full w-11 h-11 text-black font-bold ${
                stepper === 3 ? "bg-green-950" : "bg-slate-500"
              } flex justify-center items-center`}
            >
              <h1>3</h1>
            </div>
          </div>

          <div className="p-5 flex flex-col gap-3">
            {coursesList.length > 0 &&
              coursesList.map((item, index) => (
                <li
                  key={index}
                  className="flex gap-2 justify-between items-center cursor-pointer border border-white rounded-sm p-2 text-white"
                >
                  <div>{item?.moduleNo + "."}</div>
                  <div>{item?.moduleName}</div>
                  <div>
                    <button className="bg-slate-500 px-5 text-black font-bold">
                      Watch
                    </button>
                  </div>
                </li>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Courses;
