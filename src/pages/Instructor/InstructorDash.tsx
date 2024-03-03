import SideBar from "../../layouts/SideBar";
import { instructorSideBar } from "../../data/InstructorSideBar";
import Table from "../../features/Instructor/Table";
import Courses from "../../features/Instructor/Course/Courses";
import Header from "../../layouts/Header";
import ContainerLayout from "../../layouts/containerLayout";
import { Route, Routes } from "react-router-dom";

const InstructorDash = () => {
  return (
    <ContainerLayout>
      <Header />
      <div className="h-[77vh] flex justify-start gap-2 mt-[4%]">
        <SideBar sideBarData={instructorSideBar} />
        <div className="flex flex-col gap-2 h-full overflow-scroll scroll-m-1 dark:bg-c_color-colorOne shadow-md ring-gray-400  p-3 rounded-md w-full relative">
          <Routes>
            <Route path="dashboard" element={<Table />} />
            <Route path="courses" element={<Courses />} />
          </Routes>
        </div>
      </div>
    </ContainerLayout>
  );
};

export default InstructorDash;
