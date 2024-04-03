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
import { useSocketContext } from "../../../../context/SocketContextProvider";

const CourseRequestTable = () => {
  const { socketStore } = useSocketContext();
  const navigate = useNavigate();
  useGetCoursesInRequestQuery();
  const [tableData, setTableData] = useState<ICourse[]>([]);
  const coursesInRequest = useSelector(
    (state: { courses: ICourseInitialState }) => state.courses.coursesInRequest
  );
  const [approveOrRejectCourse] = useApproveOrRejectCourseMutation();

  console.log("socketStore.addedCourse", socketStore.addedCourses);

  useEffect(() => {
    setTableData([...tableData, ...socketStore.addedCourses]);
  }, [socketStore.addedCourses]);

  useEffect(() => {
    setTableData(coursesInRequest);
  }, [coursesInRequest]);

  return (
    <>
      {tableData && tableData.length ? (
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
                            instructorId: item.instructor,
                            courseName:item.courseName
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
                            instructorId: item.instructor,
                            courseName: item.courseName,
                          });
                        }}
                      >
                        Reject
                      </button>
                    </div>
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
      ) : (
        <div className="flex justify-center items-center h-full">
          {" "}
          <h1 className="text-4xl font-semibold italic">
            No courses requests have been found
          </h1>
        </div>
      )}
    </>
  );
};

export default CourseRequestTable;
