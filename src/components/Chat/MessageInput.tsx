import { IoSend } from "react-icons/io5";
import { useAddMessageMutation } from "../../redux/features/chat/chatApi";
import { useState } from "react";

type Props = {
  courseId: string;
};

const MessageInput = ({ courseId }: Props) => {
  const [message, setMessage] = useState("");
  const [addMessage] = useAddMessageMutation();

  const handleKeyPress = async (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      await addMessage({ courseId, message });
      setMessage(""); // Clear input after sending message
    }
  };
  return (
    <div className="flex w-full relative p-2 border-t">
      <input
        value={message}
        type="text"
        className="w-[95%] m-auto text-white font-bold mb-1 bg-slate-700 rounded-full  bg-opacity-5 outline-none"
        onChange={(e) => {
          setMessage(e.target.value);
        }}
        onKeyPress={handleKeyPress}
      />
      <IoSend
        size={30}
        className="absolute top-3 right-10 z-10 text-white"
        onClick={async () => {
          addMessage({ courseId, message });
          setMessage("");
        }}
      />
    </div>
  );
};

export default MessageInput;
