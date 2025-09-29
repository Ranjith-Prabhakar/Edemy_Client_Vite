import { useMobileSearch, useSearch } from "./hook";
import { ICategory } from "../../../redux/interfaces/Course/getCategories";

type Props = {
  categoryList: ICategory[];
};
const Search = ({ categoryList }: Props) => {
  const { searchValue, setSearchValue, handleSearch } = useSearch(categoryList);
  return (
    <div className="hidden 800px:block 1200px:flex-2">
      <input
        className={`rounded-full w-96 h-[35px] px-7 outline-none font-semibold focus:ring-c_color-colorTwo focus:border-c_color-colorTwo  bg-slate-50/40 placeholder:text-black text-black`}
        type="search"
        placeholder="search...."
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleSearch(searchValue);
        }}
      />
    </div>
  );
};

export default Search;

//mobile search

const MobileSearch = () => {
  const { searchValue, setSearchValue, handleSearch } = useMobileSearch();

  return (
    <div className=" 800px:hidden 1200px:flex-2">
      <input
        className={`rounded-full w-full mb-2 h-[35px] px-7 outline-none font-semibold focus:ring-c_color-colorTwo focus:border-c_color-colorTwo  bg-slate-50/40 placeholder:text-black text-black`}
        type="search"
        placeholder="search...."
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleSearch(searchValue);
        }}
      />
    </div>
  );
};

export { MobileSearch };
