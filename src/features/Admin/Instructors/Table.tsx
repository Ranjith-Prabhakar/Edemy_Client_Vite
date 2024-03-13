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
import Thead from "../../../components/Table/Thead";
import Th from "../../../components/Table/Th";
import TableBodyTr from "../../../components/Table/TableBodyTr";
import Td from "../../../components/Table/Td";
import { IInstructor, IInstructorState } from "../../../redux/features/admin/Instructors/instructorsSlice";

const Table = () => {
  const navigate = useNavigate();
  const [tableData, setTableData] = useState<IInstructor[]>([]);
  const instructorData = useSelector(
    (state: { instructors: IInstructorState }) =>
      state.instructors.instructorData
  );

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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [instructorData]);

  useEffect(() => {
    if (isSuccess) toast.success(data.message);
    else if (isError) toast.error("exicution failed");
  }, [isSuccess, isError, data]);

  useEffect(() => {
    if (unFreezUserIsSuccess) toast.success(unFreezUserData.message);
    else if (unFreezUserIsError) toast.error("exicution failed");
  }, [unFreezUserIsSuccess, unFreezUserIsError, unFreezUserData]);
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
          {tableData.map((item, index) => (
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
              <Td>{item?.enrolledCourses?.length}</Td>
              <Td>{item?.courses?.length}</Td>
              <Td>{item.status}</Td>
              <Td>
                {item.status === "active" ? (
                  <button
                    className="border rounded-full px-5 hover:text-red-600 hover:scale-105"
                    onClick={async () => await freezInstructor(item._id as string)}
                  >
                    Freez
                  </button>
                ) : (
                  <button
                    className="border rounded-full px-5 hover:text-yellow-300 hover:scale-105"
                    onClick={() => unFreezInstructor(item._id as string)}
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
