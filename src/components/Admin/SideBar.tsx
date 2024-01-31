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

type Props = {};

const SideBar = (props: Props) => {
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
    <div className="flex flex-col   max-w-[15%] w-full m-auto rounded-lg text-xl p-[25px] dark:bg-gray-950 text-[#FFD700] space-y-3">
      {dashBordItems &&
        dashBordItems.map((item) => (
          <div className="flex justify-start items-center gap-2 cursor-pointer">
            <item.icon />
            <h1> {item.name}</h1>
          </div>
        ))}
    </div>
  );
};

export default SideBar;
