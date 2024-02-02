import { TbCategoryPlus } from "react-icons/tb";
import { IoCaretBack } from "react-icons/io5";
import { IoCaretForwardOutline } from "react-icons/io5";
import { FaBackward } from "react-icons/fa";
import { FaForward } from "react-icons/fa";
import { useEffect, useState } from "react";
import { FaRegCircleStop } from "react-icons/fa6";
import AddCategory from "./AddCategoryForm";
import { useFetchCategoriesQuery } from "../../../redux/features/admin/category/categoryApi";
import Table from "../Tables/Table";
type Props = {};

const Categories = (props: Props) => {
  const [addCategory, setAddCategory] = useState(false);

  const fetchCategoriesQuery = useFetchCategoriesQuery({});
  const { data } = fetchCategoriesQuery;

  const fetchData = async () => {
    try {
      await fetchCategoriesQuery.refetch(); // Refetch if needed
    } catch (error) {
      console.error("Error fetching categories", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="flex flex-col gap-2  dark:bg-gray-950 text-[#FFD700] p-3 rounded-md w-full relative">
      <div className="flex items-center justify-between">
        <button
          className="dark:bg-gray-700 dark:text-gray-400  px-3 rounded-sm h-[30px] flex items-center gap-1 font-bold"
          onClick={() => {
            setAddCategory(!addCategory);
          }}
        >
          Add new <TbCategoryPlus className="" />
        </button>
        <h2 className="font-bold tracking-[2px] text-[25px] text-gray-500 dark:text-gray-400">
          Categories
        </h2>
        {/* <h1>{data}</h1> */}
        <div className="flex gap-2">
          <input type="text" className="bg-gray-800 rounded-md h-[30px]" />
          <button className=" px-3 rounded-sm h-[30px] font-bold dark:bg-gray-700 dark:text-gray-400">
            Search
          </button>
        </div>
      </div>

      {addCategory && <AddCategory />}

      <Table data={data?.data} />

      {/* <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
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
            {data?.data?.map((item: any, index: any) => (
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
                  <FaRegCircleStop size={18} />
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
      </div> */}
    </div>
  );
};
export default Categories;
