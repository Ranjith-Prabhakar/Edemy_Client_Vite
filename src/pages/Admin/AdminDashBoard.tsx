import SideBar from "../../layouts/SideBar";
import { adminDashBord } from "../../data/AdminSideBar";
import Categories from "../../features/Admin/Categories/Categories";
import DashBoard from "../../features/Admin/DashBoard";
import Users from "../../features/Admin/Users/Users";
import Instructors from "../../features/Admin/Instructors/Instructors";
import Courses from "../../features/Admin/Courses/Courses";
import ContainerLayout from "../../layouts/ContainerLayout";
import { Route, Routes } from "react-router-dom";
import UserDetails from "./UserDetails";
import CoursePreview from "../../features/Admin/Courses/CoursePreview";
import Header from "../../layouts/Header";
const AdminDash = () => {
  return (
    <ContainerLayout>
      <Header />
      <div className="h-[87vh] flex justify-start gap-2 mt-[2%] pb-2">
        <SideBar sideBarData={adminDashBord} />
        <div className="flex flex-col gap-2 h-full overflow-scroll scroll-m-1 bg-c_color-colorOne shadow-md ring-gray-400  p-3 rounded-md w-full relative">
          <Routes>
            <Route path="/dashboard" element={<DashBoard />} />
            <Route path="/" element={<DashBoard />} />
            <Route path="/users" element={<Users />} />
            <Route path="/instructors" element={<Instructors />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/users/user_details/:id" element={<UserDetails />} />
            <Route path="/course_preview" element={<CoursePreview />} />
          </Routes>
        </div>
      </div>
    </ContainerLayout>
  );
};

export default AdminDash;
