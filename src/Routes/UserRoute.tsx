import { Route, Routes, useNavigate } from "react-router-dom";
import useGetUser from "../hooks/useGetUser";
import UserDash from "../pages/User/UserDash";
import BeInstructor from "../pages/User/BeInstructor";
import PaymentSucess from "../features/PaymentSucess";
import MyLearninig from "../pages/General/MyLearninig";

const UserRoute = () => {
  const user = useGetUser();
  const navigate = useNavigate();
  if (!user.name) {
    navigate("/auth/login");
  }
  return (
    <div>
      {user.role === "user" && (
        <Routes>
          <Route path="/profile/*" element={<UserDash />} />
          <Route path="/be_instructor" element={<BeInstructor />} />
          <Route path="payment_success" element={<PaymentSucess />} />
          <Route path="my_learnings" element={<MyLearninig />} />
        </Routes>
      )}
    </div>
  );
};

export default UserRoute;
