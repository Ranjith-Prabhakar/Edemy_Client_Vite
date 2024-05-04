import { IoArrowBackOutline } from "react-icons/io5";
type Props = { courseName: string ,
  setSwapper: React.Dispatch<React.SetStateAction<string>>
};

const ChatHeader = ({ courseName,setSwapper }: Props) => {
  return (
    <div className="border-b flex justify-start items-center">
      <div className="ms-3 cursor-pointer" onClick={() => setSwapper("about")}>
        <IoArrowBackOutline size={35} />
      </div>
      <div className="flex items-center justify-center p-4 text-xl font-poppins capitalize  font-bold flex-1">
        {" "}
        <h1>{courseName}</h1>
      </div>
    </div>
  );
};

export default ChatHeader;
