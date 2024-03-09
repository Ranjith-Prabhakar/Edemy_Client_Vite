import { useLocation, useNavigate } from "react-router-dom";
import VideoPlayer from "../../components/VideoPlayer/videoPlayer";
import { useEffect, useState } from "react";
import { IoIosArrowDropdown } from "react-icons/io";
import Header from "../../layouts/Header";
import ContainerLayout from "../../layouts/containerLayout";
import About from "../../features/Course/About";
import QuestionForm from "../../features/Course/QuestionForm";
import ReviewAndRating from "../../features/Course/ReviewAndRating";
import {
  useEnrollCourseMutation,
  useGetVideoForUserMutation,
  useGetVideoForVisitorsMutation,
} from "../../redux/features/course/courseApi";
import toast from "react-hot-toast";
import useGetUser from "../../hooks/useGetUser";

type ICourseData = {
  _id: string;
  instructor: string;
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
        }
      ];
    }
  ];
};

const CourseSinglePage = () => {
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
  const [isPurchased, setIsPurchased] = useState(false);
  const [swapper, setSwapper] = useState("about");

  useEffect(() => {
    if (user && user.enrolledCourses) {
      const purchased: boolean = user.enrolledCourses?.some(
        (course) => course._id === (courseData._id as string)
      );
      setIsPurchased(!purchased);
    }
  }, [courseData, user]);

  const regex = /\/(.*?)-/;
  useEffect(() => {
    if (isSuccess) {
      if (data && "data" in data) {
        const url = data.data;
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
      console.log("enrollData", enrollData);
      window.location = enrollData?.data as unknown as Location;
    }
    if (enrollIsError) {
      console.log("enrollError", enrollError);
      toast.error("something went wrong please try again");
    }
  }, [enrollData, enrollError, enrollIsError, enrollIsSuccess]);

  return (
    <ContainerLayout>
      <Header />
      {courseData ? (
        <div className="flex gap-2 mt-8 justify-between items-start  h-screen  overflow-scroll">
          <div className="dark:bg-c_color-colorSeven p-5 mt-5 rounded-md w-[58%]">
            <VideoPlayer videoUrl={videoUrl} width="680px" height="320px" />
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
                  swapper === "questions"
                    ? "dark:bg-c_color-colorSix  border-b border-dashed"
                    : ""
                } flex-1 text-center p-2 rounded-t-md cursor-pointer font-bold`}
                onClick={() => {
                  setSwapper("questions");
                }}
              >
                Questions
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
                Review & Rate
              </div>
              {isPurchased && (
                <div
                  className={`dark:bg-cyan-400 mb-1 flex-1 text-center p-2 rounded-md cursor-pointer font-bold`}
                  onClick={() => {
                    enrollCourse([
                      {
                        courseName: courseData.courseName,
                        price: courseData.price,
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
            <div className="flex">
              {swapper === "about" && (
                <About
                  courseName={courseData.courseName}
                  Description={courseData.discription}
                  Duration={courseData.duration}
                  Instructor={courseData.instructor}
                />
              )}
              {swapper === "questions" && <QuestionForm />}
              {swapper === "review" && <ReviewAndRating />}
            </div>
          </div>

          <div className="dark:bg-c_color-colorSeven capitalize p-5 mt-5 ml-3 rounded-md w-[42%] overflow-scroll h-full">
            {courseData.modules.map((item, index) => (
              <div className="flex flex-col">
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
                              if (
                                user &&
                                user.enrolledCourses?.find(
                                  (course) =>
                                    course._id === (courseData._id as string)
                                )
                              ) {
                                getVideoForUser({
                                  courseId: courseData._id,
                                  moduleNo: item.moduleNo,
                                  videoNo: video.videoNo,
                                  videoName: video.videoTittle,
                                });
                              } else {
                                getVideoForVisitors({
                                  courseId: courseData._id,
                                  moduleNo: item.moduleNo,
                                  videoNo: video.videoNo,
                                  videoName: video.videoTittle,
                                });
                              }
                            }}
                          >
                            {" "}
                            Play
                          </button>
                        </div>
                      )}
                    </>

                    //
                    // <div
                    //   key={videoIndex}
                    //   className="flex gap-2 justify-between mb-2 p-2"
                    // >
                    //   {video.videoNo} -{" "}
                    //   {video.videoTittle.match(regex)?.[1] || "No Match"}
                    //   <button
                    //     className=" px-3 rounded-sm h-[30px] font-bold dark:bg-gray-700 dark:text-gray-400"
                    //     onClick={() => {
                    //       getVideo({ videoName: video.videoTittle });
                    //     }}
                    //   >
                    //     {" "}
                    //     Play
                    //   </button>
                    // </div>
                  ))}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div>hello</div>
      )}
    </ContainerLayout>
  );
};

export default CourseSinglePage;
