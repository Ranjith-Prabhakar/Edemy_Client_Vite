import { useLocation } from "react-router-dom";
import VideoPlayer from "../../components/VideoPlayer/videoPlayer";
import { useEffect, useState } from "react";
import { useGetVideoMutation } from "../../redux/features/course/courseApi";
import { IoIosArrowDropdown } from "react-icons/io";

const CourseSinglePage = () => {
  const [videoUrl, setVideoUrl] = useState("");
  const [getVideo, { data }] = useGetVideoMutation();

  const location = useLocation();
  const courseData = location.state.courseData;
  const regex = /\/(.*?)-/;
  useEffect(() => {
    if (data) {
      console.log("data from course preview", data);
      const url = data.data;
      setVideoUrl(url as string);
    }
  }, [data]);

  return (
    <>
      {courseData ? (
        <div className="flex gap-2 justify-between items-start dark:bg-black h-screen dark:text-white ">
          <div className="dark:bg-gray-950 p-5 mt-5 ml-3 rounded-md w-[58%]">
            <VideoPlayer videoUrl={videoUrl} />

            <div className="flex">
              <ul className="dark:bg-gray-950 p-5 mt-5 ml-3 rounded-md w-full">
                <li>{courseData.category}</li> {/* ///////////*/}
                <li>Course Name : {courseData.courseName}</li>
                <li>Description : {courseData.discription}</li>
                <li>Duration : {courseData.duration}</li>
                <li>Instructor : {courseData.instructor}</li>
              </ul>
            </div>
          </div>

          <div className="dark:bg-gray-950 p-5 mt-5 ml-3 rounded-md w-[42%]">
            {courseData.modules.map((item) => (
              <div className="flex flex-col">
                <div className="flex gap-2 justify-between items-center cursor-pointer border border-white rounded-sm p-2 text-white">
                  <h1>{item.moduleNo}</h1>
                  <h1>{`${item.moduleTittle}(${item.videos.length})`}</h1>
                  <div>
                    <IoIosArrowDropdown size={25} />
                  </div>
                </div>
                {Array.isArray(item.videos) &&
                  item.videos.map((video, videoIndex) => (
                    <div
                      key={videoIndex}
                      className="flex gap-2 justify-between mb-2 p-2"
                    >
                      {video.videoNo} -{" "}
                      {video.videoTittle.match(regex)?.[1] || "No Match"}
                      <button
                        className=" px-3 rounded-sm h-[30px] font-bold dark:bg-gray-700 dark:text-gray-400"
                        onClick={() => {
                          getVideo({ videoName: video.videoTittle });
                        }}
                      >
                        {" "}
                        Play
                      </button>
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

export default CourseSinglePage;
