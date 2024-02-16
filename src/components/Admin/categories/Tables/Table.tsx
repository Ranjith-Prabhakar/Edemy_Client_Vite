import { FaRegCircleStop } from "react-icons/fa6";
import { FaBackward } from "react-icons/fa";
import { FaForward } from "react-icons/fa";
import { IoCaretBack } from "react-icons/io5";
import { IoCaretForwardOutline } from "react-icons/io5";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  useFreezCategoriesMutation,
  useUnFreezCategoriesMutation,
} from "../../../../redux/features/admin/Categories/categoryApi";
import toast from "react-hot-toast";

const Table = () => {
  const [tableData, setTableData] = useState([]);
  const { categoryData } = useSelector((state: any) => state.category);
  const [freezCategories,{data,isSuccess,isError}] = useFreezCategoriesMutation();
  const [
    unFreezCategories,
    {
      data: unFreezData,
      isSuccess: unFreezIsSuccess,
      isError: unFreezIsError,
    },
  ] = useUnFreezCategoriesMutation();

  useEffect(() => {
    setTableData(categoryData);
  }, [categoryData]);

  useEffect(() => {
    if(isSuccess)toast.success(data.message)
    else if(isError)toast.error("exicution failed")
  }, [isSuccess, isError]);


  useEffect(() => {
    if (isSuccess) toast.success(unFreezData.message);
    else if (isError) toast.error("exicution failed");
  }, [unFreezIsSuccess, unFreezIsError]);

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
              No Of Courses
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
          {tableData?.map((item: any, index: any) => (
            <tr
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              key={index}
            >
              <td className="px-6 py-4">{index + 1}</td>
              <td className="px-6 py-4">{item._id}</td>
              <td className="px-6 py-4">{item.name}</td>
              <td className="px-6 py-4">
                {item.No_Of_Courses ? item.No_Of_Courses : 0}
              </td>
              <td className="px-6 py-4">{item.status}</td>

              <td className="px-6 py-4 flex justify-center items-center">
                {item.status === "active" ? (
                  <FaRegCircleStop
                    className="cursor-pointer"
                    size={18}
                    color="white"
                    onClick={() => {
                      freezCategories(item._id);
                    }}
                  />
                ) : (
                  <FaRegCircleStop
                    size={18}
                    color="red"
                    className="cursor-pointer"
                    onClick={() => {
                      unFreezCategories(item._id);
                    }}
                  />
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