import { useState } from "react";

import Model from "../../../components/Modal/model";
type Props = {
  setStepper: React.Dispatch<React.SetStateAction<number>>;
  stepper: number;
  setCourseData: React.Dispatch<
    React.SetStateAction<{
      courseName: string;
      discription: string;
      tags: string;
      thumbnail: string;
      duration: string;
      moduleNo: string;
      moduleTittle: string;
      videoTittle: string;
      videoNo: string;
      videoUrl: string;
    }>
  >;
  setModuleVideos: React.Dispatch<
    React.SetStateAction<Record<string, string | Record<string, string>[]>[]>
  >;
};
const Tabs = ({
  setStepper,
  stepper,
  setCourseData,
  setModuleVideos,
}: Props) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex justify-start relative">
      <button
        className={` ${
          stepper === 1
            ? "bg-c_color-colorSix text-white"
            : "bg-c_color-colorOne text-slate-300"
        } dark:hover:text-[18px] rounded-t-md  px-5 text-black font-bold py-1 transition-all ease duration-700`}
        onClick={() => {
          setStepper(1);
        }}
      >
        Add Course Data
      </button>
      <button
        className={` ${
          stepper === 2
            ? "bg-c_color-colorSix text-white"
            : "bg-c_color-colorOne text-slate-300"
        } dark:hover:text-[18px] rounded-t-md  px-5 text-black font-bold py-1 transition-all ease duration-700`}
        onClick={() => {
          setStepper(2);
        }}
      >
        Add Modules
      </button>
      <button
        className="dark:bg-c_color-colorSeven dark:text-white ms-auto rounded-md mb-1 dark:hover:text-[17px] hover:opacity-80 px-5 text-black font-bold py-1 transition-all ease duration-700"
        onClick={() => {
          setOpen(true);
        }}
      >
        Submit
      </button>
      {open && (
        <div className="absolute z-10">
          <Model
            setOpen={setOpen}
            setCourseData={setCourseData}
            setModuleVideos={setModuleVideos}
          />
        </div>
      )}
    </div>
  );
};

export default Tabs;
