import { Route, Routes, useNavigate } from "react-router-dom";
import useGetUser from "../hooks/useGetUser";
import InstructorDash from "../pages/Instructor/InstructorDash";
import PaymentSucess from "../features/PaymentSucess";
import MyLearninig from "../pages/General/MyLearninig";

const InstructorRoute = () => {
  const user = useGetUser();
  const navigate = useNavigate();
  if (!user.name) {
    navigate("/auth/login");
  }
  return (
    <div>
      {user.role === "instructor" && (
        <Routes>
          <Route path="/profile/*" element={<InstructorDash />} />
          <Route path="payment_success" element={<PaymentSucess />} />
          <Route path="my_learnings" element={<MyLearninig />} />
        </Routes>
      )}
    </div>
  );
};

export default InstructorRoute;
