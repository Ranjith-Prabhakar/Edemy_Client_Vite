import { VscSend } from "react-icons/vsc";


const QuestionForm = () => {
  return (
    <div className="dark:bg-c_color-colorSix p-3 rounded-md w-full ">
      <form className="max-w-sm mx-auto">
        <label
          htmlFor="message"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Your message
        </label>
        <div className="relative">
          <textarea
            id="message"
            rows={2}
            cols={1000}
            className=" block p-2.5 w-full text-sm  rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-transparent "
            placeholder="Leave a comment..."
          ></textarea>
          <VscSend className="absolute right-2 bottom-1" />
        </div>
      </form>
    </div>
  );
};

export default QuestionForm;
