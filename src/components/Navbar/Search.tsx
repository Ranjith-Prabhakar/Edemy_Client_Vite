import { useState } from "react";
import { catchError } from "../../utils/catchError";
import { ICategory } from "../../redux/interfaces/Course/getCategories";
import { useNavigate } from "react-router-dom";

type Props = {
  isScrolled?: boolean;
  categoryList: ICategory[];
};
const Search = ({ isScrolled, categoryList }: Props) => {
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();
  const handleSearch = async (key: string) => {
    try {
      if (
        categoryList.length &&
        categoryList.some(
          (category: ICategory) =>
            category.name.toLowerCase() === key.toLowerCase()
        )
      ) {
        navigate(`/category/${key.toLocaleLowerCase().replace(/\s/g, "_")}`, {
          state: { sort: "A-Z", filter: "date" },
        });
      } else {
        navigate("/search_course", {
          state: {
            queryData: {
              key,
              sort: "A-Z",
              filter: "date",
            },
          },
        });
      }
    } catch (error) {
      catchError(error);
    }
  };

  return (
    <div className="hidden 400px:block 1200px:flex-2">
      <input
        className={`rounded-full w-96 h-[35px] px-7 outline-none font-semibold ${
          isScrolled
            ? "dark:bg-slate-50 placeholder:text-black dark:text-black"
            : "dark:bg-slate-400 focus:border-1 focus:border-white placeholder:text-black dark:text-black"
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
