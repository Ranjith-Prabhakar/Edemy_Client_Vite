import { Route, Routes, useNavigate } from "react-router-dom";
// import CoursePreview from "../components/Admin/Courses/Tables/CoursePreview";
// import AdminDash from "../pages/Admin/AdminDashBoard";
// import CourseSinglePage from "../pages/User_Instructro/CourseSinglePage";
// import UserDetails from "../pages/Admin/UserDetails";
import useGetUser from "../hooks/useGetUser";
import AdminDash from "../pages/Admin/AdminDashBoard";

const AdminRoute = () => {
  const user = useGetUser();
  const navigate = useNavigate();
  if (!user.name) {
    // logout isnt working to make it work proper made this line have to re-consider the logout
    navigate("/auth/login");
  }
  console.log("user in adminRoute", user);
  return (
    <div>
      {user.role === "admin" && (
        <Routes>
          <Route path="/dash_bord/*" element={<AdminDash />} />
          {/* <Route path="/admin_dashbord" element={<AdminDash />} />
          <Route path="/user_details/:id" element={<UserDetails />} />
          <Route path="/course_preview" element={<CoursePreview />} />
          <Route path="/course_single_page" element={<CourseSinglePage />} /> */}
        </Routes>
      )}
    </div>
  );
};

export default AdminRoute;
