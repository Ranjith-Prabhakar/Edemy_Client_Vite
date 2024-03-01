import { FaRegCircleStop } from "react-icons/fa6";
import { FaBackward } from "react-icons/fa";
import { FaForward } from "react-icons/fa";
import { IoCaretBack } from "react-icons/io5";
import { IoCaretForwardOutline } from "react-icons/io5";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  useFreezInstructorMutation,
  useUnFreezInstructorMutation,
} from "../../../redux/features/admin/Instructors/instructorsApi";

import toast from "react-hot-toast";
import Thead from "../../Table/Thead";
import Th from "../../Table/Th";
import TableBodyTr from "../../Table/TableBodyTr";
import Td from "../../Table/Td";

const Table = () => {
  const navigate = useNavigate();
  const [tableData, setTableData] = useState([]);
  const { instructorData } = useSelector((state: any) => state.instructors);

  const [freezInstructor, { data, isSuccess, isError }] =
    useFreezInstructorMutation();
  const [
    unFreezInstructor,
    {
      data: unFreezUserData,
      isSuccess: unFreezUserIsSuccess,
      isError: unFreezUserIsError,
    },
  ] = useUnFreezInstructorMutation();

  useEffect(() => {
    setTableData(instructorData);
    console.log("table data", tableData);
  }, [instructorData]);

  useEffect(() => {
    if (isSuccess) toast.success(data.message);
    else if (isError) toast.error("exicution failed");
  }, [isSuccess, isError]);

  useEffect(() => {
    if (unFreezUserIsSuccess) toast.success(unFreezUserData.message);
    else if (unFreezUserIsError) toast.error("exicution failed");
  }, [unFreezUserIsSuccess, unFreezUserIsError]);
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg ">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 ">
        <Thead>
          <tr>
            <Th>Sl No</Th>
            <Th>Name</Th>
            <Th>Enrolled course</Th>
            <Th>courses</Th>
            <Th>Status</Th>
            <Th>Freez</Th>
          </tr>
        </Thead>
        <tbody>
          {tableData.map((item: any, index: any) => (
            <TableBodyTr
              lastIndex={tableData.length !== index + 1}
              index={index}
            >
              <Td>{index + 1}</Td>
              <td
                className="px-6 py-4"
                onClick={() => {
                  navigate(`user_details/${item._id}`);
                }}
              >
                {item.name.toUpperCase()}
              </td>
              <Td>{item.enrolledCourses.length}</Td>
              <Td>{item.courses.length}</Td>
              <Td>{item.status}</Td>
              <Td>
                {item.status === "active" ? (
                  <button
                    className="border rounded-full px-5 hover:text-red-600 hover:scale-105"
                    onClick={async () => await freezInstructor(item._id)}
                  >
                    Freez
                  </button>
                ) : (
                  <button
                    className="border rounded-full px-5 hover:text-yellow-300 hover:scale-105"
                    onClick={() => unFreezInstructor(item._id)}
                  >
                    Un Freez
                  </button>
                )}
              </Td>
            </TableBodyTr>
          ))}
        </tbody>
      </table>
      <div className=" dark:bg-c_color-colorSeven p-3 flex justify-end gap-1">
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
