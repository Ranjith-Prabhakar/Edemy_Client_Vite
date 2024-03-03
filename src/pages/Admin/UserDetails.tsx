import { useEffect, useState } from "react";
import { IUser } from "../../redux/features/admin/Users/userSlice";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { IUserState } from "../../redux/features/admin/Users/userSlice";

const UserDetails = () => {
  const {id} = useParams();
 
  const usersData = useSelector(
    (state: { users: IUserState }) => state.users.usersData
  );
  const [user, setUser] = useState<IUser>();

  useEffect(() => {
    const currentUser = usersData.find((user: IUser) => user._id === id);
    setUser(currentUser);
  }, [id, usersData]);
  console.log("usersData", user);
  return (
    <div>
      <h1>{user?.name && user?.name}</h1>
    </div>
  );
};

export default UserDetails;
