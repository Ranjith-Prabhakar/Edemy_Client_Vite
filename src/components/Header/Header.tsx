"use client";
import { Link } from "react-router-dom";
import { FaRegHeart } from "react-icons/fa";
import { FaCartPlus } from "react-icons/fa6";
import { IoIosNotifications } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import ThemeToggler from "../utils/ThemeToggler";
// import { useSelector } from "react-redux";
// import { IUserState } from "../../redux/features/auth/authSlice";
import { useEffect, useState } from "react";
import useGetUser from "../../hooks/useGetUser";

const Header = () => {
  // const userData = useSelector((state: IUserState) => state.user.userData);
  const userData = useGetUser();
  const [name, setName] = useState("");

  useEffect(() => {
    if (userData.name) {
      setName(userData.name.substring(0, 2));
    }
  }, [userData]);
  return (
    <div className="p-5 sticky top-0 px-10">
      <div className="flex justify-between items-end">
        <div className="flex items-end  gap-4">
          <Link to={"/"}>
            <h1 className=" text-2xl font-bold italic">
              <span className="text-4xl font-bold">E</span>demy
            </h1>
          </Link>
          <Link to={"/categories"}>Categories</Link>
          <div className="flex flex-1 justify-end ">
            <ThemeToggler />
          </div>
        </div>
        <div>
          <input
            className="rounded-full w-96 h-[30px] px-7 outline-none dark:bg-slate-400 opacity-40 focus:border-1 focus:border-white placeholder:text-white"
            type="search"
            placeholder="search...."
          />
        </div>
        <div className="flex justify-center items-center gap-4">
          {userData.name && userData.role !== "instructor" && (
            <Link to={"/be_instructor"}>Teach on Edemy</Link>
          )}
          {userData.name && (
            <>
              <Link to={"/my_learnings"}>My Learnings</Link>
              <Link to={"/categories"}>
                <FaRegHeart size={25} />
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
              <div className="rounded-full flex justify-center items-center w-[25px] h-[25px] bg-white text-[#09616A]">
                <h1 className="text-[13px] font-bold">{name}</h1>
              </div>
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
