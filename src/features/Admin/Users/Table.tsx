import { FaRegArrowAltCircleLeft } from "react-icons/fa";
import { FaRegArrowAltCircleRight } from "react-icons/fa";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  useFreezUserMutation,
  useUnFreezUserMutation,
} from "../../../redux/features/admin/Users/userApi";
import toast from "react-hot-toast";
import TableBodyTr from "../../../components/Table/TableBodyTr";
import Th from "../../../components/Table/Th";
import Thead from "../../../components/Table/Thead";
import Td from "../../../components/Table/Td";
import {
  IUserState,
  IUser,
} from "../../../redux/features/admin/Users/userSlice";

type Props = {
  setPageNo: React.Dispatch<React.SetStateAction<number>>;
  permitedNext: number;
  pageNo: number;
};

const Table = ({ setPageNo, permitedNext, pageNo }: Props) => {
  const navigate = useNavigate();
  const [tableData, setTableData] = useState<IUser[]>([]);
  const usersData = useSelector(
    (state: { users: IUserState }) => state.users.usersData
  );

  const [freezUser, { data, isSuccess, isError }] = useFreezUserMutation();
  const [
    unFreezUser,
    {
      data: unFreezUserData,
      isSuccess: unFreezUserIsSuccess,
      isError: unFreezUserIsError,
    },
  ] = useUnFreezUserMutation();

  useEffect(() => {
    setTableData(usersData);
  }, [tableData, usersData]);

  useEffect(() => {
    if (isSuccess) toast.success(data.message);
    else if (isError) toast.error("exicution failed");
  }, [isSuccess, isError, data]);

  useEffect(() => {
    if (unFreezUserIsSuccess) toast.success(unFreezUserData.message);
    else if (unFreezUserIsError) toast.error("exicution failed");
  }, [unFreezUserIsSuccess, unFreezUserIsError, unFreezUserData]);

  const handlePrev = () => {
    setPageNo((prev) => {
      if (prev > 1) {
        return prev - 1;
      } else {
        return prev;
      }
    });
  };
  const handleNext = () => {
    setPageNo((prev) => {
      if (prev < permitedNext) {
        return prev + 1;
      } else {
        return prev;
      }
    });
  };

  return (
    <>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg ">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 ">
          <Thead>
            <tr>
              <Th>Sl No</Th>
              <Th>Name</Th>
              <Th>Enrolled course</Th>
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
                <Td>{pageNo * 10 - 10 + (index + 1)}</Td>

                <td
                  className="px-6 py-4"
                  onClick={() => {
                    navigate(`user_details/${item._id}`);
                  }}
                >
                  {item.name.toUpperCase()}
                </td>
                <Td>{item.enrolledCourses?.length}</Td>
                <Td>{item.status}</Td>
                <Td>
                  {item.status === "active" ? (
                    <button
                      className="border rounded-full px-5 hover:text-red-600 hover:scale-105"
                      onClick={async () => await freezUser(item._id as string)}
                    >
                      Freez
                    </button>
                  ) : (
                    <button
                      className="border rounded-full px-5 hover:text-yellow-300 hover:scale-105"
                      onClick={() => unFreezUser(item._id as string)}
                    >
                      Un Freez
                    </button>
                  )}
                </Td>
              </TableBodyTr>
            ))}
          </tbody>
        </table>
        <div className=" dark:bg-c_color-colorSeven p-3 flex justify-end pe-10 gap-10">
          <FaRegArrowAltCircleLeft
            size={30}
            title="prev"
            onClick={() => {
              handlePrev();
            }}
            className="cursor-pointer"
          />
          <FaRegArrowAltCircleRight
            size={30}
            title="next"
            onClick={() => {
              handleNext();
            }}
            className="cursor-pointer"
          />
        </div>
      </div>
    </>
  );
};

export default Table;
