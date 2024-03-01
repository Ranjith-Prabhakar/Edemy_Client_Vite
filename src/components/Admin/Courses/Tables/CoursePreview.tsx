import { useLocation, useNavigate } from "react-router-dom";
import VideoPlayer from "./videoPlayer";
import { useEffect, useState } from "react";
import { useGetVideoMutation } from "../../../../redux/features/course/courseApi";
import { IoIosArrowDropdown } from "react-icons/io";
import { useApproveOrRejectCourseMutation } from "../../../../redux/features/course/courseApi";

const CoursePreview = () => {
  const [showModuleVideos, setShowModuleVideos] = useState(0);
  const navigate = useNavigate();
  const [videoUrl, setVideoUrl] = useState("");
  const [getVideo, { data }] = useGetVideoMutation();
  const [approveOrRejectCourse, { data: ApproveOrRejectData, isSuccess }] =
    useApproveOrRejectCourseMutation();
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

  useEffect(() => {
    if (ApproveOrRejectData?.status === 200) navigate(-2);
  }, [isSuccess]);

  return (
    <>
      {courseData ? (
        <div className="flex h-[70vh]">
          <div className="dark:bg-c_color-colorSeven p-5 mt-5 ml-3 rounded-md w-[58%] overflow-scroll h-full">
            <VideoPlayer videoUrl={videoUrl} />

            <div className="flex ">
              <ul className=" p-5 mt-5 ml-3 rounded-md w-full">
                <li>{courseData.category}</li> {/* ///////////*/}
                <li>Course Name : {courseData.courseName}</li>
                <li>Description : {courseData.discription}</li>
                <li>Duration : {courseData.duration}</li>
                <li>Instructor : {courseData.instructor}</li>
              </ul>

              <div className="flex flex-col gap-2 p-5">
                <button
                  className=" px-3 hover:scale-105 h-[30px] font-bold dark:bg-cyan-600 dark:text-white rounded-full"
                  onClick={() => {
                    approveOrRejectCourse({
                      courseId: courseData._id,
                      action: "approved",
                    });
                  }}
                >
                  Approve
                </button>
                <button
                  className=" px-3 hover:scale-105 h-[30px] font-bold dark:bg-red-700 dark:text-white rounded-full"
                  onClick={() => {
                    approveOrRejectCourse({
                      courseId: courseData._id,
                      action: "rejected",
                    });
                  }}
                >
                  Reject
                </button>
              </div>
            </div>
          </div>

          <div className="dark:bg-c_color-colorSeven capitalize p-5 mt-5 ml-3 rounded-md w-[42%] overflow-scroll h-full">
            {courseData.modules.map((item, index) => (
              <div className="flex flex-col ">
                <div
                  className="flex gap-2 rounded-lg justify-between items-center cursor-pointer border border-white  p-2 text-white"
                  onClick={() => {
                    if (showModuleVideos === index + 1) setShowModuleVideos(0);
                    else setShowModuleVideos(index + 1);
                  }}
                >
                  <h1>{item.moduleNo}</h1>
                  <h1>{`${item.moduleTittle}(${item.videos.length})`}</h1>
                  <div>
                    <IoIosArrowDropdown size={25} />
                  </div>
                </div>
                {Array.isArray(item.videos) &&
                  item.videos.map((video, videoIndex) => (
                    <>
                      {showModuleVideos === index + 1 && (
                        <div
                          key={videoIndex}
                          className="flex capitalize gap-2 justify-between m-1 px-2 py-1 dark:bg-c_color-colorSix cursor-pointer hover:scale-105"
                        >
                          <h1> {video.videoNo}</h1>
                          <h1>
                            {video.videoTittle.match(regex)?.[1] || "No Match"}{" "}
                          </h1>
                          <button
                            className=" px-5 rounded-full h-[25px] font-bold dark:bg-cyan-500 "
                            onClick={() => {
                              getVideo({ videoName: video.videoTittle });
                            }}
                          >
                            {" "}
                            Play
                          </button>
                        </div>
                      )}
                    </>
                  ))}
                {/* {item.videos.map((videos) => (
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
                ))} */}
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
