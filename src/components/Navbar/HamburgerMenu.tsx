import { useState } from 'react'
import { IoCloseCircleOutline } from 'react-icons/io5';
import { RxHamburgerMenu } from 'react-icons/rx';
import useGetUser from '../../hooks/useGetUser';
import { Link } from 'react-router-dom';
import ThemeToggler from '../utils/ThemeToggler';
import { CgProfile } from 'react-icons/cg';
import { FaCartPlus } from 'react-icons/fa';
import { IoIosNotifications } from 'react-icons/io';


const HamburgerMenu = () => {
  const userData = useGetUser();
  const [hamburgerDropDown, setHamburgerDropDown] = useState(false);
  return (
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
  );
}

export default HamburgerMenu