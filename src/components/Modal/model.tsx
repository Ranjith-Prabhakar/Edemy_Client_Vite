import React from "react";
import { useUpdateCourseMutation } from "../../redux/features/course/courseApi";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
// import { ICourseDataModel } from "../../features/Instructor/Course/Courses";

type Props = {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;

  // setCourseData: React.Dispatch<React.SetStateAction<ICourseDataModel>>;

  setModuleVideos: React.Dispatch<
    React.SetStateAction<Record<string, string | Record<string, string>[]>[]>
  >;
  setSubmit: React.Dispatch<React.SetStateAction<boolean>>;
};

const Model = ({
  setOpen,
  setModuleVideos,
  setSubmit,
}: Props) => {
  const [updateCourse] = useUpdateCourseMutation();
  const navigate = useNavigate();
  console.log("inside model");
  return (
    <div>
      <div
        id="alert-additional-content-1"
        className="p-4 mb-4 text-blue-800 border border-blue-300 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400 dark:border-blue-800"
        role="alert"
      >
        <div className="flex items-center">
          <svg
            className="flex-shrink-0 w-4 h-4 me-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
          </svg>
          <span className="sr-only">Info</span>
          <h3 className="text-lg font-medium">This is a warning alert</h3>
        </div>
        <div className="mt-2 mb-4 text-sm">
          Once you agree to submit means you wont be able to add or edit the
          course again.
        </div>
        <div className="flex">
          <button
            type="button"
            className="text-white bg-yellow-800 hover:bg-yellow-900 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-xs px-3 py-1.5 me-2 text-center flex justify-center items-center dark:bg-yellow-300 dark:text-gray-800 dark:hover:bg-yellow-400 dark:focus:ring-yellow-800"
            onClick={async () => {
              await updateCourse({ submissionStatus: "completed" });
              setOpen(false);
              setModuleVideos([]);
              setSubmit(true);
              toast.success("course has been added");
              navigate("/instructor/profile");
            }}
          >
            Submit
          </button>
          <button
            type="button"
            className="text-yellow-800 bg-transparent border border-yellow-800 hover:bg-yellow-900 hover:text-white focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-xs px-3 py-1.5 text-center dark:hover:bg-yellow-300 dark:border-yellow-300 dark:text-yellow-300 dark:hover:text-gray-800 dark:focus:ring-yellow-800"
            data-dismiss-target="#alert-additional-content-4"
            aria-label="Close"
            onClick={() => {
              setOpen(false);
            }}
          >
            Dismiss
          </button>
        </div>
      </div>
    </div>
  );
};

export default Model;

// import React from "react";
// import { useUpdateCourseMutation } from "../../redux/features/course/courseApi";
// import { useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";
// // import { ICourseDataModel } from "../../features/Instructor/Course/Courses";

// type Props = {
//   setOpen: React.Dispatch<React.SetStateAction<boolean>>;

//   // setCourseData: React.Dispatch<React.SetStateAction<ICourseDataModel>>;
//   setCourseData: React.Dispatch<
//     React.SetStateAction<{
//       courseName: string;
//       price: string;
//       discription: string;
//       tags: string;
//       thumbnail: string;
//       duration: string;
//       moduleNo: string;
//       moduleTittle: string;
//       videoTittle: string;
//       videoNo: string;
//       videoUrl: string;
//     }>
//   >;
//   setModuleVideos: React.Dispatch<
//     React.SetStateAction<Record<string, string | Record<string, string>[]>[]>
//   >;
//   setSubmit: React.Dispatch<React.SetStateAction<boolean>>;
// };

