import SideBar from "../components/User/SideBar";
import Table from "../components/User/Tables/Table";
import Courses from "../components/User/Course/Courses";
import { useState } from "react";
import Header from "../components/Header/Header";
type Props = {};

const UserProfile = (props: Props) => {
  const [sideMenuItem, setSideMenuItem] = useState(1);
  return (
    <div className="dark:bg-black dark:text-white mih-h-[100vh] h-[100vh]">
      <Header />
      <div className=" flex w-[95%] m-auto">
        <div className=" h-full  w-full m-auto rounded-lg flex justify-start  p-[25px] gap-2">
          <SideBar setSideMenuItem={setSideMenuItem} />

          {sideMenuItem === 2 && <Courses />}
          {sideMenuItem !== 2 && <Table />}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
