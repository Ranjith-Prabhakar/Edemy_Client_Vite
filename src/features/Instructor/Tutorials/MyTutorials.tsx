import { useEffect, useState } from "react";
import useGetUser from "../../../hooks/useGetUser";
import CourseCard from "../../../components/Card/CourseCard";
import { ICourse } from "../../../redux/interfaces/Course/generalInterface";
import { useGetInstructorTutorialMutation } from "../../../redux/features/course/courseApi";

const MyTutorials = () => {
  const user = useGetUser();
  console.log("user.enrolledCourses", user.enrolledCourses);
  const [getInstructorTutorial, { data, isSuccess }] =
    useGetInstructorTutorialMutation();
  const [pagination, setPagination] = useState(1);
  const [myTutorials, setMyTutorials] = useState<ICourse[]>([] as ICourse[]);

  useEffect(() => {
    const end = pagination * 10;
    const start = end - 10;
    const courses = user.courses?.slice(start, end);
    if (courses) {
      getInstructorTutorial({ courses: courses });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isSuccess) {
      console.log("data", data);
      setMyTutorials(data?.data as ICourse[]);
      setPagination(pagination + 1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);

  useEffect(() => {
    console.log("myLearning", myTutorials);
    console.log("pagination", pagination);
  }, [myTutorials, pagination]);

  return (
    <div className="min-h-screen">
      <div className="w-full mt-16">
        <div className="flex justify-start gap-3  w-full overflow-x-scroll">
          {myTutorials &&
            myTutorials.map((item) => <CourseCard courseCategory={item} />)}
        </div>
      </div>
    </div>
  );
};

export default MyTutorials;
