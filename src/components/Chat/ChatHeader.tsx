type Props = { courseName: string };

const ChatHeader = ({ courseName }: Props) => {
  return (
    <div className="flex items-center justify-center p-4 text-xl font-poppins capitalize  font-bold">
      {" "}
      <h1>{courseName}</h1>
    </div>
  );
};

export default ChatHeader;
