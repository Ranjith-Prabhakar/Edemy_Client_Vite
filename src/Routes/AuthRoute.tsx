import { Route, Routes } from "react-router-dom";
import { lazy } from "react";

const Login = lazy(() => import("../pages/Auth/Login"));
const SignUp = lazy(() => import("../pages/Auth/SignUp"));
const OtpVerification = lazy(() => import("../pages/Auth/OtpVerification"));
const ForgotPassword = lazy(() => import("../pages/Auth/ForgotPassword"));
const ForgotOtpPasswordOtpVerification = lazy(
  () => import("../pages/Auth/ForgotOtpPasswordOtpVerification")
);
const ResetForgotPassword = lazy(
  () => import("../pages/Auth/ResetForgotPassword")
);

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
