import { TbCategoryPlus } from "react-icons/tb";
import { useEffect, useState } from "react";
import AddCategory from "./AddCategoryForm";
import { useFetchCategoriesQuery } from "../../../redux/features/admin/Categories/categoryApi";
import Table from "./Table";
import SearchButton from "../../../components/Buttons/SearchButton";
import DashBordSearch from "../../../components/inputFields/DashBordSearch";

const Categories = () => {
  const [addCategory, setAddCategory] = useState(false);
  const { data } = useFetchCategoriesQuery([]);

  useEffect(() => {
    console.log("data from categories", data);
  }, [data]);

  return (
    <div className="h-full w-full">
      <div className="flex items-center justify-between mb-1">
        <button
          className="dark:bg-c_color-colorSeven  px-3 rounded-sm h-[30px] flex items-center gap-1 font-bold"
          onClick={() => {
            setAddCategory(!addCategory);
          }}
        >
          Add new <TbCategoryPlus />
        </button>
        <h2 className="font-bold tracking-[2px] text-[25px]">Categories</h2>
        <div className="flex gap-2">
          <DashBordSearch />
          <SearchButton />
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
