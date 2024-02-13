import SideBar from "../../components/User/SideBar";
import Table from "../../components/User/Tables/Table";
import Courses from "../../components/User/Course/Courses";
import { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import { useSelector } from "react-redux";
import { IUserState } from "../../redux/features/auth/authSlice";
import { useNavigate } from "react-router-dom";

type Props = {};

const UserProfile = (props: Props) => {
  const userData = useSelector((state: IUserState) => state.user.userData);
  const [sideMenuItem, setSideMenuItem] = useState(1);
  const navigate = useNavigate();
  useEffect(() => {
    if (!userData.name) {
      navigate("/login");
    }
    if (userData.role === "admin") {
      navigate("/admin_dashbord");
    }
  }, [userData]);

  return (
    <div className="dark:bg-black dark:text-white mih-h-[100vh] h-[100vh]">
      <Header />
      <div className=" flex w-[95%] m-auto">
        <div className=" h-full  w-full m-auto rounded-lg flex justify-start  p-[25px] gap-2">
          <SideBar setSideMenuItem={setSideMenuItem} />
          <div className="flex flex-col gap-2  dark:bg-gray-950 text-[#FFD700] p-3 rounded-md w-full relative">
            {sideMenuItem === 2 && <Courses />}
            {sideMenuItem !== 2 && <Table />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
