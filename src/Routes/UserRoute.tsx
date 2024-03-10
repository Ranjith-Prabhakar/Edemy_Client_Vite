import { Route, Routes, useNavigate } from "react-router-dom";
import useGetUser from "../hooks/useGetUser";
import UserDash from "../pages/User/UserDash";
import BeInstructor from "../pages/User/BeInstructor";
import PaymentSucess from "../features/PaymentSucess";

const UserRoute = () => {
  const user = useGetUser();
  const navigate = useNavigate();
  if (!user.name) {
    // logout isnt working to make it work proper made this line have to re-consider the logout
    navigate("/auth/login");
  }
  console.log("user in User", user);
  return (
    <div>
      {user.role === "user" && (
        <Routes>
          <Route path="/profile/*" element={<UserDash />} />
          <Route path="/be_instructor" element={<BeInstructor />} />
          <Route path="payment_success" element={<PaymentSucess />} />
        </Routes>
      )}
    </div>
  );
};

export default UserRoute;
