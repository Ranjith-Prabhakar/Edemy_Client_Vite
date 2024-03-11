import { FaBackward } from "react-icons/fa";
import { FaForward } from "react-icons/fa";
import { IoCaretBack } from "react-icons/io5";
import { IoCaretForwardOutline } from "react-icons/io5";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  useApproveOrRejectCourseMutation,
  useGetCoursesInRequestQuery,
} from "../../../../redux/features/course/courseApi";
import { ICourseInitialState } from "../../../../redux/features/course/courseSlice";
import { ICourse } from "../../../../redux/interfaces/Course/generalInterface";
import Thead from "../../../../components/Table/Thead";
import Th from "../../../../components/Table/Th";
import TableBodyTr from "../../../../components/Table/TableBodyTr";
import Td from "../../../../components/Table/Td";

const CourseRequestTable = () => {
  const navigate = useNavigate();
  useGetCoursesInRequestQuery();
  const [tableData, setTableData] = useState<ICourse[]>([]);
  const coursesInRequest = useSelector(
    (state: { courses: ICourseInitialState }) => state.courses.coursesInRequest
  );
  const [approveOrRejectCourse] = useApproveOrRejectCourseMutation();

  useEffect(() => {
    setTableData(coursesInRequest);
    console.log("table data ",tableData)
  }, [coursesInRequest, tableData]);

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg ">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 ">
        <Thead>
          <tr>
            <Th>Sl No</Th>
            <Th>Course</Th>
            <Th>Instructor</Th>
            <Th>Status</Th>
            <Th>Action</Th>
          </tr>
        </Thead>

      
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
                  navigate("/admin/dash_bord/course_preview", {
                    state: { courseData: item },
                  });
                }}
              >
                {item.courseName.toUpperCase()}
              </td>
              <Td>{item.instructor}</Td>
              <Td>{item.status}</Td>
              <Td>
                <div className="flex justify-start gap-3 ">
                  <button
                    className="dark:bg-cyan-500 py-1 px-4 rounded-full"
                    onClick={() => {
                      approveOrRejectCourse({
                        courseId: item._id,
                        action: "approved",
                      });
                    }}
                  >
                    Approve
                  </button>
                  <button
                    className="dark:bg-red-700 py-1 px-4 rounded-full"
                    onClick={() => {
                      approveOrRejectCourse({
                        courseId: item._id,
                        action: "rejected",
                      });
                    }}
                  >
                    Reject
                  </button>
                </div>
              </Td>
            </TableBodyTr>

            // <tr
            //   className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
            //   key={index}
            // >
            //   <td className="px-6 py-4 cursor-pointer">{index + 1}</td>
            //   <td
            //     className="px-6 py-4 cursor-pointer"
            //     onClick={() => {
            //       navigate("/course_preview", { state: { courseData: item } });
            //     }}
            //   >
            //     {item.courseName}
            //   </td>
            //   <td className="px-6 py-4 cursor-pointer">{item.instructor}</td>
            //   <td className="px-6 py-4 cursor-pointer">{item.status}</td>
            //   <td className="px-6 py-4 cursor-pointer">
            //     <div className="flex justify-start gap-3 ">
            //       <button className="bg-gray-50 dark:bg-gray-700 py-1 px-2 rounded-md">
            //         Approve
            //       </button>
            //       <button className="bg-gray-50 dark:bg-gray-700 py-1 px-2 rounded-md">
            //         Reject
            //       </button>
            //     </div>
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

export default CourseRequestTable;