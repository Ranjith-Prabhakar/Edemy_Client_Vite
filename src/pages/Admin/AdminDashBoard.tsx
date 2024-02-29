import { useEffect, useState } from "react";
import AdminNavbar from "../../components/Admin/Navbar";
import Sidebar from "../../components/Admin/SideBar";
import Categories from "../../components/Admin/Categories/Categories";
import Users from "../../components/Admin/Users/Users";
import Instructors from "../../components/Admin/Instructors/Instructors";
import Courses from '../../components/Admin/Courses/Courses'
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { IUserState } from "../../redux/features/auth/authSlice";
const AdminDash = () => {
  const userData = useSelector((state: IUserState) => state.user.userData);
  const [sidebarElement, setSidebarElement] = useState(1);
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (!userData.name) {
  //     navigate("/login");
  //   }
  //   if (userData.role === "admin") {
  //     navigate("/admin_dashbord");
  //   }
  // }, [userData]);



  return (
    <div className="dark:bg-black dark:text-white mih-h-[100vh] h-[100vh] w-screen overflow-scroll">
      <AdminNavbar />
      <div className=" flex w-[95%] m-auto items-start justify-start  p-[25px] gap-2 h-full  ">
        <Sidebar setSidebarElement={setSidebarElement} />
        <div className="flex flex-col gap-2  dark:bg-gray-950 text-[#FFD700] p-3 rounded-md w-full relative h-full overflow-scroll scrollbar-hide  scroll-smooth">
          {sidebarElement === 2 && <Users />}
          {sidebarElement === 3 && <Instructors />}
          {sidebarElement === 4 && <Categories />}
          {sidebarElement === 5 && <Courses />}
        </div>
      </div>
    </div>
  );
};

export default AdminDash;
