import { useSelector } from "react-redux";
import { IUserState } from "../redux/interfaces/authApi";
const useGetUser = () => {
  const user = useSelector(
    (state: { user: IUserState }) => state.user.userData
  );
  return user;
};

export default useGetUser;
