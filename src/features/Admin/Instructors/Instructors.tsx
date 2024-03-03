import Table from "./Table";
import Requests from "./Requests";
import { useGetInstructorsQuery } from "../../../redux/features/admin/Instructors/instructorsApi";
import { useEffect, useState } from "react";
import SearchButton from "../../../components/Buttons/SearchButton";
import DashBordSearch from "../../../components/inputFields/DashBordSearch";
import { useSelector } from "react-redux";
import { IInstructorState } from "../../../redux/interfaces/Admin/InstructorRequest";
import { useGetInstructorRequestsQuery } from "../../../redux/features/admin/InstructorRequests/instructorRequestApi";
const Instructors = () => {
  const [switcher, setSwitcher] = useState(1);
  const [notification,setNotification] = useState(0)
  useGetInstructorRequestsQuery({});
   useGetInstructorsQuery();

   const InstructorRequests = useSelector(
     (state: { instructorRequests: IInstructorState }) =>
       state.instructorRequests.instructorRequest
   );

   useEffect(() => {
    setNotification(InstructorRequests.length);
   }, [InstructorRequests]);


 
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
          <div onClick={() => setSwitcher(2)} className="relative">
            <h2
              className={`${
                switcher === 2
                  ? "bg-c_color-colorSeven shadow-md shadow-cyan-600 "
                  : ""
              } font-bold tracking-[2px] text-[25px] cursor-pointer px-5 rounded-t-lg`}
            >
              Requests
            </h2>
            <div className="absolute -right-1 -top-2 bg-cyan-500 rounded-full w-5 h-5 flex items-center justify-center">
              <p className="text-[10px]">{notification}</p>
            </div>
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
