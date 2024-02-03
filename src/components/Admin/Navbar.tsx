import ThemeToggler from "../utils/ThemeToggler";
import { FaRegMessage } from "react-icons/fa6";

type Props = {};

const AdminNavbar = (props: Props) => {
  return (
    <div className="px-7 pt-7 w-screen ">
      <div className="flex items-center justify-end gap-2 me-7">
        <FaRegMessage size={20} />
        <ThemeToggler />
      </div>
    </div>
  );
};

export default AdminNavbar;
