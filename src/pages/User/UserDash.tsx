import SideBar from "../../layouts/SideBar";
import { userSideBar } from "../../data/UserSideBar";
import Table from "../../features/Instructor/Table";
import Header from "../../layouts/Header";
import ContainerLayout from "../../layouts/containerLayout";
import { Route, Routes } from "react-router-dom";

const UserDash = () => {
  return (
    <ContainerLayout>
      <Header />
      <div className="h-[79vh] flex justify-start gap-2 mt-[4%] pb-2">
        <SideBar sideBarData={userSideBar} />
        <div className="flex flex-col gap-2 h-full overflow-scroll scroll-m-1 dark:bg-c_color-colorOne shadow-md ring-gray-400  p-3 rounded-md w-full relative">
          <Routes>
            <Route path="dashboard" element={<Table />} />
          </Routes>
        </div>
      </div>
    </ContainerLayout>
  );
};

export default UserDash;
