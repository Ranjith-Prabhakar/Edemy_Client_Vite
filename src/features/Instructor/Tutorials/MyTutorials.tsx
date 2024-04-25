import { useEffect, useState } from "react";
import useGetUser from "../../../hooks/useGetUser";
import { ICourse } from "../../../redux/interfaces/Course/generalInterface";
import { useGetInstructorTutorialMutation } from "../../../redux/features/course/courseApi";
import Thead from "../../../components/Table/Thead";
import Th from "../../../components/Table/Th";
import TableBodyTr from "../../../components/Table/TableBodyTr";
import Td from "../../../components/Table/Td";
import { FaBackward, FaForward } from "react-icons/fa";
import { IoCaretBack, IoCaretForwardOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const MyTutorials = () => {
  const navigate = useNavigate()
  const user = useGetUser();
  const [getInstructorTutorial, { data, isSuccess }] =
    useGetInstructorTutorialMutation();
  const [pagination, setPagination] = useState(1);
  const [myTutorials, setMyTutorials] = useState<ICourse[]>([] as ICourse[]);

  useEffect(() => {
    const end = pagination * 10;
    const start = end - 10;
    const courses = user.courses?.slice(start, end);
    if (courses) {
      getInstructorTutorial({ courses: courses });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isSuccess) {
      setMyTutorials(data?.data as ICourse[]);
      setPagination(pagination + 1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg ">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 ">
        <Thead>
          <tr>
            <Th>Sl No</Th>
            <Th>Course</Th>
            <Th>No Purchase</Th>
            <Th>Status</Th>
          </tr>
        </Thead>

        <tbody>
          {myTutorials.map((item: ICourse, index: number) => (
            <TableBodyTr
              lastIndex={myTutorials.length !== index + 1}
              index={index}
              key={index}
            >
              <Td>{index + 1}</Td>
              <td
                className="px-6 py-4"
                onClick={() => {
                  navigate(`/category/all_category`, {
                    state: {
                      sort: "A-Z",
                      filter: "date",
                    },
                  });
                }}
              >
                {item.courseName.toUpperCase()}
              </td>
              <Td>{item.noOfPurchase}</Td>
              <Td>{item.status}</Td>
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

export default MyTutorials;
