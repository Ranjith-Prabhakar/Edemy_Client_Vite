// import React, { useState } from 'react'
// import { ICourseData } from '../../pages/General/CourseSinglePage';
// import { IoIosArrowDropdown } from 'react-icons/io';
// import useGetUser from '../../hooks/useGetUser';
// import { useGetVideoForUserMutation } from '../../redux/features/course/courseApi';

// type Props = {
//   courseData: ICourseData;
// };

// const PlayList = ({ courseData,}: Props) => {
//   const [showModuleVideos, setShowModuleVideos] = useState(0);
//   const user = useGetUser();
//   const regex = /\/(.*?)-/;
//   const [getVideoForUser, { data, isSuccess, isError, error }] =
//     useGetVideoForUserMutation();
//     const [moduleNo, setModuleNo] = useState("");
//     const [moduleTittle, setModuleTittle] = useState("");
//     const [videoNo, setVideoNo] = useState("");
//     const [videoTittle, setVideoTittle] = useState("");  
//     useEffect(() => {
//       if (isSuccess) {
//         if (data && "data" in data) {
//           const url = data.data;
//           setPosition(data.position || "0");
//           setVideoUrl(url as string);
//         }
//       }
//       if (isError) {
//         if (error && "data" in error) {
//           type TError = {
//             status: number;
//             data: { status: number; message: string; success: boolean };
//           };
//           const Error = error as TError;
//           toast.error(Error.data.message);
//         }
//       }
//     }, [data, isSuccess, isError, error]);

//   return (
//     <div className="dark:bg-c_color-colorSeven capitalize p-5 mt-5 ml-3 rounded-md w-[42%] overflow-scroll h-full">
//       {courseData.modules.map((item, index) => (
//         <div className="flex flex-col" key={index}>
//           <div
//             className="flex gap-2 rounded-lg justify-between items-center cursor-pointer border border-white  p-2 text-white"
//             onClick={() => {
//               if (showModuleVideos === index + 1) setShowModuleVideos(0);
//               else setShowModuleVideos(index + 1);
//             }}
//           >
//             <h1>{item.moduleNo}</h1>
//             <h1>{`${item.moduleTittle}(${item.videos.length})`}</h1>
//             <div>
//               <IoIosArrowDropdown size={25} />
//             </div>
//           </div>

//           {Array.isArray(item.videos) &&
//             item.videos.map((video, videoIndex) => (
//               <>
//                 {showModuleVideos === index + 1 && (
//                   <div
//                     key={videoIndex}
//                     className="flex capitalize gap-2 justify-between m-1 px-2 py-1 dark:bg-c_color-colorSix cursor-pointer hover:scale-105"
//                   >
//                     <h1> {video.videoNo}</h1>
//                     <h1>
//                       {video.videoTittle.match(regex)?.[1].split("/").pop() ||
//                         "No Match"}{" "}
//                     </h1>
//                     <button
//                       className=" px-5 rounded-full h-[25px] font-bold dark:bg-cyan-500 "
//                       onClick={() => {
//                         if (
//                           user &&
//                           (user.role === "admin" || user.role === "instructor")
//                         ) {
//                           getVideoForUser({
//                             // for admin access didnt wrote any extra api but used the same for enrolled user
//                             courseId: courseData._id,
//                             moduleNo: item.moduleNo,
//                             videoNo: video.videoNo,
//                             videoName: video.videoTittle,
//                           });
//                           setModuleNo(item.moduleNo);
//                           setModuleTittle(item.moduleTittle);
//                           setVideoTittle(video.videoTittle);
//                           setVideoNo(video.videoNo);
//                         } else if (
//                           user &&
//                           user.enrolledCourses?.find(
//                             (course) => course === (courseData._id as string)
//                           )
//                         ) {
//                           getVideoForUser({
//                             // for enrolled user
//                             courseId: courseData._id,
//                             moduleNo: item.moduleNo,
//                             videoNo: video.videoNo,
//                             videoName: video.videoTittle,
//                           });
//                           setModuleNo(item.moduleNo);
//                           setModuleTittle(item.moduleTittle);
//                           setVideoTittle(video.videoTittle);
//                           setVideoNo(video.videoNo);
//                         } else {
//                           getVideoForVisitors({
//                             // only get videos which are under preview section
//                             courseId: courseData._id,
//                             moduleNo: item.moduleNo,
//                             videoNo: video.videoNo,
//                             videoName: video.videoTittle,
//                           });
//                         }
//                       }}
//                     >
//                       {video.preview ? "Preview" : "Play"}
//                     </button>
//                   </div>
//                 )}
//               </>
//             ))}
//         </div>
//       ))}
//     </div>
//   );
// };

// export default PlayList