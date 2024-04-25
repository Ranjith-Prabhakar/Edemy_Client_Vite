import Table from "./Table";
import { useGetUsersMutation } from "../../../redux/features/admin/Users/userApi";
import SearchButton from "../../../components/Buttons/SearchButton";
import DashBordSearch from "../../../components/inputFields/DashBordSearch";
import { useEffect, useState } from "react";
const Users = () => {
  const [pageNo, setPageNo] = useState(1);
  const [permitedNext, setPermitedNext] = useState(1);
  const [getUsers, { isSuccess, data }] = useGetUsersMutation();
   useEffect(() => {
    getUsers({ pageNo });
  }, [pageNo]);
  useEffect(() => {
    getUsers({ pageNo });
  }, []);

  useEffect(() => {
    if (isSuccess) {
      if (isSuccess) {
        if (data && "data" in data) {
          setPermitedNext(data.data.permitedNext);
        }
      }
    }
  }, [isSuccess]);

  return (
    <div className="h-full w-full">
      <div className="flex items-center justify-between mb-2">
        <h2 className="font-bold tracking-[2px] text-[25px] ms-10">Users</h2>
        <div className="flex  items-end justify-center gap-2">
          <DashBordSearch />
          <SearchButton />
        </div>
      </div>
      <Table
        setPageNo={setPageNo}
        permitedNext={permitedNext}
        pageNo={pageNo}
      />
    </div>
  );
};
export default Users;
