import { AiOutlineLayout } from "react-icons/ai";
import { FaPhotoVideo } from "react-icons/fa";
import { MdAccountBalance } from "react-icons/md";
import { IoIosNotifications } from "react-icons/io";
import { IoIosChatbubbles } from "react-icons/io";
import { MdOutlineEventNote } from "react-icons/md";
import { useSelector } from "react-redux";
import { IUserState } from "../../redux/features/auth/authSlice";
import { CgProfile } from "react-icons/cg";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { useLogoutMutation } from "../../redux/features/auth/authApi";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

type props = {
  setSideMenuItem: React.Dispatch<React.SetStateAction<number>>;
};

const SideBar = ({ setSideMenuItem }: props) => {
  const userData = useSelector((state: IUserState) => state.user.userData);
  const [logout, { data, isError, isSuccess }] = useLogoutMutation({});

  useEffect(() => {
    if (isSuccess) {
      toast.success(data.message);
    } else if (isError) {
      toast.error("logout failed");
    }
  }, [isSuccess, isSuccess]);

  const handleLogout = async () => {
    try {
      await logout({});
    } catch (error) {
      console.log(error);
    }
  };

  const dashBordItems = [
    { name: "Dashboard", icon: AiOutlineLayout },
    { name: "Courses", icon: FaPhotoVideo },
    { name: "Accounts", icon: MdAccountBalance },
    { name: "Notifications", icon: IoIosNotifications },
    { name: "Chat", icon: IoIosChatbubbles },
    { name: "Event", icon: MdOutlineEventNote },
  ];
  return (
    <div className="flex flex-col   max-w-[15%] w-full m-auto rounded-lg text-xl p-[25px] dark:bg-gray-950 text-gray-500 dark:text-gray-400 space-y-3">
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-2 items-center justify-center mb-8">
          <CgProfile size={60} />
          <h1>{userData.name}</h1>
        </div>

        {dashBordItems &&
          dashBordItems.map((item, index) => (
            <div
              className="flex justify-start items-center gap-2 cursor-pointer "
              key={item.name}
              onClick={() => {
                setSideMenuItem(index + 1);
              }}
            >
              <item.icon />
              <h1> {item.name}</h1>
            </div>
          ))}
        <div
          className="flex justify-start items-center gap-2 cursor-pointer "
          onClick={() => {
            handleLogout();
          }}
        >
          <RiLogoutCircleRLine />
          <h1> Logout</h1>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
