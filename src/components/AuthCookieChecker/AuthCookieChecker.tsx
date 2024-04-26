import { useNavigate } from "react-router-dom";
import { userLoggedIn } from "../../redux/features/auth/authSlice";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

const AuthCookieChecker = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const accessToken = urlParams.get("accessToken");
  const refreshToken = urlParams.get("refreshToken");
  const userData = urlParams.get("userData");

  Cookies.set("accessToken", accessToken as string);
  Cookies.set("refreshToken", refreshToken as string);


  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (userData) {
      dispatch(userLoggedIn({ userData: JSON.parse(userData) }));

      // Delay navigation until cookies are set
      setTimeout(() => {
        setLoading(false);
        navigate("/");
      }, 1000); // Adjust the delay time as needed
    }
  }, [dispatch, navigate, userData]);

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      {loading && (
        <svg
          aria-hidden="true"
          className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* SVG content */}
        </svg>
      )}
    </div>
  );
};

export default AuthCookieChecker;
