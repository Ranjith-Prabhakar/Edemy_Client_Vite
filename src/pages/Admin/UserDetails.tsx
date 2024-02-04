import React, { useEffect, useState } from "react";
import { IUser } from "../../redux/features/admin/Users/userSlice";
import { useSelector } from "react-redux";

type Props = {
  id?: string;
};

const UserDetails = ({ id }: Props) => {
  console.log("id",id)
  const { usersData } = useSelector((state: any) => state.users);
  const [user, setUser] = useState({} as IUser);
  useEffect(() => {
    const currentUser = usersData.find((item:IUser) => item._id === id);
    setUser(currentUser);
  }, [usersData]);
  return <div><h1>{user.name}</h1></div>;
};

export default UserDetails;