// const Model = ({
//   setOpen,
//   setCourseData,
//   setModuleVideos,
//   setSubmit,
// }: Props) => {
//   const [updateCourse] = useUpdateCourseMutation();
//   const navigate = useNavigate();
//   console.log("inside model");
//   return (
//     <div>
//       <div
//         id="alert-additional-content-1"
//         className="p-4 mb-4 text-blue-800 border border-blue-300 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400 dark:border-blue-800"
//         role="alert"
//       >
//         <div className="flex items-center">
//           <svg
//             className="flex-shrink-0 w-4 h-4 me-2"
//             aria-hidden="true"
//             xmlns="http://www.w3.org/2000/svg"
//             fill="currentColor"
//             viewBox="0 0 20 20"
//           >
//             <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
//           </svg>
//           <span className="sr-only">Info</span>
//           <h3 className="text-lg font-medium">This is a warning alert</h3>
//         </div>
//         <div className="mt-2 mb-4 text-sm">
//           Once you agree to submit means you wont be able to add or edit the
//           course again.
//         </div>
//         <div className="flex">
//           <button
//             type="button"
//             className="text-white bg-yellow-800 hover:bg-yellow-900 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-xs px-3 py-1.5 me-2 text-center flex justify-center items-center dark:bg-yellow-300 dark:text-gray-800 dark:hover:bg-yellow-400 dark:focus:ring-yellow-800"
//             onClick={async () => {
//               await updateCourse({ submissionStatus: "completed" });
//               setOpen(false);
//               setCourseData({
//                 courseName: "",
//                 discription: "",
//                 tags: "",
//                 thumbnail: "",
//                 duration: "",
//                 modules: [
//                   {
//                     moduleNo: "",
//                     moduleTittle: "",
//                     videos: [
//                       {
//                         videoTittle: "",
//                         videoNo: "",
//                         videoUrl: "",
//                       },
//                     ],
//                   },
//                 ],
//               });
//               setModuleVideos([]);
//               setSubmit(true);
//               toast.success("course has been added")
//               navigate("/instructor/profile");
//             }}
//           >
//             Submit
//           </button>
//           <button
//             type="button"
//             className="text-yellow-800 bg-transparent border border-yellow-800 hover:bg-yellow-900 hover:text-white focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-xs px-3 py-1.5 text-center dark:hover:bg-yellow-300 dark:border-yellow-300 dark:text-yellow-300 dark:hover:text-gray-800 dark:focus:ring-yellow-800"
//             data-dismiss-target="#alert-additional-content-4"
//             aria-label="Close"
//             onClick={() => {
//               setOpen(false);
//             }}
//           >
//             Dismiss
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Model;

// ===============================
// import React from "react";
// import {
//   useUpdateCourseMutation,
// } from "../../redux/features/course/courseApi";
// import { useNavigate } from "react-router-dom";

// type Props = {
//   setOpen: React.Dispatch<React.SetStateAction<boolean>>;

//   setCourseData: React.Dispatch<
//     React.SetStateAction<{
//       courseName: string;
//       discription: string;
//       tags: string;
//       thumbnail: string;
//       duration: string;
//       moduleNo: string;
//       moduleTittle: string;
//       videoTittle: string;
//       videoNo: string;
//       videoUrl: string;
//     }>
//   >;
//   setModuleVideos: React.Dispatch<
//     React.SetStateAction<Record<string, string | Record<string, string>[]>[]>
//   >;
// };

// const Model = ({ setOpen, setCourseData, setModuleVideos }: Props) => {
//   const [updateCourse] = useUpdateCourseMutation();
//   const navigate = useNavigate();
//   console.log("inside model");
//   return (
//     <div>
//       <div
//         id="alert-additional-content-1"
//         className="p-4 mb-4 text-blue-800 border border-blue-300 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400 dark:border-blue-800"
//         role="alert"
//       >
//         <div className="flex items-center">
//           <svg
//             className="flex-shrink-0 w-4 h-4 me-2"
//             aria-hidden="true"
//             xmlns="http://www.w3.org/2000/svg"
//             fill="currentColor"
//             viewBox="0 0 20 20"
//           >
//             <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
//           </svg>
//           <span className="sr-only">Info</span>
//           <h3 className="text-lg font-medium">This is a warning alert</h3>
//         </div>
//         <div className="mt-2 mb-4 text-sm">
//           Once you agree to submit means you wont be able to add or edit the
//           course again.
//         </div>
//         <div className="flex">
//           <button
//             type="button"
//             className="text-white bg-yellow-800 hover:bg-yellow-900 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-xs px-3 py-1.5 me-2 text-center flex justify-center items-center dark:bg-yellow-300 dark:text-gray-800 dark:hover:bg-yellow-400 dark:focus:ring-yellow-800"
//             onClick={async () => {
//               await updateCourse({ submissionStatus: "completed" });
//               setOpen(false);
//               setCourseData({
//                 courseName: "",
//                 discription: "",
//                 tags: "",
//                 thumbnail: "",
//                 duration: "",
//                 moduleNo: "",
//                 moduleTittle: "",
//                 videoTittle: "",
//                 videoNo: "",
//                 videoUrl: "",
//               });
//               setModuleVideos([]);
//               navigate("/user/profile");
//             }}
//           >
//             Submit
//           </button>
//           <button
//             type="button"
//             className="text-yellow-800 bg-transparent border border-yellow-800 hover:bg-yellow-900 hover:text-white focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-xs px-3 py-1.5 text-center dark:hover:bg-yellow-300 dark:border-yellow-300 dark:text-yellow-300 dark:hover:text-gray-800 dark:focus:ring-yellow-800"
//             data-dismiss-target="#alert-additional-content-4"
//             aria-label="Close"
//             onClick={() => {
//               setOpen(false);
//             }}
//           >
//             Dismiss
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Model;
