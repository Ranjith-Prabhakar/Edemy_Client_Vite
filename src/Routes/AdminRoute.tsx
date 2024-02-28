import { Route, Routes } from "react-router-dom";
import CoursePreview from "../components/Admin/Courses/Tables/CoursePreview";
import AdminDash from "../pages/Admin/AdminDashBoard";
import CourseSinglePage from "../pages/User_Instructro/CourseSinglePage";
import UserDetails from "../pages/Admin/UserDetails";

const AdminRoute = () => {
  return (
    <div>
      <Routes>
        <Route path="/admin_dashbord" element={<AdminDash />} />
        <Route path="/user_details/:id" element={<UserDetails />} />
        <Route path="/course_preview" element={<CoursePreview />} />
        <Route path="/course_single_page" element={<CourseSinglePage />} />
      </Routes>
    </div>
  );
}

export default AdminRoute