import { useState } from "react";

import Model from "../../utils/model";
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
    <div className="flex gap-2 justify-around  p-5 relative">
      <button
        className={` ${
          stepper === 1 ? "bg-white" : "bg-gray-500"
        } dark:hover:bg-c_color-colorTwo rounded-md px-5 text-black font-bold py-1`}
        onClick={() => {
          setStepper(1);
        }}
      >
        Add Course Data
      </button>
      <button
        className={` ${
          stepper === 2 ? "bg-white" : "bg-gray-500"
        } dark:hover:bg-c_color-colorTwo rounded-md px-5 text-black font-bold py-1`}
        onClick={() => {
          setStepper(2);
        }}
      >
        Add Modules
      </button>
      <button
        className="bg-gray-500 dark:hover:bg-c_color-colorTwo rounded-md px-5 text-black font-bold py-1"
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
