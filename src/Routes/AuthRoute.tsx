import { Route, Routes } from "react-router-dom";
import Login from "../pages/Auth/Login";
import SignUp from "../pages/Auth/SignUp";
import OtpVerification from "../pages/Auth/OtpVerification";
import ForgotPassword from "../pages/Auth/forgotPassword";
import ForgotOtpPasswordOtpVerification from "../pages/Auth/forgotPasswordOtpVerification";
import ResetForgotPassword from "../pages/Auth/ResetForgotPassword";

const AuthRoute = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/otp_verification" element={<OtpVerification />} />
      <Route path="/forgot_password" element={<ForgotPassword />} />
      <Route
        path="/forgot_password_otp_verification"
        element={<ForgotOtpPasswordOtpVerification />}
      />
      <Route path="/reset_forgot_password" element={<ResetForgotPassword />} />
    </Routes>
  );
};

export default AuthRoute;

