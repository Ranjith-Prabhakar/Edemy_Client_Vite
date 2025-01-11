import SideBar from "../../layouts/SideBar";
import { instructorSideBar } from "../../data/InstructorSideBar";
import Table from "../../features/Instructor/Table";
import Courses from "../../features/Instructor/Course/Courses";
import Header from "../../layouts/Header";
import ContainerLayout from "../../layouts/ContainerLayout";
import { Route, Routes } from "react-router-dom";
import MyTutorials from "../../features/Instructor/Tutorials/MyTutorials";

const InstructorDash = () => {
  return (
    <ContainerLayout>
      <Header />
      <div className="h-[87vh] flex justify-start mt-1 gap-2 pb-3">
        <SideBar sideBarData={instructorSideBar} />
        <div className="flex flex-col gap-2 h-full overflow-scroll scroll-m-1 bg-c_color-colorOne shadow-md ring-gray-400   rounded-md w-full relative ">
          <Routes>
            <Route
              path="dashboard"
              element={<Table sideBarData={instructorSideBar} />}
            />
            <Route path="addcourses" element={<Courses />} />
            <Route path="mytutorials" element={<MyTutorials />} />
          </Routes>
        </div>
      </div>
    </ContainerLayout>
  );
};

export default InstructorDash;
