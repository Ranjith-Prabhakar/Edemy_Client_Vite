import { useEffect, useState } from "react";
import AddCourseData from "./AddCourseData";
import AddModuleVideos from "./AddModuleVideos";
import AddedModuleVideos from "./AddedModuleVideos";
import Tabs from "./Tabs";
import { useGetCourseInProgressQuery } from "../../../redux/features/course/courseApi";

const Courses = () => {
  const { data, isSuccess } = useGetCourseInProgressQuery();
  const [visible, setVisible] = useState(true);
  const [stepper, setStepper] = useState(1);
  console.log("data==55555=>", data?.data);

  const [courseData, setCourseData] = useState({
    courseName: "",
    discription: "",
    tags: "",
    thumbnail: "",
    duration: "",
    moduleNo: "",
    moduleTittle: "",
    videoNo: "",
    videoTittle: "",
  });

  useEffect(() => {
    console.log("useEffect triggered");
    if (isSuccess) {
      console.log("Setting course data:", data.data);
      const moduleData = data.data.modules[data.data.modules.length - 1];
      const moduleVideoData = moduleData.videos[moduleData.videos.length - 1];
      console.log("moduleData======>", moduleData);
      setCourseData({
        courseName: data.data.courseName ?? "",
        discription: data.data.discription ?? "",
        tags: data.data.tags ?? "",
        thumbnail: data.data.thumbnail ?? "",
        duration: data.data.duration ?? "",
        moduleNo: moduleData.moduleNo ?? "",
        moduleTittle: moduleData.moduleTittle ?? "",
        videoNo: moduleVideoData.videoNo ?? "",
        videoTittle: moduleVideoData.videoTittle ?? "",
      });
    }
  }, [data]);

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
            courseData={courseData}
            setCourseData={setCourseData}
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
