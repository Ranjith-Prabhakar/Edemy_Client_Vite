import { AiOutlineLayout } from "react-icons/ai";
import { FaUsers } from "react-icons/fa";
import { GiTeacher } from "react-icons/gi";
import { TbCategoryPlus } from "react-icons/tb";
import { FaPhotoVideo } from "react-icons/fa";
import { FaMoneyCheckDollar } from "react-icons/fa6";
import { MdAccountBalance } from "react-icons/md";
import { IoIosNotifications } from "react-icons/io";
import { IoIosChatbubbles } from "react-icons/io";
import { MdOutlineEventNote } from "react-icons/md";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { useLogoutMutation } from "../../redux/features/auth/authApi";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import responseErrorCatch from "../../utils/responseErrorToast";




const SideBar = () => {
  const [logout, { data, isError, isSuccess, error }] = useLogoutMutation();
  const navigate = useNavigate();

useEffect(() => {
  if (isSuccess) {
    console.log("outer");
    if (data && data.message) {
      console.log("data.message", data.message);
      toast.success(data.message);
      navigate("/auth/login");
    }
  } else if (isError) {
    responseErrorCatch(error);
  }
}, [data, error, isError, isSuccess, navigate]);

 const handleLogout = async () => {
   try {
     await logout();
   } catch (error) {
     console.log(error);
   }
 };

  const dashBordItems = [
    { name: "Dashboard", icon: AiOutlineLayout },
    { name: "Users", icon: FaUsers },
    { name: "Instructors", icon: GiTeacher },
    { name: "Categories", icon: TbCategoryPlus },
    { name: "Courses", icon: FaPhotoVideo },
    { name: "Payments", icon: FaMoneyCheckDollar },
    { name: "Accounts", icon: MdAccountBalance },
    { name: "Notifications", icon: IoIosNotifications },
    { name: "Chat", icon: IoIosChatbubbles },
    { name: "Event", icon: MdOutlineEventNote },
  ];

  return (
    <div className="custom-scrollBar flex flex-col h-full overflow-scroll  max-w-[15%] w-full m-auto rounded-lg text-xl dark:bg-c_color-colorOne shadow-md ring-gray-400 space-y-3">
      <div className="flex flex-col  w-full">
        {dashBordItems &&
          dashBordItems.map((item) => (
            <div
              className="flex justify-start items-center gap-2 cursor-pointer ps-5 py-3 hover:bg-c_color-colorSeven hover:text-[21px] hover:rounded-md transition-all ease duration-700"
              key={item.name}
              onClick={() => {
                navigate(`/admin/dash_bord/${item.name.toLowerCase()}`);
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
