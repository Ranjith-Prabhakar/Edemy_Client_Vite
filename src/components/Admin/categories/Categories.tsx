import { TbCategoryPlus } from "react-icons/tb";
import { useEffect, useState } from "react";
import AddCategory from "./AddCategoryForm";
import { useFetchCategoriesQuery } from "../../../redux/features/admin/Categories/categoryApi";
import Table from "./Tables/Table";
type Props = {};

const Categories = (props: Props) => {
  const [addCategory, setAddCategory] = useState(false);
  const { data } = useFetchCategoriesQuery([]);

  useEffect(() => {
    console.log("data from categories", data);
  }, [data]);

  return (
    <div className="h-full w-full">
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
        <div className="flex gap-2">
          <input type="text" className="bg-gray-800 rounded-md h-[30px]" />
          <button className=" px-3 rounded-sm h-[30px] font-bold dark:bg-gray-700 dark:text-gray-400">
            Search
          </button>
        </div>
      </div>
      {addCategory && (
        <AddCategory
          setAddCategory={setAddCategory}
          addCategory={addCategory}
        />
      )}
      <Table />
    </div>
  );
};
export default Categories;
