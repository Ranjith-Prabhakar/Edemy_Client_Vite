import AdminNavbar from "../components/Admin/Navbar";
import Sidebar from "../components/Admin/SideBar";

import Categories from "../components/Admin/Tables/Categories";

type Props = {};

const AdminDash = (props: Props) => {
  return (
    <div className="dark:bg-black dark:text-white mih-h-[100vh] h-[100vh]">
      <AdminNavbar />
      <div className=" flex w-[95%] m-auto">
        <div className=" h-full  w-full m-auto rounded-lg flex justify-start  p-[25px] gap-2">
          <Sidebar />
          <Categories />
        </div>
      </div>
    </div>
  );
};

export default AdminDash;
