import React, { useEffect, useState } from "react";
import { IUser } from "../../redux/features/admin/Users/userSlice";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const UserDetails = () => {
  const {id} = useParams();
  console.log(id);
  const { usersData } = useSelector((state: any) => state.users);
  const [user, setUser] = useState({} as IUser);

  useEffect(() => {
    let currentUser = usersData.find((user: any) => user._id === id);
    setUser(currentUser);
  }, [usersData]);
  console.log("usersData", user);
  return (
    <div>
      <h1>{user.name && user.name}</h1>
    </div>
  );
};

export default UserDetails;
