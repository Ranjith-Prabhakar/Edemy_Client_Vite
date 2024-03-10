import { Route, Routes, useNavigate } from "react-router-dom";
import useGetUser from "../hooks/useGetUser";
import InstructorDash from "../pages/Instructor/InstructorDash";
import PaymentSucess from "../features/PaymentSucess";

const InstructorRoute = () => {
  const user = useGetUser();
  const navigate = useNavigate();
  if (!user.name) {
    // logout isnt working to make it work proper made this line have to re-consider the logout
    navigate("/auth/login");
  }
  console.log("user in User", user);
  return (
    <div>
      {user.role === "instructor" && (
        <Routes>
          <Route path="/profile/*" element={<InstructorDash />} />
          <Route path="payment_success" element={<PaymentSucess />} />
        </Routes>
      )}
    </div>
  );
};

export default InstructorRoute;
