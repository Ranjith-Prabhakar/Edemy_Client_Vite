import { useState } from "react";
import AdminNavbar from "../../components/Admin/Navbar";
import Sidebar from "../../components/Admin/SideBar";
import Categories from "../../components/Admin/Categories/Categories";
import Users from "../../components/Admin/Users/Users";

const AdminDash = () => {
  const [sidebarElement, setSidebarElement] = useState(1);
  return (
    <div className="dark:bg-black dark:text-white mih-h-[100vh] h-[100vh] w-screen overflow-scroll">
      <AdminNavbar />
      <div className=" flex w-[95%] m-auto items-start justify-start  p-[25px] gap-2 h-full  ">
        <Sidebar setSidebarElement={setSidebarElement} />
        <div className="flex flex-col gap-2  dark:bg-gray-950 text-[#FFD700] p-3 rounded-md w-full relative h-full overflow-scroll scrollbar-hide  scroll-smooth">
          {sidebarElement === 2 && <Users />}
          {sidebarElement === 4 && <Categories />}
        </div>
      </div>
    </div>
  );
};

export default AdminDash;
