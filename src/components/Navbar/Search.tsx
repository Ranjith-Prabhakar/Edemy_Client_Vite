import { useEffect, useState } from "react";
import { catchError } from "../../utils/catchError";
import { ICategory } from "../../redux/interfaces/Course/getCategories";
import { useNavigate } from "react-router-dom";
import { useGetCategoryQuery } from "../../redux/features/course/courseApi";
import useGetScrollPosition from "../../hooks/useGetScrollPosition";

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

//mobile search

const MobileSearch = () => {
  const [categoryList, addCategoryList] = useState<ICategory[]>([]);
  const { data, isSuccess } = useGetCategoryQuery();
  const isScrolled = useGetScrollPosition();
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess) {
      addCategoryList(data.data as ICategory[]);
    }
  }, [isSuccess]);

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
    <div className=" 400px:block 1200px:flex-2">
      <input
        className={`rounded-full w-full mb-2 h-[35px] px-7 outline-none font-semibold ${
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

export { MobileSearch };
