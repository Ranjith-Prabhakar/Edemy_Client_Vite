import { Link } from "react-router-dom";
import ThemeToggler from "../components/utils/ThemeToggler";
import { FaRegMessage } from "react-icons/fa6";

const AdminNavbar = () => {
  return (
    <div className="px-7  w-full flex justify-between dark:shadow-xl py-2 rounded-md">
      <Link to={"/"}>
        <h1 className=" text-2xl font-bold italic ">
          <span className="text-4xl font-bold">E</span>demy
        </h1>
      </Link>
      <div className="flex items-center justify-end gap-2 me-7">
        <FaRegMessage size={20} />
        <ThemeToggler />
      </div>
    </div>
  );
};

export default AdminNavbar;
