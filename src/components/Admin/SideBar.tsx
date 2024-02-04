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
// import { useLogoutQuery } from "../../redux/features/auth/authApi";

// import { useLogoutQuery as useLogoutQueryType } from "../../redux/features/auth/authApi";
// import { authApi } from "../../redux/features/auth/authApi";
// const { useLogoutQuery }: { useLogoutQuery: typeof useLogoutQueryType } =
//   authApi;
// const [logout, { data, isSuccess, isError, error }] = useLogoutQuery({});

type Props = {
  setSidebarElement: React.Dispatch<React.SetStateAction<number>>;
};

const SideBar = ({ setSidebarElement }: Props) => {
  // const [logout] = useLogoutQuery({});
  const dashBordItems = [
    { name: "Dashboard", icon: AiOutlineLayout },
    { name: "Users", icon: FaUsers },
    { name: "Trainers", icon: GiTeacher },
    { name: "Categories", icon: TbCategoryPlus },
    { name: "Courses", icon: FaPhotoVideo },
    { name: "Payments", icon: FaMoneyCheckDollar },
    { name: "Accounts", icon: MdAccountBalance },
    { name: "Notifications", icon: IoIosNotifications },
    { name: "Chat", icon: IoIosChatbubbles },
    { name: "Event", icon: MdOutlineEventNote },
  ];

  return (
    <div className="flex flex-col   max-w-[15%] w-full h-full rounded-lg text-xl p-[25px] dark:bg-gray-950 text-gray-500 dark:text-gray-400 space-y-3">
      {dashBordItems &&
        dashBordItems.map((item, index) => (
          <div
            className="flex justify-start items-center gap-2 cursor-pointer "
            onClick={() => {
              setSidebarElement(index + 1);
            }}
            key={item.name}
          >
            <item.icon />
            <h1> {item.name}</h1>
          </div>
        ))}
      <div
        className="flex justify-start items-center gap-2 cursor-pointer "
        onClick={() => {
          // logout();
        }}
      >
        <RiLogoutCircleRLine />
        <h1> Logout</h1>
      </div>
    </div>
  );
};

export default SideBar;
