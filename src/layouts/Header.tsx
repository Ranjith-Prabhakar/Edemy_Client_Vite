"use client";
import { Link } from "react-router-dom";
import { FaRegHeart } from "react-icons/fa";
import { FaCartPlus } from "react-icons/fa6";
import { IoIosNotifications } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import ThemeToggler from "../components/utils/ThemeToggler";
import { useEffect, useState } from "react";
import useGetUser from "../hooks/useGetUser";

const Header = () => {
  const userData = useGetUser();
  const [name, setName] = useState("");

  console.log("userData.role", userData.role);
  useEffect(() => {
    if (userData.name) {
      setName(
        userData.name.substring(0, 1)[0].toUpperCase() +
          userData.name.substring(1, 2)
      );
    }
  }, [userData]);
  return (
    <div className="sticky top-0  z-50 text-xl ">
      <div className="flex justify-between items-end">
        <div className="flex items-end  gap-4">
          <Link to={"/"}>
            <h1 className=" text-2xl font-bold italic ">
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
            className="rounded-full w-96 h-[35px] px-7 outline-none dark:bg-slate-400 opacity-40 focus:border-1 focus:border-white placeholder:text-white"
            type="search"
            placeholder="search...."
          />
        </div>
        <div className="flex justify-center items-center gap-4">
          {userData.name && userData.role !== "instructor" && (
            <Link to={"/user/be_instructor"}>Teach on Edemy</Link>
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

          {userData.role === "admin" && (
            <Link to={`/admin/dash_bord`}>
              <div className="rounded-full flex justify-center items-center w-[35px] h-[35px] bg-white text-[#09616A]">
                <h1 className=" font-bold">{name}</h1>
              </div>
            </Link>
          )}

          {userData.role === "instructor" && (
            <Link to={`/instructor/profile`}>
              <div className="rounded-full flex justify-center items-center w-[35px] h-[35px] bg-white text-[#09616A]">
                <h1 className=" font-bold">{name}</h1>
              </div>
            </Link>
          )}

          {userData.role === "user" && (
            <Link to={`/user/profile`}>
              <div className="rounded-full flex justify-center items-center w-[35px] h-[35px] bg-white text-[#09616A]">
                <h1 className=" font-bold">{name}</h1>
              </div>
            </Link>
          )}

          {!userData.role && (
            <Link to={"/auth/login"}>
              <CgProfile size={35} />
            </Link>
          )}
          {/* {name !== "" ? (
            <Link to={`/${userData.role}/profile`}>
              <div className="rounded-full flex justify-center items-center w-[35px] h-[35px] bg-white text-[#09616A]">
                <h1 className=" font-bold">{`${name[0].toUpperCase()}${
                  name[1]
                }`}</h1>
              </div>
            </Link>
          ) : (
            <Link to={"/auth/login"}>
              <CgProfile size={35} />
            </Link>
          )} */}
        </div>
      </div>
    </div>
  );
};

export default Header;
