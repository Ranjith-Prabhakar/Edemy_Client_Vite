import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetCategoryQuery } from "../../../redux/features/course/courseApi";
import { ICategory } from "../../../redux/interfaces/Course/getCategories";

export function useCourses() {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  const { data, isSuccess } = useGetCategoryQuery();
  const [categoryList, addCategoryList] = useState<ICategory[]>([]);

  useEffect(() => {
    if (isSuccess) {
      addCategoryList(data.data as ICategory[]);
    }
  }, [isSuccess]);

  return { isHovered, setIsHovered, navigate, categoryList };
}

export function useMobileCourses() {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  const { data, isSuccess } = useGetCategoryQuery();
  const [categoryList, addCategoryList] = useState<ICategory[]>([]);
  useEffect(() => {
    if (isSuccess) {
      addCategoryList(data.data as ICategory[]);
    }
  }, [isSuccess]);

  return { isHovered, setIsHovered, navigate, categoryList };
}
