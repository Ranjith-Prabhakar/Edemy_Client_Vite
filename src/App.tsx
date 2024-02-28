import "./assets/App.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
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
import CourseSinglePage from "./pages/User_Instructro/CourseSinglePage";
import { IUserState } from "./redux/features/auth/authSlice";
import { useSelector } from "react-redux";


const App = () => {
  const userName = useSelector((state: IUserState) => state.user.userData.name);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={userName ? <Navigate to={"/"} /> : <Login />}
        />
        <Route
          path="/sign-up"
          element={userName ? <Navigate to={"/"} /> : <SignUp />}
        />
        <Route
          path="/otp_verification"
          element={userName ? <Navigate to={"/"} /> : <OtpVerification />}
        />
        <Route
          path="/forgot_password"
          element={userName ? <Navigate to={"/"} /> : <ForgotPassword />}
        />
        <Route
          path="/forgot_password_otp_verification"
          element={
            userName ? (
              <Navigate to={"/"} />
            ) : (
              <ForgotOtpPasswordOtpVerification />
            )
          }
        />
        <Route
          path="/reset_forgot_password"
          element={userName ? <Navigate to={"/"} /> : <ResetForgotPassword />}
        />
        <Route path="/admin_dashbord" element={<AdminDash />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/user_details/:id" element={<UserDetails />} />
        <Route path="/be_instructor" element={<BeInstructor />} />
        <Route path="/course_preview" element={<CoursePreview />} />
        <Route path="/course_single_page" element={<CourseSinglePage />} />
        <Route path="/*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
