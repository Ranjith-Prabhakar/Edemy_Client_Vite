import React, { useState, Suspense } from "react";
import AdminNavbar from "../components/Admin/Navbar";
import Sidebar from "../components/Admin/SideBar";
import Categories from "../components/Admin/Categories/Categories";
import toast from "react-hot-toast";

// import Categories from "../components/Admin/Tables/Categories";

type Props = {};

// const Categories = React.lazy(() => {
//   return import(
//     /*webpackChnkName:Categories*/ "../components/Admin/Categories/Categories"
//   );
// });

const AdminDash = (props: Props) => {
  const [sidebarElement, setSidebarElement] = useState(1);
  return (
    <div className="dark:bg-black dark:text-white mih-h-[100vh] h-[100vh]">
      <AdminNavbar />
      <div className=" flex w-[95%] m-auto">
        <div className=" h-full  w-full m-auto rounded-lg flex justify-start  p-[25px] gap-2">
          <Sidebar setSidebarElement={setSidebarElement} />
          {sidebarElement === 4 && (
            // <Suspense
            //   fallback={toast.loading("fetching data", { duration: 300 })}
            // >
              <Categories />
            // </Suspense>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDash;
