import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useGetUser from "../../hooks/useGetUser";
import { IoSend } from "react-icons/io5";
import {
  useAddMessageMutation,
  useGetMessagesMutation,
} from "../../redux/features/chat/chatApi";
import { useSelector, useDispatch } from "react-redux";
import {
  IChatInitialState,
  addChatList,
} from "../../redux/features/chat/chatSlice";

interface Props {
  courseId: string;
  courseName: string;
}
const Chat = ({ courseId, courseName }: Props) => {
  const chatList = useSelector(
    (state: { chat: IChatInitialState }) => state.chat.chatList
  );
  const dispatch = useDispatch();
  const [addMessage] = useAddMessageMutation();
  const [message, setMessage] = useState("");
  const user = useGetUser();
  const navigate = useNavigate();
  const [getMessages, { isSuccess, data, isError, error }] =
    useGetMessagesMutation();

  useEffect(() => {
    if (
      !user.enrolledCourses?.some(
        (enrolledCourseId) => enrolledCourseId === courseId
      )
    ) {
      navigate("/");
    } else {
      getMessages({ courseId });
    }
  }, [user]);

  useEffect(() => {
    if (isSuccess) {
      dispatch(addChatList({ data: data.result.data.messages }));
    } else if (isError) {
      console.log(error);
    }
  }, [isSuccess]);

  useEffect(() => {
    console.log("chatList----", chatList);
  }, [chatList]);

  return (
    <div className="h-screen w-screen absolute top-12 dark:bg-gradient-to-r from-body-gradient-one to-body-gradient-two left-0 z-10">
      <div className=" flex justify-center  gap-4 mt-10">
        {/* left side */}
        <div className="border  rounded-md h-[78vh] w-[20vw] overflow-hidden"></div>
        {/* right side */}
        <div className="flex flex-col border rounded-md h-[78vh] w-[50vw]">
          {/* header */}
          <div className="flex ">
            {" "}
            <h1>{courseName}</h1>
          </div>
          {/* message body*/}
          <div className="flex h-[88%]"></div>
          {/* message input */}
          <div className="flex w-full relative">
            <input
              value={message}
              type="text"
              className="w-[99%] m-auto text-black mb-1"
              onChange={(e) => {
                setMessage(e.target.value);
              }}
            />
            <IoSend
              size={30}
              className="absolute top-1 right-2 z-10 text-black"
              onClick={async () => {
                addMessage({ courseId, message });
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
