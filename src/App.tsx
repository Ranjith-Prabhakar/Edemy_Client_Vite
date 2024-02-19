import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/User_Instructro/Home";
import Login from "./pages/User_Instructro/Login";
import SignUp from "./pages/User_Instructro/SignUp";
import AdminDash from "./pages/Admin/AdminDashBoard";
import OtpVerification from "./pages/User_Instructro/OtpVerification";
import UserProfile from "./pages/User_Instructro/UserProfile";
import ForgotPassword from "./pages/User_Instructro/forgotPassword";
import PageNotFound from "./pages/PageNotFound";
import ForgotOtpPasswordOtpVerification from "./pages/User_Instructro/forgotPasswordOtpVerification";
import ResetForgotPassword from "./pages/User_Instructro/ResetForgotPassword";
import UserDetails from "./pages/Admin/UserDetails";
import BeInstructor from "./pages/User_Instructro/BeInstructor";
import CoursePreview from "./components/Admin/Courses/Tables/CoursePreview";
CoursePreview

const App = () => {
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
        <Route
          path="/reset_forgot_password"
          element={<ResetForgotPassword />}
        />
        <Route path="/admin_dashbord" element={<AdminDash />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/user_details/:id" element={<UserDetails />} />
        <Route path="/be_instructor" element={<BeInstructor />} />
        <Route path="/course_preview" element={<CoursePreview />} />
        <Route path="/*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
