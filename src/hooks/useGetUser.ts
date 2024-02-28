import { useSelector } from "react-redux";
import { IUserState } from "../redux/interfaces/authApi";
const useGetUser = () => {

  const user = useSelector(
    (state: { user: IUserState }) => state.user.userData
  );
  console.log("user from custom hook",user)
  return user;
};

export default useGetUser;
