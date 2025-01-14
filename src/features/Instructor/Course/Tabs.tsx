import { useState } from "react";

import Model from "../../../components/Modal/model";
type Props = {
  setStepper: React.Dispatch<React.SetStateAction<number>>;
  stepper: number;
  setModuleVideos: React.Dispatch<
    React.SetStateAction<Record<string, string | Record<string, string>[]>[]>
  >;
  setSubmit: React.Dispatch<React.SetStateAction<boolean>>;
};
const Tabs = ({ setStepper, stepper, setModuleVideos, setSubmit }: Props) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex justify-start relative pt-5">
      <button
        className={` ${
          stepper === 1
            ? "bg-c_color-colorSix text-white"
            : "bg-c_color-colorOne text-slate-300"
        } hover:scale-110 rounded-t-md  px-5 text-black font-bold py-3 transition-all ease duration-400`}
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
        } hover:scale-110 rounded-t-md  px-5 text-black font-bold py-1 transition-all ease duration-400`}
        onClick={() => {
          setStepper(2);
        }}
      >
        Add Modules
      </button>
      <button
        className="bg-c_color-colorSeven text-white ms-auto rounded-md mb-1 hover:scale-110 hover:opacity-80 px-5  font-bold py-1 transition-all ease duration-400"
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
            setModuleVideos={setModuleVideos}
            setSubmit={setSubmit}
          />
        </div>
      )}
    </div>
  );
};

export default Tabs;

