import { useLocation, useNavigate } from "react-router-dom";
import VideoPlayer from "../../components/VideoPlayer/videoPlayer";
import { useEffect, useState } from "react";
import { IoIosArrowDropdown } from "react-icons/io";
import Header from "../../layouts/Header";
import ContainerLayout from "../../layouts/ContainerLayout";
import About from "../../features/Video/About";
import ReviewAndRating from "../../features/Video/ReviewAndRating";
import {
  useEnrollCourseMutation,
  useGetVideoForUserMutation,
  useGetVideoForVisitorsMutation,
} from "../../redux/features/course/courseApi";
import toast from "react-hot-toast";
import useGetUser from "../../hooks/useGetUser";
import useGetScrollPosition from "../../hooks/useGetScrollPosition";
import Chat from "../../features/Video/Chat";

export type ICourseData = {
  _id: string;
  instructor: string;
  instructorName: string;
  price: string;
  category: string;
  courseName: string;
  discription: string;
  tags: string;
  thumbnail: string;
  duration: string;
  modules: [
    {
      _id: string;
      moduleNo: string;
      moduleTittle: string;
      videos: [
        {
          _id: string;
          videoTittle: string;
          videoNo: string;
          videoUrl: string;
          preview: boolean;
        }
      ];
    }
  ];
};

