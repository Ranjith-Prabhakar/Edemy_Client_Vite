import { useNavigate } from "react-router-dom";
import { useGetCoursesForUserQuery } from "../../../redux/features/course/courseApi";
import { useEffect, useState } from "react";
import { ICourse } from "../../../redux/interfaces/Course/generalInterface";

export function useOurBestCourse() {
  const navigate = useNavigate();
  const { data, isSuccess } = useGetCoursesForUserQuery();
  const [courseCategory, setCourseCategory] = useState<ICourse[]>([]);

  useEffect(() => {
    if (isSuccess) {
      const coursesData = data.data as ICourse[];

      setCourseCategory(coursesData);
    }
  }, [data, isSuccess]);

  return { navigate, courseCategory };
}
