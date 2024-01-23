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

import Categories from '../components/Categories/Categories'

type Props = {};

const AdminDash = (props: Props) => {
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
    <div className="flex w-[90%] m-auto">
      <div className="flex flex-col mt-7 h-[70vh] max-w-[15%] w-full m-auto rounded-lg  p-[25px] dark:bg-gray-950 text-[#FFD700] space-y-3">
        {dashBordItems &&
          dashBordItems.map((item) => (
            <div className="flex justify-start items-center gap-2 cursor-pointer">
              <item.icon />
              <h1> {item.name}</h1>
            </div>
          ))}
      </div>

      <div className="mt-7 h-[70vh] max-w-[82%] w-full m-auto rounded-lg flex justify-start  p-[25px]  dark:bg-gray-950 text-[#FFD700]">
        <Categories />
      </div>
    </div>
  );
};

export default AdminDash;
