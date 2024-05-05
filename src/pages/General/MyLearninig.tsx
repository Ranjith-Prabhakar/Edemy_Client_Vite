import { useEffect, useState } from "react";
import useGetUser from "../../hooks/useGetUser";
import ContainerLayout from "../../layouts/ContainerLayout";
import { useGetUserEnrolledCoursesMutation } from "../../redux/features/course/courseApi";
import { ICourse } from "../../redux/interfaces/Course/generalInterface";
import CourseCard from "../../components/Card/CourseCard";

const MyLearninig = () => {
  const user = useGetUser();
  const [getUserEnrolledCourses, { data, isSuccess }] =
    useGetUserEnrolledCoursesMutation();
  const [pagination, setPagination] = useState(1);
  const [myLearning, setMyLearning] = useState<ICourse[]>([] as ICourse[]);

  useEffect(() => {
    const end = pagination * 10;
    const start = end - 10;
    const courses = user.enrolledCourses?.slice(start, end);
    if (courses) {
      getUserEnrolledCourses({ courses: courses });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isSuccess) {
      setMyLearning(data?.data as ICourse[]);
      setPagination(pagination + 1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);

  return (
    <div className="min-h-screen">
      <ContainerLayout>
        <div className="w-full mt-16">
          <div
            className={`ms-8 400px:ms-0 400px:grid ${
              user.role === "user" ? "grid-cols-4" : "grid-cols-3"
            } gap-1 space-y-3 w-full overflow-x-scroll `}
          >
            {myLearning &&
              myLearning.map((item) => <CourseCard courseCategory={item} />)}
          </div>
        </div>
      </ContainerLayout>
    </div>
  );
};

export default MyLearninig;
