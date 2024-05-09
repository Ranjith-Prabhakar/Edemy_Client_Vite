import { useEffect, useState } from "react";
import { IoCloseCircleOutline } from "react-icons/io5";
import { RxHamburgerMenu } from "react-icons/rx";
import useGetUser from "../../hooks/useGetUser";
import { Link, useNavigate } from "react-router-dom";
import ThemeToggler from "../utils/ThemeToggler";
import { CgProfile } from "react-icons/cg";
import { FaCartPlus } from "react-icons/fa";
import { IoIosNotifications } from "react-icons/io";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { useLogoutMutation } from "../../redux/features/auth/authApi";
import toast from "react-hot-toast";
import responseErrorCatch from "../../utils/responseErrorToast";
import { FaUsers } from "react-icons/fa";
import { GiTeacher } from "react-icons/gi";
import { TbCategoryPlus } from "react-icons/tb";
import { FaPhotoVideo } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaBookOpenReader } from "react-icons/fa6";
import { MobileSearch } from "./Search";
import { MobileCourses } from "./Courses";

const HamburgerMenu = () => {
  const userData = useGetUser();
  const [hamburgerDropDown, setHamburgerDropDown] = useState(false);
  const [logout, { data, isError, isSuccess, error }] = useLogoutMutation();
  const navigate = useNavigate();
  useEffect(() => {
    if (isSuccess) {
      if (data && data.message) {
        toast.success(data.message);
        navigate("/auth/login");
      }
    } else if (isError) {
      responseErrorCatch(error);
    }
  }, [data, error, isError, isSuccess, navigate]);
  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="relative 1200px:hidden">
      <RxHamburgerMenu
        className="cursor-pointer"
        onClick={() => {
          setHamburgerDropDown(!hamburgerDropDown);
        }}
      />
      {hamburgerDropDown && (
        <div className="absolute top-8  -right-1  h-[600px] w-[350px]  overflow-scroll   border rounded-lg bg-c_color-colorSeven 400px:right-4 400px:w-[300px] ">
          <div className="relative w-full h-full p-3 pb-11">
            <IoCloseCircleOutline
              size={45}
              className="absolute right-3 top-4 cursor-pointer "
              onClick={() => {
                setHamburgerDropDown(false);
              }}
            />
            <div className=" mt-20 ps-4 flex flex-col ">
              <MobileSearch />
              <div className="800px:hidden 400px:py-0 py-2  px-3 rounded-lg  mb-3 flex justify-between items-center w-full dark:bg-gradient-to-r from-body-gradient-two to-body-gradient-one dark:text-white">
                <div className="py-2 px-3 rounded-lg  flex justify-start gap-2 items-center w-full dark:bg-gradient-to-r from-body-gradient-two to-body-gradient-one dark:text-white">
                  <MobileCourses setHamburgerDropDown={setHamburgerDropDown} />
                </div>
              </div>
              {userData.role === "admin" && (
                <>
                  {/* profile */}
                  <div
                    onClick={() => {
                      setHamburgerDropDown(false);
                    }}
                    className="py-2 px-3 rounded-lg  mb-3 flex justify-between items-center w-full dark:bg-gradient-to-r from-body-gradient-two to-body-gradient-one dark:text-white"
                  >
                    <Link to={`/admin/dash_bord`}>
                      <h1 className=" font-semibold">
                        {userData.name.split(" ").shift()}
                      </h1>
                    </Link>
                    <ThemeToggler />
                  </div>
                  {/*  *******/}
                  {/* <div className="800px:hidden py-2 px-3 rounded-lg  mb-3 flex justify-between items-center w-full dark:bg-gradient-to-r from-body-gradient-two to-body-gradient-one dark:text-white">
                    <div className="py-2 px-3 rounded-lg  flex justify-start gap-2 items-center w-full dark:bg-gradient-to-r from-body-gradient-two to-body-gradient-one dark:text-white">
                      <MobileCourses
                        setHamburgerDropDown={setHamburgerDropDown}
                      />
                    </div>
                  </div> */}
                  {/******* *  */}
                  {/* users */}
                  <div
                    onClick={() => {
                      setHamburgerDropDown(false);
                    }}
                    className="400px:hidden 400px:py-0 py-2 px-3 rounded-lg  mb-3 flex justify-between items-center w-full dark:bg-gradient-to-r from-body-gradient-two to-body-gradient-one dark:text-white"
                  >
                    <Link
                      to={`/admin/dash_bord/users`}
                      className="py-2 400px:py-0 px-3 rounded-lg  flex justify-start gap-2 items-center w-full dark:bg-gradient-to-r from-body-gradient-two to-body-gradient-one dark:text-white"
                    >
                      <FaUsers />
                      <h1 className=" font-semibold">Users</h1>
                    </Link>
                  </div>
                  {/* instructors */}
                  <div
                    onClick={() => {
                      setHamburgerDropDown(false);
                    }}
                    className="400px:hidden 400px:py-0 py-2 px-3 rounded-lg  mb-3 flex justify-between items-center w-full dark:bg-gradient-to-r from-body-gradient-two to-body-gradient-one dark:text-white"
                  >
                    <Link
                      to={`/admin/dash_bord/instructors`}
                      className="py-2 400px:py-0 px-3 rounded-lg  flex justify-start gap-2 items-center w-full dark:bg-gradient-to-r from-body-gradient-two to-body-gradient-one dark:text-white"
                    >
                      <GiTeacher />
                      <h1 className=" font-semibold">Instructors</h1>
                    </Link>
                  </div>
                  {/* category */}
                  <div
                    onClick={() => {
                      setHamburgerDropDown(false);
                    }}
                    className="400px:hidden 400px:py-0 py-2 px-3 rounded-lg  mb-3 flex justify-between items-center w-full dark:bg-gradient-to-r from-body-gradient-two to-body-gradient-one dark:text-white"
                  >
                    <Link
                      to={`/admin/dash_bord/categories`}
                      className="py-2 px-3 rounded-lg  flex justify-start gap-2 items-center w-full dark:bg-gradient-to-r from-body-gradient-two to-body-gradient-one dark:text-white"
                    >
                      <TbCategoryPlus />
                      <h1 className=" font-semibold">Categories</h1>
                    </Link>
                  </div>
                  {/* courses */}
                  <div
                    onClick={() => {
                      setHamburgerDropDown(false);
                    }}
                    className="400px:hidden 400px:py-0 py-2 px-3 rounded-lg  mb-3 flex justify-between items-center w-full dark:bg-gradient-to-r from-body-gradient-two to-body-gradient-one dark:text-white"
                  >
                    <Link
                      to={`/admin/dash_bord/courses`}
                      className="py-2 px-3 rounded-lg  flex justify-start gap-2 items-center w-full dark:bg-gradient-to-r from-body-gradient-two to-body-gradient-one dark:text-white"
                    >
                      <FaPhotoVideo />
                      <h1 className=" font-semibold">Courses</h1>
                    </Link>
                  </div>
                </>
              )}
              <div>
                {userData.role === "instructor" && (
                  <>
                    {/* // profile */}
                    <div
                      onClick={() => {
                        setHamburgerDropDown(false);
                      }}
                      className="py-2 px-3 rounded-lg mb-3 flex justify-between items-center w-full dark:bg-gradient-to-r from-body-gradient-two to-body-gradient-one dark:text-white"
                    >
                      <Link
                        to={`/instructor/profile`}
                        className="py-2 px-3 rounded-lg  flex justify-between items-center w-full dark:bg-gradient-to-r from-body-gradient-two to-body-gradient-one dark:text-white"
                      >
                        {userData.name.split(" ").shift()}
                      </Link>
                      <ThemeToggler />
                    </div>
                    {/*  *******/}
                    <div className="400px:hidden 400px:py-0 py-2 px-3 rounded-lg  mb-3 flex justify-between items-center w-full dark:bg-gradient-to-r from-body-gradient-two to-body-gradient-one dark:text-white">
                      <div className="py-2 px-3 rounded-lg  flex justify-start gap-2 items-center w-full dark:bg-gradient-to-r from-body-gradient-two to-body-gradient-one dark:text-white">
                        <MobileCourses
                          setHamburgerDropDown={setHamburgerDropDown}
                        />
                      </div>
                    </div>
                    {/******* *  */}
                    {/* // add course */}
                    <div
                      onClick={() => {
                        setHamburgerDropDown(false);
                      }}
                      className="400px:hidden 400px:py-0 py-2 px-3 rounded-lg  mb-3 flex justify-between items-center w-full dark:bg-gradient-to-r from-body-gradient-two to-body-gradient-one dark:text-white"
                    >
                      <Link
                        to={`/instructor/addcourses`}
                        className="py-2 px-3 rounded-lg  flex justify-start gap-2 items-center w-full dark:bg-gradient-to-r from-body-gradient-two to-body-gradient-one dark:text-white"
                      >
                        <FaPhotoVideo />
                        <h1 className=" font-semibold">Add Course</h1>
                      </Link>
                    </div>
                    {/* // my tutorial */}
                    <div
                      onClick={() => {
                        setHamburgerDropDown(false);
                      }}
                      className="400px:hidden 400px:py-0 py-2 px-3 rounded-lg  mb-3 flex justify-between items-center w-full dark:bg-gradient-to-r from-body-gradient-two to-body-gradient-one dark:text-white"
                    >
                      <Link
                        to={`/instructor/mytutorials`}
                        className="py-2 px-3 rounded-lg  flex justify-start gap-2 items-center w-full dark:bg-gradient-to-r from-body-gradient-two to-body-gradient-one dark:text-white"
                      >
                        <FaYoutube />
                        <h1 className=" font-semibold">My Tutorial</h1>
                      </Link>
                    </div>
                    {/* // my Learning */}
                    <div
                      onClick={() => {
                        setHamburgerDropDown(false);
                      }}
                      className="400px:hidden 400px:py-0 py-2 px-3 rounded-lg  mb-3 flex justify-between items-center w-full dark:bg-gradient-to-r from-body-gradient-two to-body-gradient-one dark:text-white"
                    >
                      <Link
                        to={`/instructor/my_learnings`}
                        className="py-2 px-3 rounded-lg  flex justify-start gap-2 items-center w-full dark:bg-gradient-to-r from-body-gradient-two to-body-gradient-one dark:text-white"
                      >
                        <FaBookOpenReader />
                        <h1 className=" font-semibold">My Learning</h1>
                      </Link>
                    </div>
                  </>
                )}

                {userData.role === "user" && (
                  <>
                    <div
                      onClick={() => {
                        setHamburgerDropDown(false);
                      }}
                      className="py-2 px-3 rounded-lg mb-3 flex justify-between items-center w-full dark:bg-gradient-to-r from-body-gradient-two to-body-gradient-one dark:text-white"
                    >
                      <Link
                        to={`/user/profile`}
                        className="py-2 px-3 rounded-lg  flex justify-between items-center w-full dark:bg-gradient-to-r from-body-gradient-two to-body-gradient-one dark:text-white"
                      >
                        {userData.name.split(" ").shift()}
                      </Link>
                      <ThemeToggler />
                    </div>
                    {/*  *******/}
                    <div className="400px:hidden 400px:py-0 py-2 px-3 rounded-lg  mb-3 flex justify-between items-center w-full dark:bg-gradient-to-r from-body-gradient-two to-body-gradient-one dark:text-white">
                      <div className="py-2 px-3 rounded-lg  flex justify-start gap-2 items-center w-full dark:bg-gradient-to-r from-body-gradient-two to-body-gradient-one dark:text-white">
                        <MobileCourses
                          setHamburgerDropDown={setHamburgerDropDown}
                        />
                      </div>
                    </div>
                    {/******* *  */}
                  </>
                )}

                {!userData.role && (
                  <div
                    onClick={() => {
                      setHamburgerDropDown(false);
                    }}
                    className="py-2 px-3 rounded-lg mb-3 flex justify-between items-center w-full dark:bg-gradient-to-r from-body-gradient-two to-body-gradient-one dark:text-white"
                  >
                    <Link
                      to={"/auth/login"}
                      className="py-2 px-3 rounded-lg  flex justify-between items-center w-full dark:bg-gradient-to-r from-body-gradient-two to-body-gradient-one dark:text-white"
                    >
                      <h1 className="flex justify-start items-end gap-5 text-2xl">
                        <CgProfile size={35} />
                        Profile
                      </h1>
                      <ThemeToggler />
                    </Link>
                  </div>
                )}

                {userData.name &&
                  userData.role !== "instructor" &&
                  userData.role !== "admin" && (
                    <div
                      onClick={() => {
                        setHamburgerDropDown(false);
                      }}
                      className="py-2 px-3 rounded-lg mb-3 flex justify-between items-center w-full dark:bg-gradient-to-r from-body-gradient-two to-body-gradient-one dark:text-white"
                    >
                      <Link
                        to={"/user/be_instructor"}
                        className="py-2 px-3 rounded-lg  flex justify-between items-center w-full dark:bg-gradient-to-r from-body-gradient-two to-body-gradient-one dark:text-white"
                      >
                        Teach on Edemy
                      </Link>
                    </div>
                  )}
                {userData.name && (
                  <>
                    {userData.role !== "admin" && (
                      <div
                        onClick={() => {
                          setHamburgerDropDown(false);
                        }}
                        className="py-2 px-3 rounded-lg mb-3 flex justify-between items-center w-full dark:bg-gradient-to-r from-body-gradient-two to-body-gradient-one dark:text-white"
                      >
                        <Link
                          to={`/${userData.role}/my_learnings`}
                          className="py-2 px-3 rounded-lg  flex justify-between items-center w-full dark:bg-gradient-to-r from-body-gradient-two to-body-gradient-one dark:text-white"
                        >
                          My Learnings
                        </Link>
                      </div>
                    )}
                    {/*  */}
                    <div
                      onClick={() => {
                        setHamburgerDropDown(false);
                      }}
                      className="py-2 px-3 rounded-lg mb-3 flex justify-between items-center w-full dark:bg-gradient-to-r from-body-gradient-two to-body-gradient-one dark:text-white"
                    >
                      <Link
                        to={"/be_instructor"}
                        className="py-2 px-3 rounded-lg  flex justify-start gap-2 items-center w-full dark:bg-gradient-to-r from-body-gradient-two to-body-gradient-one dark:text-white"
                      >
                        <FaCartPlus size={25} />
                        <h1>Cart</h1>
                      </Link>
                    </div>
                    {/*  */}
                    <div
                      onClick={() => {
                        setHamburgerDropDown(false);
                      }}
                      className="py-2 px-3 rounded-lg  flex justify-between items-center w-full dark:bg-gradient-to-r from-body-gradient-two to-body-gradient-one dark:text-white"
                    >
                      <Link
                        to={"/be_instructor"}
                        className="pt-2 pb-4 px-3 rounded-lg   flex justify-start gap-2 items-center w-full dark:bg-gradient-to-r from-body-gradient-two to-body-gradient-one dark:text-white"
                      >
                        <IoIosNotifications size={25} />
                        <h1>Notification</h1>
                      </Link>
                    </div>

                    <div
                      className="my-3 flex justify-start items-center gap-2 cursor-pointer ps-5 py-3 rounded-lg dark:bg-gradient-to-r from-body-gradient-two to-body-gradient-one hover:text-[21px]  transition-all ease duration-700"
                      onClick={() => {
                        handleLogout();
                      }}
                    >
                      <RiLogoutCircleRLine />
                      <h1> Logout</h1>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HamburgerMenu;
