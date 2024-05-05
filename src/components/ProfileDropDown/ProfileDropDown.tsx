// import { FaBookOpenReader } from "react-icons/fa6";
// import { Link } from "react-router-dom";

// type Props = {
//   role: string;
//   setProfileDropDownMenu: React.Dispatch<React.SetStateAction<boolean>>;
// };

// const ProfileDropDown = ({ role, setProfileDropDownMenu }: Props) => {
//   console.log(role);
//   return (
//     <>
//       {role === "user" && (
//         <div>
//           <div
//             onClick={() => {
//               setProfileDropDownMenu(false);
//             }}
//             className=" py-2 px-3 rounded-lg  mb-3 flex justify-between items-center w-full dark:bg-gradient-to-r from-body-gradient-two to-body-gradient-one dark:text-white"
//           >
//             <Link
//               to={`/instructor/my_learnings`}
//               className="py-2 px-3 rounded-lg  flex justify-start gap-2 items-center w-full dark:bg-gradient-to-r from-body-gradient-two to-body-gradient-one dark:text-white"
//             >
//               <FaBookOpenReader />
//               <h1 className=" font-semibold">My Learning</h1>
//             </Link>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default ProfileDropDown;

import { useEffect, useState } from "react";
import { IoCloseCircleOutline } from "react-icons/io5";
import useGetUser from "../../hooks/useGetUser";
import { Link, useNavigate } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { useLogoutMutation } from "../../redux/features/auth/authApi";
import toast from "react-hot-toast";
import responseErrorCatch from "../../utils/responseErrorToast";
import { FaPhotoVideo } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaBookOpenReader } from "react-icons/fa6";
import { GiTeacher } from "react-icons/gi";
const ProfileDropDown = () => {
  const [name, setName] = useState("");
  const userData = useGetUser();
  const [hamburgerDropDown, setHamburgerDropDown] = useState(false);
  const [logout, { data, isError, isSuccess, error }] = useLogoutMutation();
  const navigate = useNavigate();

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
    <div className="relative">
      {!userData.role && (
        <Link
          to={"/auth/login"}
        >
          <CgProfile size={35} />
        </Link>
      )}
      {userData.role && (
          <div
            className="cursor-pointer rounded-full flex justify-center items-center w-[35px] h-[35px] bg-white text-[#09616A]"
            onClick={() => {
              if (userData.role === "admin") {
                navigate("/admin/dash_bord");
              } else {
                setHamburgerDropDown(!hamburgerDropDown);
              }
            }}
          >
            <h1 className=" font-bold">{name}</h1>
          </div>
      )}

      {hamburgerDropDown && (
        <div className="absolute top-10  right-4 w-[300px]  h-[580px] overflow-scroll   border rounded-lg bg-c_color-colorSeven">
          <div className="relative w-full h-full p-3 pb-11">
            <IoCloseCircleOutline
              size={45}
              className="absolute right-3 top-4 cursor-pointer "
              onClick={() => {
                setHamburgerDropDown(false);
              }}
            />
            <div className=" mt-20 ps-4 flex flex-col ">
              <div>
                {userData.role === "instructor" && (
                  <>
                    {/* // profile */}
                    <div className="py-2 px-3 rounded-lg mb-3 flex justify-between items-center w-full dark:bg-gradient-to-r from-body-gradient-two to-body-gradient-one dark:text-white">
                      <div className="py-2 px-3 rounded-lg  flex justify-between items-center w-full dark:bg-gradient-to-r from-body-gradient-two to-body-gradient-one dark:text-white">
                        {userData.name.split(" ").shift()}
                      </div>
                    </div>

                    {/* // add course */}
                    <div
                      onClick={() => {
                        setHamburgerDropDown(false);
                      }}
                      className=" py-2 px-3 rounded-lg  mb-3 flex justify-between items-center w-full dark:bg-gradient-to-r from-body-gradient-two to-body-gradient-one dark:text-white"
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
                      className=" py-2 px-3 rounded-lg  mb-3 flex justify-between items-center w-full dark:bg-gradient-to-r from-body-gradient-two to-body-gradient-one dark:text-white"
                    >
                      <Link
                        to={`/instructor/mytutorials`}
                        className="py-2 px-3 rounded-lg  flex justify-start gap-2 items-center w-full dark:bg-gradient-to-r from-body-gradient-two to-body-gradient-one dark:text-white"
                      >
                        <FaYoutube />
                        <h1 className=" font-semibold">My Tutorial</h1>
                      </Link>
                    </div>
                  </>
                )}

                {userData.role === "user" && (
                  <>
                    <div className="py-2 px-3 rounded-lg mb-3 flex justify-between items-center w-full dark:bg-gradient-to-r from-body-gradient-two to-body-gradient-one dark:text-white">
                      <div className="py-2 px-3 rounded-lg  flex justify-between items-center w-full dark:bg-gradient-to-r from-body-gradient-two to-body-gradient-one dark:text-white">
                        {userData.name.split(" ").shift()}
                      </div>
                    </div>
                  </>
                )}

                {/* {!userData.role && (
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
                    </Link>
                  </div>
                )} */}

                {userData.name &&
                  userData.role !== "instructor" &&
                  userData.role !== "admin" && (
                    <div
                      onClick={() => {
                        setHamburgerDropDown(false);
                      }}
                      className=" py-2 px-3 rounded-lg  mb-3 flex justify-between items-center w-full dark:bg-gradient-to-r from-body-gradient-two to-body-gradient-one dark:text-white"
                    >
                      <Link
                        to={"/be_instructor"}
                        className="py-2 px-3 rounded-lg  flex justify-start gap-2 items-center w-full dark:bg-gradient-to-r from-body-gradient-two to-body-gradient-one dark:text-white"
                      >
                        <GiTeacher />
                        <h1 className=" font-semibold">Teach on Edemy</h1>
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
                        className="py-2 px-3 rounded-lg  mb-3 flex justify-between items-center w-full dark:bg-gradient-to-r from-body-gradient-two to-body-gradient-one dark:text-white"
                      >
                        <Link
                          to={`/${userData.role}/my_learnings`}
                          className="py-2 px-3 rounded-lg  flex justify-start gap-2 items-center w-full dark:bg-gradient-to-r from-body-gradient-two to-body-gradient-one dark:text-white"
                        >
                          <FaBookOpenReader />
                          <h1 className=" font-semibold">My Learning</h1>
                        </Link>
                      </div>
                    )}
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

export default ProfileDropDown;
