import { useEffect, useState } from "react";
import useGetUser from "../../../hooks/useGetUser";
import { useLogoutMutation } from "../../../redux/features/auth/authApi";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import responseErrorCatch from "../../../utils/responseErrorToast";

export function useProfileDropDown() {
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

  return {
    name,
    hamburgerDropDown,
    userData,
    setHamburgerDropDown,
    handleLogout,
    navigate,
  };
}
