import { useSelector } from "react-redux";
import { IChatInitialState } from "../../redux/features/chat/chatSlice";
import useGetUser from "../../hooks/useGetUser";
import { useState } from "react";

const LeftPanel = () => {
  const user = useGetUser();
  const [active, setActive] = useState<"onlineUsers" | "allUsers">(
    "onlineUsers"
  );
  const {onlineUsersList:onlineUsers,allUsersList }= useSelector(
    (state: { chat: IChatInitialState }) => state.chat
  );

  
  return (
    <div className="border border-slate-400  rounded-md h-[78vh] w-[20vw] overflow-hidden ">
      <div className="flex justify-start border border-slate-400 border-b-2">
        <div
          className={`text-md font-poppins p-3 font-bold cursor-pointer ${
            active === "onlineUsers" ? "bg-[#084045]" : "bg-[#072F32]"
          }`}
          onClick={() => setActive("onlineUsers")}
        >
          Online Users
        </div>
        <div
          className={`flex-1 text-md font-poppins p-3 font-bold cursor-pointer ${
            active === "allUsers" ? "bg-[#084045]" : "bg-[#072F32]"
          }`}
          onClick={() => setActive("allUsers")}
        >
          All Users
        </div>
      </div>

      <div className="flex flex-col  cursor-pointer bg-[#084045] h-full">
        {active === "onlineUsers" &&
          onlineUsers &&
          onlineUsers.map((listUser) => {
            if (user._id !== listUser._id)
              return (
                <li className="list-none  text-md font-poppins p-3 ps-5 font-bold hover:bg-teal-900">
                  {listUser.name}
                </li>
              );
          })}

        {active === "allUsers" &&
          allUsersList &&
          allUsersList.map((listUser) => {
            if (user._id !== listUser._id)
              return (
                <li className="list-none  text-md font-poppins p-3 ps-5 font-bold hover:bg-teal-900">
                  {listUser.name}
                </li>
              );
          })}
      </div>
    </div>
  );
};

export default LeftPanel;
