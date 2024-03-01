import Table from "./Tables/Table";
import { useGetUsersQuery } from "../../../redux/features/admin/Users/userApi";
import SearchButton from "../../Buttons/searchButton";
import DashBordSearch from "../../inputFields/DashBordSearch";
const Users = () => {
  const { data, isError, isSuccess, error } = useGetUsersQuery();

  if (isSuccess) {
    console.log(data);
  } else if (isError) {
    console.log(error);
  }

  return (
    <div className="h-full w-full">
      <div className="flex items-center justify-between mb-2">
        <h2 className="font-bold tracking-[2px] text-[25px] ms-10">Users</h2>
        <div className="flex  items-end justify-center gap-2">
          <DashBordSearch />
          <SearchButton />
        </div>
      </div>
      <Table />
    </div>
  );
};
export default Users;
