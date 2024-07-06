import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import useGetUser from "../../hooks/useGetUser";
import {
  useGetMessagesMutation,
  useGetOnlineUsersMutation,
} from "../../redux/features/chat/chatApi";
import { useDispatch } from "react-redux";
import {
  addChatList,
  addOnlineUsersList,
  addAllUsersList,
} from "../../redux/features/chat/chatSlice";
import LeftPanel from "../../components/Chat/LeftPanel";
import ChatHeader from "../../components/Chat/ChatHeader";
import ChatBody from "../../components/Chat/ChatBody";
import MessageInput from "../../components/Chat/MessageInput";

interface Props {
  courseId: string;
  courseName: string;
  setSwapper: React.Dispatch<React.SetStateAction<string>>;
}
const Chat = ({ courseId, courseName, setSwapper }: Props) => {
  const dispatch = useDispatch();
  const user = useGetUser();
  const navigate = useNavigate();
  const [getMessages, { isSuccess, data, isError, error }] =
    useGetMessagesMutation();
  const [
    getOnlineUsers,
    { isSuccess: getOnlineUsersIsSuccess, data: getOnlineUsersIsData },
  ] = useGetOnlineUsersMutation();

  // to adjust scroll position
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  
  useEffect(() => {
    if (user.role === "admin") {
      getMessages({ courseId });
      getOnlineUsers({ courseId });
    } else if (
      (user.role === "instructor" &&
        user.courses?.some(
          (enrolledCourseId) => enrolledCourseId === courseId
        )) ||
      (user.role === "instructor" &&
        user.enrolledCourses?.some(
          (enrolledCourseId) => enrolledCourseId === courseId
        ))
    ) {
      getMessages({ courseId });
      getOnlineUsers({ courseId });
    } else if (
      user.role === "user" &&
      user.enrolledCourses?.some(
        (enrolledCourseId) => enrolledCourseId === courseId
      )
    ) {
      getMessages({ courseId });
      getOnlineUsers({ courseId });
    } else {
      navigate("/");
    }
  }, [user]);

  useEffect(() => {
    if (getOnlineUsersIsSuccess) {
      // console.log(
      //   getOnlineUsersIsData?.result.data?.onlineUsers
      // );
      if (getOnlineUsersIsData) {
        dispatch(
          addOnlineUsersList({
            data: getOnlineUsersIsData?.result.data?.onlineUsers,
          })
        );
        dispatch(
          addAllUsersList({ data: getOnlineUsersIsData?.result.data?.allUsers })
        );
      }
    }
  }, [getOnlineUsersIsSuccess]);
  useEffect(() => {
    if (isSuccess) {
      if (data) {
        dispatch(addChatList({ data: data.result.data.messages }));
      }
    } else if (isError) {
      console.log(error);
    }
  }, [isSuccess]);

  return (
    <div className="h-screen w-screen absolute top-12 dark:bg-gradient-to-r from-body-gradient-one to-body-gradient-two left-0 z-10">
      <div className=" flex justify-center  gap-4 mt-10 dark:bg-gradient-to-r from-body-gradient-one to-body-gradient-two">
        {/* left side */}
        <LeftPanel />
        {/* right side */}
        <div className="flex flex-col border rounded-md h-[78vh] w-[50vw] dark:bg-gradient-to-r from-body-gradient-one to-body-gradient-two">
          {/* header */}
          <ChatHeader courseName={courseName} setSwapper={setSwapper} />
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