const CourseSinglePage = () => {
  const isScrolled = useGetScrollPosition();
  const navigate = useNavigate();
  const user = useGetUser();

  const [showModuleVideos, setShowModuleVideos] = useState(0);
  const [getVideoForUser, { data, isSuccess, isError, error }] =
    useGetVideoForUserMutation();

  const [
    getVideoForVisitors,
    {
      data: visitorsData,
      isSuccess: visitorsIsSuccess,
      isError: visitorsIsError,
      error: visitorsError,
    },
  ] = useGetVideoForVisitorsMutation();

  const [
    enrollCourse,
    {
      isSuccess: enrollIsSuccess,
      data: enrollData,
      isError: enrollIsError,
      error: enrollError,
    },
  ] = useEnrollCourseMutation();
  const location = useLocation();
  const courseData: ICourseData = location.state.courseData;
  const [videoUrl, setVideoUrl] = useState(
    courseData.modules[0].videos[0].videoTittle
  );

  const [moduleNo, setModuleNo] = useState("");
  const [moduleTittle, setModuleTittle] = useState("");
  const [videoNo, setVideoNo] = useState("");
  const [videoTittle, setVideoTittle] = useState("");
  const [isPurchased, setIsPurchased] = useState(false);
  const [swapper, setSwapper] = useState("about");
  const [position, setPosition] = useState("0");

  // to adjust scroll position
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


  useEffect(() => {
    if (user) {
      let purchased: boolean = false;
      if (user.role === "admin") {
        setIsPurchased(false);
        return;
      } else if (user.role === "instructor" && user.courses) {
        purchased = user.courses?.some(
          (course) => course === (courseData._id as string)
        );

        setIsPurchased(!purchased);
      } else if (user.role === "user" && user.enrolledCourses) {
        purchased = user.enrolledCourses?.some(
          (course) => course === (courseData._id as string)
        );
        setIsPurchased(!purchased);
        return;
      }

      if (user.role === "instructor" && user.enrolledCourses && !purchased) {
        purchased = user.enrolledCourses?.some(
          (course) => course === (courseData._id as string)
        );
        setIsPurchased(!purchased);
        return;
      }
    }
  }, [courseData, user]);

  const regex = /\/(.*?)-/;
  useEffect(() => {
    if (isSuccess) {
      if (data && "data" in data) {
        const url = data.data;
        setPosition(data.position || "0");
        setVideoUrl(url as string);
      }
    }
    if (isError) {
      if (error && "data" in error) {
        type TError = {
          status: number;
          data: { status: number; message: string; success: boolean };
        };
        const Error = error as TError;
        toast.error(Error.data.message);
      }
    }
  }, [data, isSuccess, isError, error]);

  useEffect(() => {
    if (visitorsIsSuccess) {
      if (visitorsData && "data" in visitorsData) {
        const url = visitorsData.data;
        setVideoUrl(url as string);
      }
    }
    if (visitorsIsError) {
      if (visitorsError && "data" in visitorsError) {
        type TError = {
          status: number;
          data: { status: number; message: string; success: boolean };
        };
        const Error = visitorsError as TError;
        toast.error(Error.data.message);
      }
    }
  }, [visitorsData, visitorsIsSuccess, visitorsIsError, visitorsError]);

  useEffect(() => {
    if (enrollIsSuccess) {
      window.location = enrollData?.data as unknown as Location;
    }
    if (enrollIsError) {
      toast.error("something went wrong please try again");
    }
  }, [enrollData, enrollError, enrollIsError, enrollIsSuccess]);

  return (
    <ContainerLayout>
      <Header isScrolled={isScrolled} />
      {courseData ? (
        <div className="mt-0 h-full  overflow-scroll">
          <div className="dark:bg-c_color-colorSeven 400px:p-5 400px:mt-5 rounded-md ">
            <VideoPlayer
              position={position}
              videoUrl={videoUrl}
              userId={user._id as string}
              courseId={courseData._id}
              moduleNo={moduleNo}
              moduleTittle={moduleTittle}
              videoNo={videoNo}
              videoTittle={videoTittle}
              width="100%"
              height="350px"
            />
            <div className="flex gap-2 justify-between mt-3 ">
              <div
                className={`${
                  swapper === "about"
                    ? "dark:bg-c_color-colorSix  border-b border-dashed"
                    : ""
                } flex-1 text-center p-2 rounded-t-md cursor-pointer font-bold`}
                onClick={() => {
                  setSwapper("about");
                }}
              >
                About
              </div>
              <div
                className={`${
                  swapper === "chapters"
                    ? "dark:bg-c_color-colorSix  border-b border-dashed"
                    : ""
                } flex-1 text-center p-2 rounded-t-md cursor-pointer font-bold`}
                onClick={() => {
                  setSwapper("chapters");
                }}
              >
                Chapters
              </div>
              <div
                className={`${
                  swapper === "review"
                    ? "dark:bg-c_color-colorSix  border-b border-dashed"
                    : ""
                } flex-1 text-center p-2 rounded-t-md cursor-pointer font-bold`}
                onClick={() => {
                  setSwapper("review");
                }}
              >
                Review
              </div>

              {!isPurchased && (
                <div
                  className={`${
                    swapper === "chat"
                      ? "dark:bg-c_color-colorSix  border-b border-dashed"
                      : ""
                  } flex-1 text-center p-2 rounded-t-md cursor-pointer font-bold`}
                  onClick={() => {
                    if (!isPurchased) {
                      setSwapper("chat");
                    } else {
                      toast.error(
                        "you have to purchase this course to get this feature"
                      );
                    }
                  }}
                >
                  Chat
                </div>
              )}
              {isPurchased && (
                <div
                  className={`dark:bg-cyan-400 mb-1 flex-1 text-center p-2 rounded-md cursor-pointer font-bold`}
                  onClick={() => {
                    enrollCourse([
                      {
                        courseId: courseData._id,
                        courseName: courseData.courseName,
                        price: courseData.price,
                        category: courseData.category,
                      },
                    ]);
                  }}
                >
                  <button>Enroll</button>
                </div>
              )}
              {!user.name && (
                <div
                  className={`dark:bg-cyan-400 mb-1 flex-1 text-center p-2 rounded-md cursor-pointer font-bold`}
                  onClick={() => {
                    toast.success("please Login first");
                    setTimeout(() => {
                      navigate("/auth/login");
                    }, 1000);
                  }}
                >
                  Enroll
                </div>
              )}
            </div>
            <div className="flex ">
              {swapper === "about" && (
                <About
                  courseName={courseData.courseName}
                  Description={courseData.discription}
                  Duration={courseData.duration}
                  Instructor={courseData.instructorName}
                />
              )}
              {swapper === "review" && (
                <ReviewAndRating courseData={courseData} />
              )}
              {swapper === "chapters" && (
                <div className="dark:bg-gradient-to-r from-body-gradient-one to-body-gradient-two capitalize p-2  rounded-md w-full  overflow-scroll h-full">
                  {courseData.modules.map((item, index) => (
                    <div className="flex flex-col" key={index}>
                      <div
                        className="flex gap-2  rounded-lg justify-between items-center cursor-pointer border border-white  p-2 text-white "
                        onClick={() => {
                          if (showModuleVideos === index + 1)
                            setShowModuleVideos(0);
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
                          <div className="mt-1">
                            {showModuleVideos === index + 1 && (
                              <div
                                key={videoIndex}
                                className={`flex 400px:w-[80%] 400px:mx-auto capitalize gap-2  justify-between p-3  dark:bg-c_color-colorSix cursor-pointer hover:scale-105`}
                              >
                                <h1> {video.videoNo}</h1>
                                <h1>
                                  {video.videoTittle
                                    .match(regex)?.[1]
                                    .split("/")
                                    .pop() || "No Match"}{" "}
                                </h1>
                                <button
                                  className=" px-5 rounded-full h-[25px] font-bold dark:bg-cyan-500 "
                                  onClick={() => {
                                    if (
                                      user &&
                                      (user.role === "admin" ||
                                        user.role === "instructor")
                                    ) {
                                      getVideoForUser({
                                        // for admin access didnt wrote any extra api but used the same for enrolled user
                                        courseId: courseData._id,
                                        moduleNo: item.moduleNo,
                                        videoNo: video.videoNo,
                                        videoName: video.videoTittle,
                                      });
                                      setModuleNo(item.moduleNo);
                                      setModuleTittle(item.moduleTittle);
                                      setVideoTittle(video.videoTittle);
                                      setVideoNo(video.videoNo);
                                    } else if (
                                      user &&
                                      user.enrolledCourses?.find(
                                        (course) =>
                                          course === (courseData._id as string)
                                      )
                                    ) {
                                      getVideoForUser({
                                        // for enrolled user
                                        courseId: courseData._id,
                                        moduleNo: item.moduleNo,
                                        videoNo: video.videoNo,
                                        videoName: video.videoTittle,
                                      });
                                      setModuleNo(item.moduleNo);
                                      setModuleTittle(item.moduleTittle);
                                      setVideoTittle(video.videoTittle);
                                      setVideoNo(video.videoNo);
                                    } else {
                                      getVideoForVisitors({
                                        // only get videos which are under preview section
                                        courseId: courseData._id,
                                        moduleNo: item.moduleNo,
                                        videoNo: video.videoNo,
                                        videoName: video.videoTittle,
                                      });
                                    }
                                  }}
                                >
                                  {video.preview ? "Preview" : "Play"}
                                </button>
                              </div>
                            )}
                          </div>
                        ))}
                    </div>
                  ))}
                </div>
              )}
              {swapper === "chat" && (
                <>
                  <Chat
                    courseId={courseData._id}
                    courseName={courseData.courseName}
                    setSwapper={setSwapper}
                  />
                </>
              )}
            </div>
          </div>

          {/* <div className="dark:bg-c_color-colorSeven capitalize p-5 mt-5 ml-3 rounded-md w-[42%] overflow-scroll h-full">
            {courseData.modules.map((item, index) => (
              <div className="flex flex-col" key={index}>
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
                            {video.videoTittle
                              .match(regex)?.[1]
                              .split("/")
                              .pop() || "No Match"}{" "}
                          </h1>
                          <button
                            className=" px-5 rounded-full h-[25px] font-bold dark:bg-cyan-500 "
                            onClick={() => {
                              if (
                                user &&
                                (user.role === "admin" ||
                                  user.role === "instructor")
                              ) {
                                getVideoForUser({
                                  // for admin access didnt wrote any extra api but used the same for enrolled user
                                  courseId: courseData._id,
                                  moduleNo: item.moduleNo,
                                  videoNo: video.videoNo,
                                  videoName: video.videoTittle,
                                });
                                setModuleNo(item.moduleNo);
                                setModuleTittle(item.moduleTittle);
                                setVideoTittle(video.videoTittle);
                                setVideoNo(video.videoNo);
                              } else if (
                                user &&
                                user.enrolledCourses?.find(
                                  (course) =>
                                    course === (courseData._id as string)
                                )
                              ) {
                                getVideoForUser({
                                  // for enrolled user
                                  courseId: courseData._id,
                                  moduleNo: item.moduleNo,
                                  videoNo: video.videoNo,
                                  videoName: video.videoTittle,
                                });
                                setModuleNo(item.moduleNo);
                                setModuleTittle(item.moduleTittle);
                                setVideoTittle(video.videoTittle);
                                setVideoNo(video.videoNo);
                              } else {
                                getVideoForVisitors({
                                  // only get videos which are under preview section
                                  courseId: courseData._id,
                                  moduleNo: item.moduleNo,
                                  videoNo: video.videoNo,
                                  videoName: video.videoTittle,
                                });
                              }
                            }}
                          >
                            {video.preview ? "Preview" : "Play"}
                          </button>
                        </div>
                      )}
                    </>
                  ))}
              </div>
            ))}
          </div> */}
        </div>
      ) : (
        <div>hello</div>
      )}
    </ContainerLayout>
  );
};

export default CourseSinglePage;
