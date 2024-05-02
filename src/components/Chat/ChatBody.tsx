import { useSelector } from "react-redux";
import { IChatInitialState } from "../../redux/features/chat/chatSlice";
import useGetUser from "../../hooks/useGetUser";

const ChatBody = () => {
  const user = useGetUser();
  console.log("user", user);
  const chatList = useSelector(
    (state: { chat: IChatInitialState }) => state.chat.chatList
  );
  return (
    <div className="flex h-[88%] w-full border p-4 align-bottom overflow-scroll">
      <ul className="w-full">
        {chatList.map((item) => {
          console.log("item", item);
          if (item.senderId._id === user._id) {
            return (
              <div className="flex justify-end pe-2 ">
                <div className="ms-end border rounded-md p-2 mb-1 w-[300px]">
                  <li>{item.senderId.name}</li>
                  <li>{item.message}</li>
                </div>
              </div>
            );
          } else {
            return (
              <div className="flex justify-start ps-2 mb-1 ">
                <div className="ms-end border rounded-md p-2 w-[300px] ">
                  <li>{item.senderId.name}</li>
                  <li>{item.message}</li>
                </div>
              </div>
            );
          }
        })}
      </ul>
    </div>
  );
};

export default ChatBody;
