import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import useGetUser from "../../hooks/useGetUser";
import {
  useGetMessagesMutation,
  useGetOnlineUsersMutation,
} from "../../redux/features/chat/chatApi";
import { useDispatch } from "react-redux";
import { addChatList, addOnlineUsersList } from "../../redux/features/chat/chatSlice";
import LeftPanel from "../../components/Chat/LeftPanel";
import ChatHeader from "../../components/Chat/ChatHeader";
import ChatBody from "../../components/Chat/ChatBody";
import MessageInput from "../../components/Chat/MessageInput";

interface Props {
  courseId: string;
  courseName: string;
}
const Chat = ({ courseId, courseName }: Props) => {
  const dispatch = useDispatch();
  const user = useGetUser();
  const navigate = useNavigate();
  const [getMessages, { isSuccess, data, isError, error }] =
    useGetMessagesMutation();
  const [
    getOnlineUsers,
    { isSuccess: getOnlineUsersIsSuccess, data: getOnlineUsersIsData },
  ] = useGetOnlineUsersMutation();

  useEffect(() => {
    if (
      !user.enrolledCourses?.some(
        (enrolledCourseId) => enrolledCourseId === courseId
      )
    ) {
      navigate("/");
    } else {
      getMessages({ courseId });
      getOnlineUsers({ courseId });
    }
  }, [user]);

  useEffect(() => {
    if (getOnlineUsersIsSuccess) {
      console.log("getOnlineUsersIsData", getOnlineUsersIsData.result.data);
      dispatch(addOnlineUsersList({ data: getOnlineUsersIsData.result.data }));
    }
  }, [getOnlineUsersIsSuccess]);
  useEffect(() => {
    if (isSuccess) {
      dispatch(addChatList({ data: data.result.data.messages }));
    } else if (isError) {
      console.log(error);
    }
  }, [isSuccess]);

  return (
    <div className="h-screen w-screen absolute top-12 dark:bg-gradient-to-r from-body-gradient-one to-body-gradient-two left-0 z-10">
      <div className=" flex justify-center  gap-4 mt-10">
        {/* left side */}
        <LeftPanel />
        {/* right side */}
        <div className="flex flex-col border rounded-md h-[78vh] w-[50vw]">
          {/* header */}
          <ChatHeader courseName={courseName} />
          {/* message body*/}
          <ChatBody />
          {/* message input */}
          <MessageInput courseId={courseId} />
        </div>
      </div>
    </div>
  );
};

export default Chat;
