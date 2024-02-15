import { useEffect, useState } from "react";
import AddCourseData from "./AddCourseData";
import AddModuleVideos from "./AddModuleVideos";
import AddedModuleVideos from "./AddedModuleVideos";
import Tabs from "./Tabs";
import { useGetCourseInProgressQuery } from "../../../redux/features/course/courseApi";

type Props = {};

const Courses = (props: Props) => {
  const { data,isSuccess } = useGetCourseInProgressQuery();
  const [visible, setVisible] = useState(true);
  const [stepper, setStepper] = useState(1);
  console.log("data", data?.data);

  const [courseData, setCourseData] = useState({
    courseName: "",
    discription: "",
    tags: "",
    thumbnail: "",
    duration: "",
  });

useEffect(() => {
  console.log("useEffect triggered");
  if (isSuccess) {
    console.log("Setting course data:", data.data);
    setCourseData({
      courseName: data.data.courseName ?? "",
      discription: data.data.discription ?? "",
      tags: data.data.tags ?? "",
      thumbnail: data.data.thumbnail ?? "",
      duration: data.data.duration ?? "",
    });
  }
}, [isSuccess]);



  const [moduleList, setModuleList] = useState<
    Array<{ [key: string]: string | number }>
  >([]);

  useEffect(() => {
    // if refresh meanwhile adding course but uploaded several modules to bucket
    let courses = localStorage.getItem("moduleVideos");
    if (courses) {
      let parsedCourse = JSON.parse(courses);
      if (parsedCourse) {
        let courseList = parsedCourse.map((item: string, index: number) => {
          console.log("item", item.split("-").shift());
          return {
            moduleNo: ++index,
            moduleName: item.split("-").shift(),
          };
        });
        setModuleList(courseList);
      }
    }
  }, []);

  return (
    <div className="flex ">
      <div className="flex-1">
        {stepper === 1 && (
          <AddCourseData
            setStepper={setStepper}
            courseData={courseData}
            setCourseData={setCourseData}
            visible={visible}
            setVisible={setVisible}
          />
        )}
        {stepper === 2 && (
          <AddModuleVideos
            moduleList={moduleList}
            setModuleList={setModuleList}
          />
        )}
      </div>
      <div className="flex-1">
        <div className="flex-col">
          <Tabs setStepper={setStepper} />
          <AddedModuleVideos moduleList={moduleList} />
        </div>
      </div>
    </div>
  );
};

export default Courses;
