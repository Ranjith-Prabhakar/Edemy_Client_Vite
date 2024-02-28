import { useSelector } from "react-redux";
import { IUserState } from "../redux/features/auth/authSlice";
const useGetUser = () => {
  const user = useSelector((state: IUserState) => state.user.userData);
  console.log("user from custom hook",user)
  return user;
};

export default useGetUser;
