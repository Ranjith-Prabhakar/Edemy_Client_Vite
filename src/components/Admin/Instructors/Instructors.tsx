import Table from "./Table";
import Requests from "./Requests";
import { useGetInstructorsQuery } from "../../../redux/features/admin/Instructors/instructorsApi";
import { useState } from "react";
import SearchButton from "../../Buttons/searchButton";
import DashBordSearch from "../../inputFields/DashBordSearch";
const Instructors = () => {
  const [switcher, setSwitcher] = useState(1);
  const { data, isError, isSuccess, error } = useGetInstructorsQuery();

  if (isSuccess) {
    console.log(data);
  } else if (isError) {
    console.log(error);
  }

  return (
    <div className="h-full w-full">
      <div className="flex items-center justify-between mb-1">
        <div className="flex gap-2 ms-2">
          <div onClick={() => setSwitcher(1)}>
            <h2
              className={`${
                switcher === 1
                  ? "bg-c_color-colorSeven shadow-md shadow-cyan-600 "
                  : ""
              } font-bold tracking-[2px] text-[25px] cursor-pointer px-5 rounded-t-lg`}
            >
              Instructors
            </h2>
          </div>
          <div onClick={() => setSwitcher(2)}>
            <h2
              className={`${
                switcher === 2
                  ? "bg-c_color-colorSeven shadow-md shadow-cyan-600 "
                  : ""
              } font-bold tracking-[2px] text-[25px] cursor-pointer px-5 rounded-t-lg`}
            >
              Requests
            </h2>
          </div>
        </div>
        <div className="flex gap-2">
          <DashBordSearch />
          <SearchButton />
        </div>
      </div>
      {switcher === 1 ? <Table /> : <Requests />}
    </div>
  );
};
export default Instructors;
