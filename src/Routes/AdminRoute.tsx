import { Route, Routes, useNavigate } from "react-router-dom";

import useGetUser from "../hooks/useGetUser";
import AdminDash from "../pages/Admin/AdminDashBoard";

const AdminRoute = () => {
  const user = useGetUser();
  const navigate = useNavigate();
  if (!user.name) {
    navigate("/auth/login");
  }
  return (
    <div>
      {user.role === "admin" && (
        <Routes>
          <Route path="/dash_bord/*" element={<AdminDash />} />
        </Routes>
      )}
    </div>
  );
};

export default AdminRoute;
