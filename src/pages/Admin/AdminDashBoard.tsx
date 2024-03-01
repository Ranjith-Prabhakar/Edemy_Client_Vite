import AdminNavbar from "../../components/Admin/Navbar";
import Sidebar from "../../components/Admin/SideBar";
import Categories from "../../components/Admin/Categories/Categories";
import Users from "../../components/Admin/Users/Users";
import Instructors from "../../components/Admin/Instructors/Instructors";
import Courses from "../../components/Admin/Courses/Courses";
import ContainerLayout from "../../layouts/containerLayout";
import { Route, Routes } from "react-router-dom";
import UserDetails from "./UserDetails";
import CoursePreview from "../../components/Admin/Courses/Tables/CoursePreview";
const AdminDash = () => {
  return (
    <ContainerLayout>
      <AdminNavbar />
      <div className="h-[80vh] flex justify-start gap-2 mt-[2%]">
        <Sidebar />
        <div className="flex flex-col gap-2 h-full overflow-scroll scroll-m-1 dark:bg-c_color-colorOne shadow-md ring-gray-400  p-3 rounded-md w-full relative">
          <Routes>
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
