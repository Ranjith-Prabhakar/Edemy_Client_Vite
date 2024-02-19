import { FaBackward } from "react-icons/fa";
import { FaForward } from "react-icons/fa";
import { IoCaretBack } from "react-icons/io5";
import { IoCaretForwardOutline } from "react-icons/io5";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {useNavigate} from 'react-router-dom'
import { useGetCoursesInRequestQuery } from "../../../../redux/features/course/courseApi";
import { ICourseInitialState } from "../../../../redux/features/course/courseSlice";
import { ICourse } from "../../../../redux/interfaces/Course/generalInterface";

const CourseRequestTable = () => {
  const navigate = useNavigate()
  useGetCoursesInRequestQuery();
  const [tableData, setTableData] = useState<ICourse[]>([]);
  const coursesInRequest = useSelector(
    (state: { courses: ICourseInitialState }) => state.courses.coursesInRequest
  );

  useEffect(() => {
    setTableData(coursesInRequest);
  }, [coursesInRequest]);

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg ">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 ">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Sl No
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
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((item: ICourse, index: number) => (
            <tr
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              key={index}
            >
              <td className="px-6 py-4 cursor-pointer">{index + 1}</td>
              <td className="px-6 py-4 cursor-pointer" onClick={()=>{navigate("/course_preview", { state: { courseData: item } });}}>{item.courseName}</td>
              <td className="px-6 py-4 cursor-pointer">{item.instructor}</td>
              <td className="px-6 py-4 cursor-pointer">{item.noOfPurchase}</td>
              <td className="px-6 py-4 cursor-pointer">{item.status}</td>
              <td className="px-6 py-4 cursor-pointer">
                <div className="flex justify-start gap-3 ">
                  <button className="bg-gray-50 dark:bg-gray-700 py-1 px-2 rounded-md">
                    Approve
                  </button>
                  <button className="bg-gray-50 dark:bg-gray-700 py-1 px-2 rounded-md">
                    Reject
                  </button>
                </div>
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

export default CourseRequestTable;
