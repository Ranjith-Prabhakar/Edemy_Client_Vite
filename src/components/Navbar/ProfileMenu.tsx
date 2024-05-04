import { Link } from "react-router-dom";
import useGetUser from "../../hooks/useGetUser";
import { useEffect, useState } from "react";
import { CgProfile } from "react-icons/cg";
import ProfileDropDown from "../ProfileDropDown/ProfileDropDown";

const ProfileMenu = () => {
  const userData = useGetUser();
  const [name, setName] = useState("");
  const [profileDropDownMenu,setProfileDropDownMenu] = useState(false);

  useEffect(() => {
    if (userData.name) {
      setName(
        userData.name.substring(0, 1)[0].toUpperCase() +
          userData.name.substring(1, 2)
      );
    }
  }, [userData]);

  return (
    <>
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

      {/* {userData.role === "user" && (
        <Link to={`/user/profile`}>
          <div className="rounded-full flex justify-center items-center w-[35px] h-[35px] bg-white text-[#09616A]">
            <h1 className=" font-bold">{name}</h1>
          </div>
        </Link>
      )} */}
      {userData.role === "user" && (
        <div
          onClick={() => {
            setProfileDropDownMenu(true);
          }}
        >
          <div className="rounded-full flex justify-center items-center w-[35px] h-[35px] bg-white text-[#09616A]">
            <h1 className=" font-bold">{name}</h1>
          </div>
          {profileDropDownMenu && (
            <ProfileDropDown  />
          )}
        </div>
      )}

      {!userData.role && (
        <Link to={"/auth/login"}>
          <CgProfile size={35} />
        </Link>
      )}
    </>
  );
};

export default ProfileMenu;
