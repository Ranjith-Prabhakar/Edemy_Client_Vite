import { Route, Routes } from "react-router-dom";
import useGetUser from "../hooks/useGetUser";
import UserProfile from "../pages/User_Instructro/UserProfile";

const User = () => {
  const user = useGetUser();
  console.log("user in User", user);
  return (
    <div>
      {user.role === "instructor" && (
        <Routes>
          <Route path="profile" element={<UserProfile />} />
        </Routes>
      )}
    </div>
  );
};

export default User;
