import SideBar from "../components/User/SideBar";
import UserNavbar from "../components/User/Navbar";
import Courses from "../components/User/Tables/Courses";
type Props = {};

const UserProfile = (props: Props) => {
  return (
    <div className="dark:bg-black dark:text-white mih-h-[100vh] h-[100vh]">
      <UserNavbar />
      <div className=" flex w-[95%] m-auto">
        <div className=" h-full  w-full m-auto rounded-lg flex justify-start  p-[25px] gap-2">
          <SideBar />
          <Courses />
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
