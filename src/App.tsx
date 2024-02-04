import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import AdminDash from "./pages/AdminDashBoard";
import OtpVerification from "./pages/OtpVerification";
import UserProfile from "./pages/UserProfile";
import ForgotPassword from "./pages/forgotPassword";
import PageNotFound from "./pages/PageNotFound";
import ForgotOtpPasswordOtpVerification from "./pages/forgotPasswordOtpVerification";
import ResetForgotPassword from "./pages/ResetForgotPassword";

type Props = {};

const App = (props: Props) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/otp_verification" element={<OtpVerification />} />
        <Route path="/forgot_password" element={<ForgotPassword />} />
        <Route
          path="/forgot_password_otp_verification"
          element={<ForgotOtpPasswordOtpVerification />}
        />
        <Route path="/reset_forgot_password" element={<ResetForgotPassword />} />
        <Route path="/admin_dashbord" element={<AdminDash />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
