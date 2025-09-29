import { useEffect, useState } from "react";
import useGetUser from "../../../hooks/useGetUser";
import { useLogoutMutation } from "../../../redux/features/auth/authApi";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import responseErrorCatch from "../../../utils/responseErrorToast";

export function useHamburgerMenu() {
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

  return {
    userData,
    hamburgerDropDown,
    setHamburgerDropDown,
    handleLogout,
  };
}
