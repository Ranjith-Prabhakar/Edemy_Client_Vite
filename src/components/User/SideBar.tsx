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
import { useSelector } from "react-redux";
import { IUserState } from "../../redux/features/auth/authSlice";
import { CgProfile } from "react-icons/cg";
type props = {
  setSideMenuItem: React.Dispatch<React.SetStateAction<number>>;
};

const SideBar = ({ setSideMenuItem }: props) => {
  const userData = useSelector((state: IUserState) => state.user.userData);
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
      </div>
    </div>
  );
};

export default SideBar;
