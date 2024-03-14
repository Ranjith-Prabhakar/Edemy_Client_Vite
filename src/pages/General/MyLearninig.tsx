import { useEffect, useState } from "react";
import useGetUser from "../../hooks/useGetUser";
import ContainerLayout from "../../layouts/containerLayout";
import { useGetUserEnrolledCoursesMutation } from "../../redux/features/course/courseApi";
import { ICourse } from "../../redux/interfaces/Course/generalInterface";
import Header from "../../layouts/Header";
import CourseCard from "../../components/Card/CourseCard";

const MyLearninig = () => {
  const user = useGetUser();
  console.log("user.enrolledCourses", user.enrolledCourses);
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
  }, []);

  useEffect(() => {
    if (isSuccess) {
      console.log("data", data);
      setMyLearning(data?.data as ICourse[]);
      setPagination(pagination + 1);
    }
  }, [isSuccess]);

  useEffect(() => {
    console.log("myLearning", myLearning);
    console.log("pagination", pagination);
  }, [myLearning, pagination]);

  return (
    <div className="min-h-screen">
      <ContainerLayout>
        <Header />
        <div className="w-full mt-16">
          <div className="flex justify-start gap-3  w-full overflow-x-scroll">
            {myLearning &&
              myLearning.map((item) => <CourseCard courseCategory={item} />)}
          </div>
        </div>
      </ContainerLayout>
    </div>
  );
};

export default MyLearninig;
