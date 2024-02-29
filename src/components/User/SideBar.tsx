import { AiOutlineLayout } from "react-icons/ai";
import { FaPhotoVideo } from "react-icons/fa";
import { MdAccountBalance } from "react-icons/md";
import { IoIosNotifications } from "react-icons/io";
import { IoIosChatbubbles } from "react-icons/io";
import { MdOutlineEventNote } from "react-icons/md";
// import { CgProfile } from "react-icons/cg";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { useLogoutMutation } from "../../redux/features/auth/authApi";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import useGetUser from "../../hooks/useGetUser";

type props = {
  setSideMenuItem: React.Dispatch<React.SetStateAction<number>>;
};

const SideBar = ({ setSideMenuItem }: props) => {
  // const userData = useGetUser();
  const [logout, { data, isError, isSuccess }] = useLogoutMutation({});
  const navigate = useNavigate();

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
    <div className="custom-scrollBar flex flex-col h-full overflow-scroll  max-w-[15%] w-full m-auto rounded-lg text-xl dark:bg-c_color-colorOne shadow-md ring-gray-400 space-y-3">
      <div className="flex flex-col  w-full">
        {/* <div className="flex flex-col gap-2 items-center justify-center mt-8 w-full">
          <CgProfile size={60} />
          <h1>{userData.name}</h1>
        </div> */}

        {dashBordItems &&
          dashBordItems.map((item) => (
            <div
              className="flex justify-start items-center gap-2 cursor-pointer ps-5 py-3 hover:bg-c_color-colorSeven hover:text-[21px] hover:rounded-md transition-all ease duration-700"
              key={item.name}
              onClick={() => {
                navigate(`/user/profile/${(item.name).toLowerCase()}`);
                // setSideMenuItem(index + 1);
              }}
            >
              <item.icon />
              <h1> {item.name}</h1>
            </div>
          ))}
        <div
          className="flex justify-start items-center gap-2 cursor-pointer ps-5 py-3  hover:bg-c_color-colorSeven hover:text-[21px] hover:rounded-md transition-all ease duration-700"
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
