import { useEffect, useState } from "react";
import { useGetCourseByCategoryMutation } from "../redux/features/course/courseApi";
import { ICourse } from "../redux/interfaces/Course/generalInterface";

export default function useCategoryInfinitScrolling(
  category: string,
  pageNumber: number,
  frequency: number
) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [courseCategoryList, setCourseCategoryList] = useState<ICourse[]>(
    [] as ICourse[]
  );
  const [getCourseByCategory, { data, isSuccess, isError }] =
    useGetCourseByCategoryMutation();
  useEffect(() => {
    setLoading(true);
    setError(false);
    getCourseByCategory({
      category,
      pageNumber,
      frequency,
    });
  }, [category, pageNumber, frequency]);

  useEffect(() => {
    if (isSuccess) {
      console.log("data from useCategoryInfinitScrolling", data);
      if (data) {
        if ("data" in data) {
          setCourseCategoryList(data.data as ICourse[]);
        }
        if ("hasMore" in data) {
          setHasMore(data.hasMore);
        }
      }
    }
  }, [isSuccess, isError]);

  return { loading, error, hasMore, courseCategoryList };
}

// import { useEffect, useState } from "react";
// import { useGetCourseByCategoryMutation } from "../redux/features/course/courseApi";
// import { ICourse } from "../redux/interfaces/Course/generalInterface";

// export default function useCategoryInfinitScrolling(
//   category: string,
//   pageNumber: number,
//   frequency: number
// ) {
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(false);
//   const [hasMore, setHasMore] = useState(false);
//   const [courseCategoryList, setCourseCategoryList] = useState<ICourse[]>(
//     [] as ICourse[]
//   );
//   const [getCourseByCategory, { data, isSuccess, isError }] =
//     useGetCourseByCategoryMutation();

//   useEffect(() => {
//     setLoading(true);
//     setError(false);
//     getCourseByCategory({
//       category,
//       pageNumber,
//       frequency,
//     });
//   }, [category, pageNumber, frequency]);

//   useEffect(() => {
//     if(isSuccess){
//       console.log("data from useCategoryInfinitScrolling", data);
//       setCourseCategoryList(data?.data);
//       setHasMore(data.hasMore);
//     }
//   }, [isSuccess,isError]);

//   return { loading, error, hasMore, courseCategoryList };
// }
