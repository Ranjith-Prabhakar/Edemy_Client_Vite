import { useSelector } from "react-redux";
import { IChatInitialState } from "../../redux/features/chat/chatSlice";
import useGetUser from "../../hooks/useGetUser";

const LeftPanel = () => {
  const user = useGetUser();
  const onlineUsers = useSelector(
    (state: { chat: IChatInitialState }) => state.chat.onlineUsersList
  );
  console.log("onlineUsers left panel", onlineUsers);

  return (
    <div className="border  rounded-md h-[78vh] w-[20vw] overflow-hidden ">
      <div className="flex justify-start gap-2 ">
        <div className="text-md font-poppins p-3 font-bold cursor-pointer">
          All Users
        </div>
        <div className="text-md font-poppins p-3 font-bold cursor-pointer">
          Online Users
        </div>
      </div>

      <div className="flex flex-col text-md font-poppins p-3 font-bold cursor-pointer">
        {onlineUsers &&
          onlineUsers.map((listUser) => {
            if (user._id !== listUser._id) return <li className="list-none">{listUser.name}</li>;
          })}
      </div>
    </div>
  );
};

export default LeftPanel;
