import { useEffect, useState } from "react";
import useGetUser from "../../hooks/useGetUser";
import useInitialNotificationLoader from "../../hooks/useInitialNotificationLoader";
import { useGetCategoryQuery } from "../../redux/features/course/courseApi";
import { ICategory } from "../../redux/interfaces/Course/getCategories";

export function useHeaderHook() {
  const userData = useGetUser();
  useInitialNotificationLoader();
  const { data, isSuccess } = useGetCategoryQuery();
  const [categoryList, addCategoryList] = useState<ICategory[]>([]);

  useEffect(() => {
    if (isSuccess) {
      addCategoryList(data.data as ICategory[]);
    }
  }, [isSuccess]);

  return { userData, categoryList };
}
