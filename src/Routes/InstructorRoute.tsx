import { Route, Routes, useNavigate } from "react-router-dom";
import useGetUser from "../hooks/useGetUser";
import UserProfile from "../pages/User_Instructro/InstructorDash";
import BeInstructor from "../pages/User_Instructro/BeInstructor";

const InstructorRoute = () => {
  const user = useGetUser();
  const navigate = useNavigate()
  if(!user.name){ // logout isnt working to make it work proper made this line have to re-consider the logout
    navigate('/auth/login')
  }
  console.log("user in User", user);
  return (
    <div>
      {user.role === "instructor" && (
        <Routes>
          <Route path="/profile/*" element={<UserProfile />} />
          <Route path="/be_instructor" element={<BeInstructor />} />
        </Routes>
      )}
    </div>
  );
};

export default InstructorRoute;
