import { useMobileSearch, useSearch } from "./hook";
import { ICategory } from "../../../redux/interfaces/Course/getCategories";

type Props = {
  isScrolled?: boolean;
  categoryList: ICategory[];
};
const Search = ({ isScrolled, categoryList }: Props) => {
  const { searchValue, setSearchValue, handleSearch } = useSearch(categoryList);
  return (
    <div className="hidden 800px:block 1200px:flex-2">
      <input
        className={`rounded-full w-96 h-[35px] px-7 outline-none font-semibold ${
          isScrolled
            ? "bg-slate-50 placeholder:text-black text-black"
            : "bg-slate-400 focus:border-1 focus:border-white placeholder:text-black text-black"
        }  focus:border-1 focus:border-white `}
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
  const { isScrolled, searchValue, setSearchValue, handleSearch } =
    useMobileSearch();

  return (
    <div className=" 800px:hidden 1200px:flex-2">
      <input
        className={`rounded-full w-full mb-2 h-[35px] px-7 outline-none font-semibold ${
          isScrolled
            ? "bg-slate-50 placeholder:text-black text-black"
            : "bg-slate-400 focus:border-1 focus:border-white placeholder:text-black text-black"
        }  focus:border-1 focus:border-white `}
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
