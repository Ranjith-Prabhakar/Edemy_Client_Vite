import SideBar from "../../components/User/SideBar";
import Table from "../../components/User/Tables/Table";
import Courses from "../../components/User/Course/Courses";
import Header from "../../components/Header/Header";
import { useState } from "react";
import ContainerLayout from "../../layouts/containerLayout";

const UserProfile = () => {
  const [sideMenuItem, setSideMenuItem] = useState(1);
  return (
    <ContainerLayout>
      <Header />
      <div className="h-[77vh] flex justify-start gap-2 mt-[4%]">
        <SideBar setSideMenuItem={setSideMenuItem} />
        <div className="flex flex-col gap-2 h-full overflow-scroll scroll-m-1 dark:bg-c_color-colorOne shadow-md ring-gray-400  p-3 rounded-md w-full relative">
          {sideMenuItem === 2 && <Courses />}
          {sideMenuItem !== 2 && <Table />}
        </div>
      </div>
    </ContainerLayout>
  );
};

export default UserProfile;
