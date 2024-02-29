import { Route, Routes, useNavigate } from "react-router-dom";
import useGetUser from "../hooks/useGetUser";
import UserProfile from "../pages/User_Instructro/UserProfile";
import BeInstructor from "../pages/User_Instructro/BeInstructor";

const UserRoute = () => {
  const user = useGetUser();
  const navigate = useNavigate()
  if(!user.name){
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

export default UserRoute;
