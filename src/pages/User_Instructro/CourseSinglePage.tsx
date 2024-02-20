import { useLocation } from "react-router-dom";

const CourseSinglePage = () => {
  const courseData = useLocation().state.courseData
  console.log("courseData", courseData);
  return <div>hello</div>;
};

export default CourseSinglePage;
