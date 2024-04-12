import { Link, useNavigate } from "react-router-dom";
import { FaRegHeart } from "react-icons/fa";
import { FaCartPlus } from "react-icons/fa6";
import { IoIosNotifications } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import ThemeToggler from "../components/utils/ThemeToggler";
import { useEffect, useState } from "react";
import useGetUser from "../hooks/useGetUser";
import { ICategory } from "../redux/interfaces/Course/getCategories";
import { useGetCategoryQuery } from "../redux/features/course/courseApi";
import { catchError } from "../utils/catchError";
import { RxHamburgerMenu } from "react-icons/rx";
import { useSocketContext } from "../context/SocketContextProvider";
import { IoCloseCircleOutline } from "react-icons/io5";
import { IoIosArrowRoundForward } from "react-icons/io";
import useInitialNotificationLoader, {
  ENotification,
  ENotificationMsg,
} from "../hooks/useInitialNotificationLoader";
import { useEditNotificationMutation } from "../redux/features/notifications/notificationsApi";
import {useDispatch} from "react-redux"
import { userRoleChange } from "../redux/features/auth/authSlice";
type props = {
  isScrolled?: boolean;
};
const Header = ({ isScrolled }: props) => {
  //
  useInitialNotificationLoader();
  //
  const { notificationStore } = useSocketContext();
  const [editNotification] = useEditNotificationMutation();
  console.log("notificationStore ~~~~~~~~", notificationStore);
  const userData = useGetUser();
  const [name, setName] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const [notificationSideBar, setNotificationSideBar] = useState(false);
  const [hamburgerDropDown, setHamburgerDropDown] = useState(false);
  const { data, isSuccess } = useGetCategoryQuery();
  const [categoryList, addCategoryList] = useState<ICategory[]>([]);
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");
  const dispatch = useDispatch()

  useEffect(() => {
    if (userData.name) {
      setName(
        userData.name.substring(0, 1)[0].toUpperCase() +
          userData.name.substring(1, 2)
      );
    }
  }, [userData]);

  useEffect(() => {
    if (isSuccess) {
      addCategoryList(data.data as ICategory[]);
    }
  }, [isSuccess]);

  const handleSearch = async (key: string) => {
    try {
      if (
        categoryList.length &&
        categoryList.some(
          (category: ICategory) =>
            category.name.toLowerCase() === key.toLowerCase()
        )
      ) {
        navigate(`/category/${key.toLocaleLowerCase().replace(/\s/g, "_")}`, {
          state: { sort: "A-Z", filter: "date" },
        });
      } else {
        navigate("/search_course", {
          state: {
            queryData: {
              key,
              sort: "A-Z",
              filter: "date",
            },
          },
        });
      }
    } catch (error) {
      catchError(error);
    }
  };

 

  return (
    <>
      <div
        className={`sticky top-0 rounded-b-3xl z-50 text-xl p-5 ${
          isScrolled
            ? "bg-c_color-colorOne shadow-2xl opacity-0 hover:opacity-100 "
            : "bg-transparent"
        }`}
      >
        <div className="flex justify-between items-end">
          <div className="flex justify-between items-end 1200px:flex-3">
            <Link to={"/"}>
              <h1 className=" text-2xl font-bold italic ">
                <span className="text-4xl font-bold">E</span>demy
              </h1>
            </Link>

            <div
              className="relative w-[20%] hidden 1200px:block"
              onMouseEnter={() => {
                setIsHovered(true);
              }}
              onMouseLeave={() => {
                setIsHovered(false);
              }}
            >
              <h1 className="cursor-pointer">Courses</h1>
              <ul
                className={`absolute ${
                  isHovered ? "block leading-10 pt-3" : "hidden"
                } `}
              >
                <li
                  className="cursor-pointer min-w-fit rounded-xl capitalize italic font-normal hover:scale-110 bg-c_color-colorSeven mb-1 px-5"
                  onClick={() =>
                    navigate("/category/all_category", {
                      state: { sort: "A-Z", filter: "date" },
                    })
                  }
                >
                  All Category
                </li>
                {categoryList &&
                  categoryList.map((item, index) => (
                    <li
                      className="cursor-pointer min-w-fit rounded-xl capitalize italic font-normal hover:scale-110 bg-c_color-colorSeven mb-1 px-5"
                      onClick={() =>
                        navigate(
                          `/category/${item.name
                            .toLocaleLowerCase()
                            .replace(/\s/g, "_")}`,
                          {
                            state: { sort: "A-Z", filter: "date" },
                          }
                        )
                      }
                      key={index}
                    >
                      {item.name}
                    </li>
                  ))}
              </ul>
            </div>
          </div>

          <div className="1200px:flex-2">
            <input
              className={`rounded-full w-96 h-[35px] px-7 outline-none font-semibold ${
                isScrolled
                  ? "dark:bg-slate-50 placeholder:text-black dark:text-black"
                  : "dark:bg-slate-400 focus:border-1 focus:border-white placeholder:text-black dark:text-black"
              }  focus:border-1 focus:border-white `}
              type="search"
              placeholder="search...."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSearch(searchValue);
              }}
            />
          </div>
          <div>
            <div className="relative 1200px:hidden">
              <RxHamburgerMenu
                className="cursor-pointer"
                onClick={() => {
                  setHamburgerDropDown(!hamburgerDropDown);
                }}
              />
              {hamburgerDropDown && (
                <div className="absolute  top-8  right-4  w-[200px]  border rounded-lg bg-c_color-colorSeven">
                  <div className="relative w-full h-full">
                    <IoCloseCircleOutline
                      size={25}
                      className="absolute right-3 -top-8 cursor-pointer"
                      onClick={() => {
                        setHamburgerDropDown(false);
                      }}
                    />
                    <div className="mt-10 flex flex-col">
                      {userData.role === "admin" && (
                        <div className="py-2 px-3 rounded-lg  flex justify-between items-center w-full hover:dark:bg-gradient-to-r from-body-gradient-one to-body-gradient-two dark:text-white">
                          <Link to={`/admin/dash_bord`}>
                            <h1 className=" font-semibold">
                              {userData.name.split(" ").shift()}
                            </h1>
                          </Link>
                          <ThemeToggler />
                        </div>
                      )}

                      {userData.role === "instructor" && (
                        <Link
                          to={`/instructor/profile`}
                          className="py-2 px-3 rounded-lg  flex justify-between items-center w-full hover:dark:bg-gradient-to-r from-body-gradient-one to-body-gradient-two dark:text-white"
                        >
                          {userData.name.split(" ").shift()}
                        </Link>
                      )}

                      {userData.role === "user" && (
                        <Link
                          to={`/user/profile`}
                          className="py-2 px-3 rounded-lg  flex justify-between items-center w-full hover:dark:bg-gradient-to-r from-body-gradient-one to-body-gradient-two dark:text-white"
                        >
                          {userData.name.split(" ").shift()}
                        </Link>
                      )}

                      {!userData.role && (
                        <Link to={"/auth/login"}>
                          <CgProfile size={25} />
                        </Link>
                      )}

                      {userData.name &&
                        userData.role !== "instructor" &&
                        userData.role !== "admin" && (
                          <Link
                            to={"/user/be_instructor"}
                            className="py-2 px-3 rounded-lg  flex justify-between items-center w-full hover:dark:bg-gradient-to-r from-body-gradient-one to-body-gradient-two dark:text-white"
                          >
                            Teach on Edemy
                          </Link>
                        )}
                      {userData.name && (
                        <>
                          {userData.role !== "admin" && (
                            <Link
                              to={`/${userData.role}/my_learnings`}
                              className="py-2 px-3 rounded-lg  flex justify-between items-center w-full hover:dark:bg-gradient-to-r from-body-gradient-one to-body-gradient-two dark:text-white"
                            >
                              My Learnings
                            </Link>
                          )}

                          <Link
                            to={"/categories"}
                            className="py-2 px-3 rounded-lg  flex justify-start gap-2 items-center w-full hover:dark:bg-gradient-to-r from-body-gradient-one to-body-gradient-two dark:text-white"
                          >
                            <FaRegHeart size={25} />
                            <h1>Favourite</h1>
                          </Link>
                          <Link
                            to={"/be_instructor"}
                            className="py-2 px-3 rounded-lg  flex justify-start gap-2 items-center w-full hover:dark:bg-gradient-to-r from-body-gradient-one to-body-gradient-two dark:text-white"
                          >
                            <FaCartPlus size={25} />
                            <h1>Cart</h1>
                          </Link>
                          <Link
                            to={"/be_instructor"}
                            className="pt-2 pb-4 px-3 rounded-lg   flex justify-start gap-2 items-center w-full hover:dark:bg-gradient-to-r from-body-gradient-one to-body-gradient-two dark:text-white"
                          >
                            <IoIosNotifications size={25} />
                            <h1>Notification</h1>
                          </Link>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="hidden 1200px:flex justify-center items-center gap-4">
              <ThemeToggler />
              {userData.name &&
                userData.role !== "instructor" &&
                userData.role !== "admin" && (
                  <Link to={"/user/be_instructor"}>Teach on Edemy</Link>
                )}
              {userData.name && (
                <>
                  {userData.role !== "admin" && (
                    <Link to={`/${userData.role}/my_learnings`}>
                      My Learnings
                    </Link>
                  )}

                  <Link to={"/categories"}>
                    <FaRegHeart size={25} />
                  </Link>
                  <Link to={"/be_instructor"}>
                    <FaCartPlus size={25} />
                  </Link>
                  <div className="relative">
                    <IoIosNotifications
                      size={25}
                      className="cursor-pointer"
                      onClick={() => {
                        setNotificationSideBar(true);
                      }}
                    />
                    {notificationStore.length > 1 && (
                      <div className="w-[10px] h-[10px] rounded-full bg-red-500 absolute top-0 right-0" />
                    )}
                    {notificationSideBar && (
                      <div className="absolute -right-4 top-10  h-[500px] min-w-[500px] shadow-2xl ">
                        <div className="relative p-5 pt-10 w-full h-full border rounded-lg dark:bg-c_color-colorSeven">
                          <IoCloseCircleOutline
                            size={25}
                            className="absolute right-3 top-3 cursor-pointer"
                            onClick={() => {
                              setNotificationSideBar(false);
                            }}
                          />
                          {notificationStore.length ? (
                            notificationStore.map((notification, index) => (
                              <h1
                                key={index}
                                onClick={async () => {
                                  let result;
                                
                                  switch (notification.message) {
                                    
                                    case ENotificationMsg.instructorRequests:
                                      result = await editNotification({
                                        notificationHead:
                                          ENotification.instructorRequests,
                                      });
                                      if ("data" in result) {
                                        if ("success" in result.data) {
                                          navigate(`${notification.url}`, {
                                            state: { index: index },
                                          });
                                        }
                                      }
                                      break;
                                    case ENotificationMsg.courseApprovalApprovance:
                                      result = await editNotification({
                                        notificationHead:
                                          ENotification.courseApprovalApprovance,
                                      });

                                      if ("data" in result) {
                                        if ("success" in result.data) {
                                          navigate(`${notification.url}`);
                                        }
                                      }
                                      break;
                                    case ENotificationMsg.courseApprovalRequest:
                                      result = await editNotification({
                                        notificationHead:
                                          ENotification.courseApprovalRequest,
                                      });

                                      if ("data" in result) {
                                        if ("success" in result.data) {
                                          navigate(`${notification.url}`);
                                        }
                                      }
                                      break;
                                    case ENotificationMsg.instructorRequestApproval:
                                      result = await editNotification({
                                        notificationHead:
                                          ENotification.instructorRequestApproval,
                                      });

                                      dispatch(userRoleChange());
                                     
                                      if ("data" in result) {
                                        if ("success" in result.data) {
                                          navigate(`${notification.url}`);
                                        }
                                      }
                                      break;
                                  }
                                }}
                                className="cursor-pointer dark:bg-gradient-to-r from-body-gradient-one to-body-gradient-two dark:text-white p-3 rounded-lg text-sm border"
                              >
                                {notification.message}{" "}
                                <IoIosArrowRoundForward className="inline" />
                              </h1>
                            ))
                          ) : (
                            <h1>No notifications . . . . </h1>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
