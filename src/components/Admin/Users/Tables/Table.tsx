import { FaRegCircleStop } from "react-icons/fa6";
import { FaBackward } from "react-icons/fa";
import { FaForward } from "react-icons/fa";
import { IoCaretBack } from "react-icons/io5";
import { IoCaretForwardOutline } from "react-icons/io5";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useFreezUserMutation } from "../../../../redux/features/admin/Users/userApi";

const Table = () => {
  const navigate = useNavigate();
  const [tableData, setTableData] = useState([]);
  const { usersData } = useSelector((state: any) => state.users);

  const [freezUser, { data, isSuccess, isError, error }] =
    useFreezUserMutation();

  useEffect(() => {
    setTableData(usersData);
    console.log("table data", tableData);
  }, [usersData]);

  useEffect(() => {
    if (isSuccess) console.log("inside table ", data);
    else if (isError) console.log("inside table ", error);
  }, [isSuccess, isError]);

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg ">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 ">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Sl No
            </th>
            <th scope="col" className="px-6 py-3">
              Id
            </th>
            <th scope="col" className="px-6 py-3">
              Name
            </th>

            <th scope="col" className="px-6 py-3">
              Enrolled course
            </th>
            <th scope="col" className="px-6 py-3">
              courses
            </th>
            <th scope="col" className="px-6 py-3">
              Status
            </th>

            <th
              scope="col"
              className="px-6 py-3 flex justify-center items-center"
            >
              Freez
            </th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((item: any, index: any) => (
            <tr
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              key={index}
            >
              <td className="px-6 py-4">{index + 1}</td>
              <td
                className="px-6 py-4 cursor-pointer"
                onClick={() => {
                  navigate("/user_details", { state: { id: item._id } });
                }}
              >
                {item._id}
              </td>
              <td className="px-6 py-4">{item.name}</td>
              <td className="px-6 py-4">{item.enrolledCourses.length}</td>
              <td className="px-6 py-4">{item.courses.length}</td>
              <td className="px-6 py-4">{item.status}</td>
              <td className="px-6 py-4">
                {item.status === "active" ? (
                  <FaRegCircleStop onClick={() => freezUser(item._id)} />
                ) : (
                  <FaRegCircleStop color="red" />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className=" dark:bg-gray-700 dark:text-gray-400 p-3 flex justify-end gap-1">
        <h4 className="me-2">4 of 5</h4>
        <input
          type="text"
          className="w-[30px] h-[25px] text-black p-0 text-center rounded-md"
        />
        <select
          name=""
          id=""
          className="w-[120px] h-[25px] text-black p-0 ps-2 text-center rounded-md"
        >
          <option value="">5 pages</option>
          <option value="">10 pages</option>
          <option value="">25 pages</option>
          <option value="">50 pages</option>
          <option value="">100 pages</option>
        </select>
        <div className="flex gap-2 mx-2 items-center">
          <FaBackward />
          <IoCaretBack />
          <IoCaretForwardOutline />
          <FaForward />
        </div>
      </div>
    </div>
  );
};

export default Table;
