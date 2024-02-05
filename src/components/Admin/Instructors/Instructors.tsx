import Table from "./Table";
import Requests from "./Requests";
import { useGetInstructorsQuery } from "../../../redux/features/admin/Instructors/instructorsApi";
import { useState } from "react";
const Instructors = () => {
  const [switcher, setSwitcher] = useState(true);
  const { data, isError, isSuccess, error } = useGetInstructorsQuery();

  if (isSuccess) {
    console.log(data);
  } else if (isError) {
    console.log(error);
  }

  return (
    <div className="h-full w-full">
      <div className="flex items-center justify-between">
        <div onClick={() => setSwitcher(!switcher)}>
          <h2 className="font-bold tracking-[2px] text-[25px] text-gray-500 dark:text-gray-400 cursor-pointer">
            Instructors
          </h2>
        </div>
        <div onClick={() => setSwitcher(!switcher)}>
          <h2 className="font-bold tracking-[2px] text-[25px] text-gray-500 dark:text-gray-400 cursor-pointer">
            Requests
          </h2>
        </div>

        <div className="flex gap-2">
          <input type="text" className="bg-gray-800 rounded-md h-[30px]" />
          <button className=" px-3 rounded-sm h-[30px] font-bold dark:bg-gray-700 dark:text-gray-400">
            Search
          </button>
        </div>
      </div>
      {switcher ? <Table /> : <Requests />}
    </div>
  );
};
export default Instructors;
