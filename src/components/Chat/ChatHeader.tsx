
type Props = { courseName :string};

const ChatHeader = ({ courseName }: Props) => {
  return (
    <div className="flex ">
      {" "}
      <h1>{courseName}</h1>
    </div>
  );
};

export default ChatHeader