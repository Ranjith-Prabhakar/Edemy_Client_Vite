import { TbCategoryPlus } from "react-icons/tb";
import {  useState } from "react";
import AddUser from "./AddUser";
import Table from "./Tables/Table"; 

const Users = () => {
  const [addUser, setAddUser] = useState(false);
  return (
    <div className="h-full w-full">
      <div className="flex items-center justify-between">
        <button
          className="dark:bg-gray-700 dark:text-gray-400  px-3 rounded-sm h-[30px] flex items-center gap-1 font-bold"
          onClick={() => {
            setAddUser(!addUser);
          }}
        >
          Add new <TbCategoryPlus className="" />
        </button>
        <h2 className="font-bold tracking-[2px] text-[25px] text-gray-500 dark:text-gray-400">
          Users
        </h2>
        <div className="flex gap-2">
          <input type="text" className="bg-gray-800 rounded-md h-[30px]" />
          <button className=" px-3 rounded-sm h-[30px] font-bold dark:bg-gray-700 dark:text-gray-400">
            Search
          </button>
        </div>
      </div>
      {addUser && <AddUser setAddUser={setAddUser} addUser={addUser} />}
      <Table />
    </div>
  );
};
export default Users;
