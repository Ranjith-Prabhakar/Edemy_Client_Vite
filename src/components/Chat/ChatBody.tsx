import { useSelector } from "react-redux";
import { IChatInitialState } from "../../redux/features/chat/chatSlice";

const ChatBody = () => {
  const chatList = useSelector(
    (state: { chat: IChatInitialState }) => state.chat.chatList
  );
   return (
    <div className="flex h-[88%]">
      <ul>
        {chatList.map((item) => (
          <li>{item.message}</li>
        ))}
      </ul>
    </div>
  );
};

export default ChatBody;
