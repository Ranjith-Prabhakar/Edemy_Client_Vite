import { useNavigate } from "react-router-dom";
import { ICategory } from "../../../redux/interfaces/Course/getCategories";
import { useEffect, useState } from "react";
import { catchError } from "../../../utils/catchError";
import { useGetCategoryQuery } from "../../../redux/features/course/courseApi";

export function useSearch(categoryList: ICategory[]) {
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

  return { searchValue, setSearchValue, handleSearch };
}

export function useMobileSearch() {
  const [categoryList, addCategoryList] = useState<ICategory[]>([]);
  const { data, isSuccess } = useGetCategoryQuery();
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

  return { searchValue, setSearchValue, handleSearch };
}
