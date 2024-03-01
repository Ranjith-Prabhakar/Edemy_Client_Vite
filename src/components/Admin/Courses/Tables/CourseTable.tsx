import { FaRegCircleStop } from "react-icons/fa6";
import { FaBackward } from "react-icons/fa";
import { FaForward } from "react-icons/fa";
import { IoCaretBack } from "react-icons/io5";
import { IoCaretForwardOutline } from "react-icons/io5";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { useGetCoursesQuery } from "../../../../redux/features/course/courseApi";
import { ICourseInitialState } from "../../../../redux/features/course/courseSlice";
import { ICourse } from "../../../../redux/interfaces/Course/generalInterface";
import Thead from "../../../Table/Thead";
import Th from "../../../Table/Th";
import TableBodyTr from "../../../Table/TableBodyTr";
import Td from "../../../Table/Td";

const CourseTable = () => {
  useGetCoursesQuery();
  const navigate = useNavigate();
  const [tableData, setTableData] = useState<ICourse[]>([]);
  const coursesData = useSelector(
    (state: { courses: ICourseInitialState }) => state.courses.coursesData
  );

  useEffect(() => {
    setTableData(coursesData);
  }, [coursesData]);

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg ">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 ">
        <Thead>
          <tr>
            <Th>Sl No</Th>
            <Th>Course</Th>
            <Th>Instructor</Th>
            <Th>No Purchase</Th>
            <Th>Status</Th>
            <Th>Freez</Th>
          </tr>
        </Thead>

        {/* <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Sl No
            </th>
            <th scope="col" className="px-6 py-3">
              Id
            </th>
            <th scope="col" className="px-6 py-3">
              Course
            </th>

            <th scope="col" className="px-6 py-3">
              Instructor
            </th>
            <th scope="col" className="px-6 py-3">
              No Purchase
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
        </thead> */}
        <tbody>
          {tableData.map((item: ICourse, index: number) => (
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
                {item.courseName.toUpperCase()}
              </td>
              <Td>{item.instructor}</Td>
              <Td>{item.noOfPurchase}</Td>
              <Td>{item.status}</Td>
              <Td>
                {item.status === "approved" ? (
                  <button className="border rounded-full px-5 hover:text-red-600 hover:scale-105">
                    Freez
                  </button>
                ) : (
                  <button className="border rounded-full px-5 hover:text-yellow-300 hover:scale-105">
                    Un Freez
                  </button>
                )}
              </Td>
            </TableBodyTr>
            // <tr
            //   className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
            //   key={index}
            // >
            //   <td className="px-6 py-4">{index + 1}</td>
            //   <td
            //     className="px-6 py-4 cursor-pointer"
            //     onClick={() => {
            //       navigate(`/user_details/${item._id}`);
            //     }}
            //   >
            //     {item._id}
            //   </td>
            //   <td className="px-6 py-4">{item.courseName}</td>
            //   <td className="px-6 py-4">{item.instructor}</td>
            //   <td className="px-6 py-4">{item.noOfPurchase}</td>
            //   <td className="px-6 py-4">{item.status}</td>
            //   <td className="px-6 py-4">
            //     {item.status === "approved" ? (
            //       <FaRegCircleStop />
            //     ) : (
            //       <FaRegCircleStop color="red" />
            //     )}
            //   </td>
            // </tr>
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

export default CourseTable;
