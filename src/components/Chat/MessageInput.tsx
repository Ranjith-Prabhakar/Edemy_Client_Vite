import { IoSend } from "react-icons/io5";
import { useAddMessageMutation } from "../../redux/features/chat/chatApi";
import {  useState } from "react";
import { useDispatch } from "react-redux";
import { updateChatList } from "../../redux/features/chat/chatSlice";
import useGetUser from "../../hooks/useGetUser";

type Props = {
  courseId: string;
};

const MessageInput = ({ courseId }: Props) => {
  const user = useGetUser();
  const [message, setMessage] = useState("");
  const [addMessage] = useAddMessageMutation();
  const dispatch = useDispatch();


  const handleKeyPress = async (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      await addMessage({ courseId, message });
      dispatch(
        updateChatList({
          data: {
            senderId: {
              _id: user._id as string,
              name: user.name as string,
            },
            message: message,
            createdAt: Date.now(),
          },
        })
      );
      setMessage(""); // Clear input after sending message
    }
  };
  return (
    <div className="flex w-full relative">
      <input
        value={message}
        type="text"
        className="w-[99%] m-auto text-black mb-1"
        onChange={(e) => {
          setMessage(e.target.value);
        }}
        onKeyPress={handleKeyPress}
      />
      <IoSend
        size={30}
        className="absolute top-1 right-2 z-10 text-black"
        onClick={async () => {
          addMessage({ courseId, message });
          dispatch(
            updateChatList({
              data: {
                senderId: {
                  _id: user._id as string,
                  name: user.name as string,
                },
                message: message,
                createdAt: Date.now(),
              },
            })
          );
           setMessage("");
        }}
      />
    </div>
  );
};

export default MessageInput;
