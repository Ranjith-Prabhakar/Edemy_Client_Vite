import { useLocation } from "react-router-dom";
import VideoPlayer from "./videoPlayer";
import { useEffect, useState } from "react";
import { useGetVideoMutation } from "../../../../redux/features/course/courseApi";

const CoursePreview = () => {
  const [videoUrl, setVideoUrl] = useState("");
  const [getVideo, { data }] = useGetVideoMutation();
  const location = useLocation();
  const courseData = location.state.courseData;

  useEffect(() => {
    if (data) {
      console.log("data from course preview",data)
      const url = data.data;
      setVideoUrl(url as string);
    }
  }, [data]);


  return (
    <>
      {courseData ? (
        <div className="flex gap-2 justify-between items-start dark:bg-black h-screen dark:text-white">
          <ul className="dark:bg-gray-950 p-5 mt-5 ml-3 rounded-md ">
            <li>{courseData.category}</li>
            <li>{courseData.courseName}</li>
            <li>{courseData.discription}</li>
            <li>{courseData.duration}</li>
            <li>{courseData.instructor}</li>
          </ul>
          <div className="dark:bg-gray-950 p-5 mt-5 ml-3 rounded-md flex-1">
            <VideoPlayer videoUrl={videoUrl} />
          </div>
          <div className="dark:bg-gray-950 p-5 mt-5 ml-3 rounded-md">
            {courseData.modules.map((item) => (
              <div className="flex flex-col">
                <div className="flex gap-2">
                  <h1>{item.moduleNo}</h1>
                  <h1>{`${item.moduleTittle}(${item.videos.length})`}</h1>
                  <h1>dropdown</h1>
                </div>
                {item.videos.map((videos) => (
                  <div className="flex gap-2">
                    <h1>{videos.videoNo}</h1>
                    <h1>{videos.videoTittle}</h1>
                    <h1
                      className="cursor-pointer"
                      onClick={() => {
                        getVideo({ videoName: videos.videoTittle });
                      }}
                    >
                      play
                    </h1>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div>hello</div>
      )}
    </>
  );
};

export default CoursePreview;
