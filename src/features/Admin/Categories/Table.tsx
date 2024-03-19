import { FaBackward } from "react-icons/fa";
import { FaForward } from "react-icons/fa";
import { IoCaretBack } from "react-icons/io5";
import { IoCaretForwardOutline } from "react-icons/io5";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import {
  useFreezCategoriesMutation,
  useUnFreezCategoriesMutation,
} from "../../../redux/features/admin/Categories/categoryApi";
import toast from "react-hot-toast";
import Thead from "../../../components/Table/Thead";
import Th from "../../../components/Table/Th";
import TableBodyTr from "../../../components/Table/TableBodyTr";
import Td from "../../../components/Table/Td";
import {
  ICategory,
  ICategoryState,
} from "../../../redux/features/admin/Categories/categorySlice";

const Table = () => {
  const [tableData, setTableData] = useState<ICategory[]>([]);
  const categoryData = useSelector(
    (state: { category: ICategoryState }) => state.category.categoryData
  );
  const [freezCategories, { data, isSuccess, isError }] =
    useFreezCategoriesMutation();
  const [
    unFreezCategories,
    { data: unFreezData, isSuccess: unFreezIsSuccess, isError: unFreezIsError },
  ] = useUnFreezCategoriesMutation();

  useEffect(() => {
    setTableData(categoryData);
  }, [categoryData]);

  useEffect(() => {
    if (isSuccess) toast.success(data.message);
    else if (isError) toast.error("exicution failed");
  }, [isSuccess, isError, data]);

  useEffect(() => {
    if (unFreezIsSuccess) toast.success(unFreezData.message);
    else if (unFreezIsError) toast.error("exicution failed");
  }, [unFreezIsSuccess, unFreezIsError, unFreezData, isError]);

  return (
    <>
      {tableData && tableData.length ? (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg ">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 ">
            <Thead>
              <tr>
                <Th>Sl No</Th>
                <Th>Name</Th>
                <Th>courses</Th>
                <Th>Status</Th>
                <Th>Freez</Th>
              </tr>
            </Thead>

            <tbody>
              {tableData?.map((item, index) => (
                <TableBodyTr
                  lastIndex={tableData.length !== index + 1}
                  index={index}
                >
                  <Td>{index + 1}</Td>
                  <td className="px-6 py-4">{item.name.toUpperCase()}</td>
                  <Td>{item.noOfCourses ? item.noOfCourses : 0}</Td>
                  <Td>{item.status}</Td>
                  <Td>
                    {item.status === "active" ? (
                      <button
                        className="border rounded-full px-5 hover:text-red-600 hover:scale-105"
                        onClick={() => {
                          freezCategories(item._id);
                        }}
                      >
                        Freez
                      </button>
                    ) : (
                      <button
                        className="border rounded-full px-5 hover:text-yellow-300 hover:scale-105"
                        onClick={() => {
                          unFreezCategories(item._id);
                        }}
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
      ) : (
        <div className="flex justify-center items-center h-full">
          {" "}
          <h1 className="text-4xl font-semibold italic">
            No Categories Have Been Created Yet
          </h1>
        </div>
      )}
    </>
  );
};

export default Table;
