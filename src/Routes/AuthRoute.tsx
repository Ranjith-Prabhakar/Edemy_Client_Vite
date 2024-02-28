import { Route, Routes } from "react-router-dom";
import Login from "../pages/User_Instructro/Login";
import SignUp from "../pages/User_Instructro/SignUp";
import OtpVerification from "../pages/User_Instructro/OtpVerification";
import ForgotPassword from "../pages/User_Instructro/forgotPassword";
import ForgotOtpPasswordOtpVerification from "../pages/User_Instructro/forgotPasswordOtpVerification";
import ResetForgotPassword from "../pages/User_Instructro/ResetForgotPassword";

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

// import { Route, Routes } from "react-router-dom";
// import Login from "../pages/User_Instructro/Login";
// import SignUp from "../pages/User_Instructro/SignUp";
// import OtpVerification from "../pages/User_Instructro/OtpVerification";
// import ForgotPassword from "../pages/User_Instructro/forgotPassword";
// import ForgotOtpPasswordOtpVerification from "../pages/User_Instructro/forgotPasswordOtpVerification";
// import ResetForgotPassword from "../pages/User_Instructro/ResetForgotPassword";

// const AuthRoute = () => {
//   return (
//     <Routes>
//       <Route
//         path="/login"
//         element={userName ? <Navigate to={"/"} /> : <Login />}
//       />
//       <Route
//         path="/sign-up"
//         element={userName ? <Navigate to={"/"} /> : <SignUp />}
//       />
//       <Route
//         path="/otp_verification"
//         element={userName ? <Navigate to={"/"} /> : <OtpVerification />}
//       />
//       <Route
//         path="/forgot_password"
//         element={userName ? <Navigate to={"/"} /> : <ForgotPassword />}
//       />
//       <Route
//         path="/forgot_password_otp_verification"
//         element={
//           userName ? (
//             <Navigate to={"/"} />
//           ) : (
//             <ForgotOtpPasswordOtpVerification />
//           )
//         }
//       />
//       <Route
//         path="/reset_forgot_password"
//         element={userName ? <Navigate to={"/"} /> : <ResetForgotPassword />}
//       />
//     </Routes>
//   );
// };

// export default AuthRoute;
