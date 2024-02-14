import { useEffect, useState } from "react";
import AddCourseData from "./AddCourseData";
import AddModuleVideos from "./AddModuleVideos";
import AddedModuleVideos from "./AddedModuleVideos";
import Tabs from "./Tabs";

type Props = {};

const Courses = (props: Props) => {
  const [stepper, setStepper] = useState(1);
  const [courseData, setCourseData] = useState({
    courseName: "",
    discription: "",
    tags: "",
    thumbnail: "",
    duration: "",
  });

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
