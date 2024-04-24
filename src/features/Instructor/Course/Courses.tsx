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
  const [submit, setSubmit] = useState(false);
  const [moduleVideos, setModuleVideos] = useState<
    Record<string, string | Record<string, string>[]>[]
  >([]);

  const [courseData, setCourseData] = useState({
    courseName: "",
    price: "",
    discription: "",
    tags: "",
    thumbnail: "",
    duration: "",
    moduleNo: "",
    moduleTittle: "",
    videoTittle: "",
    videoNo: "",
    videoUrl: "",
  });

  useEffect(() => {
    if (isSuccess) {
      if(data){
        const regex = /\/(.*?)-/;
        const moduleData = data.data.modules[data.data.modules.length - 1];
        const moduleVideoData =
          moduleData?.videos[moduleData.videos.length - 1];
        setCourseData({
          courseName: data.data.courseName ?? "",
          price: data.data.price ?? "",
          discription: data.data.discription ?? "",
          tags: data.data.tags ?? "",
          thumbnail: data.data.thumbnail ?? "",
          duration: data.data.duration ?? "",
          moduleNo: moduleData?.moduleNo ?? "",
          moduleTittle: moduleData?.moduleTittle ?? "",
          videoTittle: moduleVideoData?.videoTittle?.match(regex)?.[1] ?? "",
          videoNo: moduleVideoData?.videoNo ?? "",
          videoUrl: moduleVideoData?.videoUrl ?? "",
        });
        setModuleVideos(data.data.modules);
      }
    }
  }, [data, isSuccess]);

  const [moduleList, setModuleList] = useState<
    Array<{ [key: string]: string | number }>
  >([]);
  return (
    <div className="flex custom-scrollBar ">
      <div className="flex-1 ">
        <div className="flex flex-col dark:bg-c_color-colorSix ">
          <div className="sticky top-0 z-10  dark:bg-c_color-colorOne">
            {" "}
            <Tabs
              setStepper={setStepper}
              stepper={stepper}
              setModuleVideos={setModuleVideos}
              setSubmit={setSubmit}
            />
          </div>
          {stepper === 1 && (
            <AddCourseData
              setStepper={setStepper}
              courseData={courseData}
              setCourseData={setCourseData}
              visible={visible}
              setVisible={setVisible}
              submit={submit}
            />
          )}
          {stepper === 2 && (
            <AddModuleVideos
              moduleList={moduleList}
              setModuleList={setModuleList}
              courseData={courseData}
              setCourseData={setCourseData}
              setModuleVideos={setModuleVideos}
            />
          )}
        </div>
      </div>

      <div className="flex-1 relative">
        <div className="p-5 absolute top-10 left-2 w-full">
          <AddedModuleVideos moduleVideos={moduleVideos} />
        </div>
      </div>
    </div>
  );
};

export default Courses;

