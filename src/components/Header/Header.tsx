"use client";
import { Link } from "react-router-dom";
import { FaRegHeart } from "react-icons/fa";
import { FaCartPlus } from "react-icons/fa6";
import { IoIosNotifications } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import logo from "../../../public/Assets/Logo.png";
import ThemeToggler from "../utils/ThemeToggler";
import { useSelector } from "react-redux";
import { IUserState } from "../../redux/features/auth/authSlice";
import { useEffect, useState } from "react";
type Props = {};

const Header = (props: Props) => {
  const userData = useSelector((state: IUserState) => state.user.userData);
  const [name, setName] = useState("");

  useEffect(() => {
    if (userData.name) {
      setName(userData.name.substring(0, 2));
    }
  }, [userData]);
  return (
    <div className="p-5 ">
      <div className="flex justify-between items-center text-black dark:text-[#FFD700]">
        <div className="flex items-center  gap-4">
          <Link to={"/"}>
            <img src={logo} alt="Logo image" className="w-[100px] h-[100px]" />
          </Link>

          <Link to={"/categories"} className="text-[#FFD700]">
            Categories
          </Link>

          <div className="flex flex-1 justify-end ">
            <ThemeToggler />
          </div>
        </div>
        <div>
          <input
            className="rounded-full w-96 h-[46px] px-7 text-black outline-none placeholder:text-gray-500 dark:bg-gray-800 focus:border-1 darK:focus:border-[#FFD700]"
            type="search"
            placeholder="search...."
          />
        </div>
        <div className="flex justify-center items-center gap-4">
          {userData.name && userData.role !== "instructor" && (
            <Link className="text-[#FFD700]" to={"/be_instructor"}>
              Teach on Edemy
            </Link>
          )}
          {userData.name && (
            <>
              <Link className="text-[#FFD700]" to={"/my_learnings"}>
                My Learnings
              </Link>
              <Link className="text-[#FFD700]" to={"/categories"}>
                <FaRegHeart size={25} color={"#FFD700"} />
              </Link>
              <Link to={"/be_instructor"}>
                <FaCartPlus size={25} />
              </Link>
              <Link to={"/be_instructor"}>
                <IoIosNotifications size={25} />
              </Link>
            </>
          )}

          {name !== "" ? (
            <Link to={"/profile"}>
              <h1 className="border-[2px] border-[#FFD700] rounded-[100%] p-1">
                {name}
              </h1>
            </Link>
          ) : (
            <Link to={"/login"}>
              <CgProfile size={35} />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
