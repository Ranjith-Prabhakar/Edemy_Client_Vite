import { Data } from "./Data";
import { TbCategoryPlus } from "react-icons/tb";
import { IoCaretBack } from "react-icons/io5";
import { IoCaretForwardOutline } from "react-icons/io5";
import { FaBackward } from "react-icons/fa";
import { FaForward } from "react-icons/fa";

const Table = () => {
  return (
    <>
      <div className="flex items-center justify-between">
        <button className="dark:bg-c_color-colorSeven dark:text-white  px-3 rounded-sm h-[30px] flex items-center gap-1 font-bold">
          Add new <TbCategoryPlus className="" />
        </button>
        <h2 className="font-bold tracking-[2px] text-[25px]  dark:text-white">
          Courses
        </h2>
        <div className="flex gap-2">
          <input
            type="text"
            className="bg-slate-50 dark:bg-opacity-20 dark:text-white rounded-md h-[30px]"
          />
          <button className=" px-3 rounded-sm h-[30px] font-bold dark:bg-c_color-colorSeven dark:text-white">
            Search
          </button>
        </div>
      </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs uppercase dark:bg-c_color-colorSeven dark:text-white">
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
                Revenue share
              </th>
            </tr>
          </thead>
          <tbody>
            {Data.map((item, index) => (
              <tr
                className={`${
                  Data.length !== index + 1 && "border-b-2"
                } hover:text-[20px] hover:opacity-90 cursor-pointer font-bold dark:bg-gradient-to-r from-body-gradient-one to-body-gradient-two  dark:text-white `}
                key={index}
              >
                <td className={`px-6 py-4 `}>{index + 1}</td>
                <td className={`px-6 py-4 `}>{item.Id}</td>
                <td className={`px-6 py-4 `}>{item.Name}</td>
                <td className={`px-6 py-4 `}>{item.No_Of_Courses}</td>
                <td className={`px-6 py-4 `}>{item.No_Of_Courses}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className=" dark:bg-c_color-colorSeven dark:text-white p-3 flex justify-end gap-1">
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
    </>
  );
};
export default Table;
