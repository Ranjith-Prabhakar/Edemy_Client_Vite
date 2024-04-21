import { Route, Routes, useNavigate } from "react-router-dom";

import useGetUser from "../hooks/useGetUser";
import AdminDash from "../pages/Admin/AdminDashBoard";
import { useEffect } from "react";

const AdminRoute = () => {
  const user = useGetUser();
  const navigate = useNavigate();
  useEffect(() => {
    if (!user.name) {
      navigate("/auth/login");
    }
  }, [navigate, user.name]);

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
