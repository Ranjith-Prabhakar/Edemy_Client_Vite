import SideBar from "../../components/User/SideBar";
import Table from "../../components/User/Tables/Table";
import Courses from "../../components/User/Course/Courses";
import Header from "../../components/Header/Header";
import { useState } from "react";

const UserProfile = () => {
  const [sideMenuItem, setSideMenuItem] = useState(1);
  return (
    <div className="h-screen">
      <Header />
      <div className=" flex w-[95%] m-auto">
        <div className=" h-full  w-full m-auto rounded-lg flex justify-start  p-[25px] gap-2">
          <SideBar setSideMenuItem={setSideMenuItem} />
          <div className="flex flex-col gap-2  dark:bg-gray-950 text-[#FFD700] p-3 rounded-md w-full relative">
            {sideMenuItem === 2 && <Courses />}
            {sideMenuItem !== 2 && <Table />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
