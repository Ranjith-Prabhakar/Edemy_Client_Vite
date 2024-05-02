import { IconType } from "react-icons";
import { useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../../redux/features/auth/authApi";
import { useEffect } from "react";
import toast from "react-hot-toast";
import responseErrorCatch from "../../utils/responseErrorToast";
import { RiLogoutCircleRLine } from "react-icons/ri";
import useGetUser from "../../hooks/useGetUser";

type Props = {
  sideBarData: { name: string; icon: IconType }[];
};

const Profile = ({ sideBarData }: Props) => {
  const role = useGetUser().role;
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
    <div className=" custom-scrollBar 400px:flex flex-col h-screen overflow-scroll w-full m-auto rounded-lg text-xl dark:bg-c_color-colorOne shadow-md ring-gray-400 space-y-3">
      <div className="flex flex-col  w-full">
        {sideBarData &&
          sideBarData.map((item) => (
            <div
              className="flex justify-start items-center gap-2 cursor-pointer ps-5 py-3 hover:bg-c_color-colorSeven hover:text-[21px] hover:rounded-md transition-all ease duration-700"
              key={item.name}
              onClick={() => {
                if (role === "admin")
                  navigate(`/admin/dash_bord/${item.name.toLowerCase()}`);
                else
                  navigate(
                    `/${role}/${item.name.toLowerCase().replace(/\s+/g, "")}`
                  ); // this regex is used for removing spaces between words
              }}
            >
              <item.icon />
              <h1 className="capitalize"> {item.name.replace(/_/g, " ")}</h1>
            </div>
          ))}
        <div
          className="flex justify-start items-center gap-2 cursor-pointer ps-5 py-3  hover:bg-c_color-colorSeven hover:text-[21px] hover:rounded-md transition-all ease duration-700"
          onClick={() => {
            handleLogout();
          }}
        >
          <RiLogoutCircleRLine />
          <h1> Logout</h1>
        </div>
      </div>
    </div>
  );
};

export default Profile;
