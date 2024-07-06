// import { useSelector } from "react-redux";
// import { IChatInitialState } from "../../redux/features/chat/chatSlice";
// import useGetUser from "../../hooks/useGetUser";
// import { useState } from "react";

// const ChatBody = () => {
//   const user = useGetUser();
//   const [toolTip, setToolTip] = useState(false);
//   console.log("user", user);
//   const chatList = useSelector(
//     (state: { chat: IChatInitialState }) => state.chat.chatList
//   );
//   return (
//     <div className="flex h-[88%] w-full  p-4 align-bottom overflow-scroll">
//       <ul className="w-full">
//         {chatList.map((item) => {
//           console.log("item", item);
//           if (item.senderId._id === user._id) {
//             return (
//               <div className="flex justify-end pe-2 ">
//                 <div className="ms-end border rounded-md p-2 mb-1 w-[300px]">
//                   <li>{item.senderId.name}</li>
//                   <li>{item.message}</li>
//                 </div>
//               </div>
//             );
//           } else {
//             return (
//               <div className="flex justify-start ps-2 mb-1 ">
//                 <div className="ms-end  p-2 w-[300px] flex gap-2 justify-start ">
//                   <div
//                     className="relative cursor-pointer rounded-full w-[40px] h-[40px] bg-white flex justify-center items-center"
//                     onMouseEnter={() => setToolTip(true)}
//                     onMouseLeave={() => setToolTip(false)}
//                   >
//                     <h1 className="text-black font-bold">
//                       {item.senderId.name.substring(0, 2).toUpperCase()}
//                     </h1>
//                     {toolTip && (
//                       <div className="absolute bg-black text-white">
//                         {item.senderId.name}
//                       </div>
//                     )}
//                   </div>
//                   <div className="">
//                     <li>{item.senderId.name}</li>
//                     <li>{item.message}</li>
//                   </div>
//                 </div>
//               </div>
//             );
//           }
//         })}
//       </ul>
//     </div>
//   );
// };

// export default ChatBody;

import { useSelector } from "react-redux";
import { IChatInitialState } from "../../redux/features/chat/chatSlice";
import useGetUser from "../../hooks/useGetUser";
import { useEffect, useRef } from "react";

const ChatBody = () => {
  const user = useGetUser();
  const endMessageRef = useRef<HTMLDivElement>(null);

  const chatList = useSelector(
    (state: { chat: IChatInitialState }) => state.chat.chatList
  );
  console.log("chatList", chatList);
  useEffect(() => {
    endMessageRef.current?.scrollIntoView();

    // to adjust scroll position
    window.scrollTo(0, 0);
  }, [chatList]);
  return (
    <div className="flex h-[88%] w-full  p-4 align-bottom overflow-scroll">
      <ul className="w-full">
        {chatList.map((item) => {
          console.log("item", item);
          if (item.senderId._id === user._id) {
            return (
              <div className="flex justify-end pe-2 ">
                <div className="ms-end mb-1 w-[300px]">
                  <div className="chat chat-end">
                    <div className="chat-image avatar">
                      <div className="w-10 rounded-full">
                        <div className="relative cursor-pointer rounded-full w-[40px] h-[40px] bg-white flex justify-center items-center">
                          <h1 className="text-black font-bold">
                            {item.senderId.name.substring(0, 2).toUpperCase()}
                          </h1>
                        </div>
                      </div>
                    </div>
                    <div className=" opacity-50 chat-header">
                      {" "}
                      {item.senderId.name}
                    </div>
                    <div className="chat-bubble min-w-fit bg-teal-900 text-white">
                      {item.message}
                    </div>
                    <div className=" chat-footer">
                      <time className="text-xs  opacity-50">
                        {new Date(item.createdAt).toLocaleString()}
                      </time>
                    </div>
                  </div>
                </div>
              </div>
            );
          } else {
            return (
              <div className="flex justify-start ps-2 mb-1 ">
                <div className="ms-end  p-2 w-[300px] flex gap-2 justify-start ">
                  <div className="chat chat-start">
                    <div className="chat-image avatar">
                      <div className="w-10 rounded-full">
                        <div className="relative cursor-pointer rounded-full w-[40px] h-[40px] bg-white flex justify-center items-center">
                          <h1 className="text-black font-bold">
                            {item.senderId.name.substring(0, 2).toUpperCase()}
                          </h1>
                        </div>
                      </div>
                    </div>
                    <div className=" opacity-50 chat-header">
                      {" "}
                      {item.senderId.name}
                    </div>
                    <div className="chat-bubble min-w-fit  bg-teal-900 text-white">
                      {item.message}
                    </div>
                    <div className=" chat-footer">
                      <time className="text-xs  opacity-50">
                        {new Date(item.createdAt).toLocaleString()}
                      </time>
                    </div>
                  </div>
                </div>
              </div>
            );
          }
        })}
        <div ref={endMessageRef} />
      </ul>
    </div>
  );
};

export default ChatBody;
