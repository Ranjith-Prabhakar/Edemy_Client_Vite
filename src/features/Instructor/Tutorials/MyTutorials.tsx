import { useEffect, useState } from "react";
import useGetScrollPosition from "../../../hooks/useGetScrollPosition";
import useGetUser from "../../../hooks/useGetUser";


const MyTutorials = () => {
  const isScrolled = useGetScrollPosition();
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isSuccess) {
      console.log("data", data);
      setMyLearning(data?.data as ICourse[]);
      setPagination(pagination + 1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);

  useEffect(() => {
    console.log("myLearning", myLearning);
    console.log("pagination", pagination);
  }, [myLearning, pagination]);

  return (
    <div className="min-h-screen">
      <ContainerLayout>
        <Header isScrolled={isScrolled} />
        <div className="w-full mt-16">
          <div className="flex justify-start gap-3  w-full overflow-x-scroll">
            {myLearning &&
              myLearning.map((item) => <CourseCard courseCategory={item} />)}
          </div>
        </div>
      </ContainerLayout>
    </div>
  );
}

export default MyTutorials