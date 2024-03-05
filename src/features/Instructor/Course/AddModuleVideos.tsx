import { useFormik } from "formik";
import { addModueleVideosSchema } from "../../../schema/addModuleVideosSchema";
import { useEffect, useRef, useState } from "react";
import {
  useAddModuleMutation,
  useAddToBucketMutation,
  useAddModuleVideosMutation,
} from "../../../redux/features/course/courseApi";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { IModuleVideoBody } from "../../../redux/interfaces/Course/addModuleVideos";
import { IUserState } from "../../../redux/interfaces/authApi";
import responseErrorCatch from "../../../utils/responseErrorToast";
import { ICourseDataBody } from "../../../redux/interfaces/Course/addCourseData";
type Props = {
  moduleList: {
    [key: string]: string | number;
  }[];
  setModuleList: React.Dispatch<
    React.SetStateAction<
      {
        [key: string]: string | number;
      }[]
    >
  >;
  courseData: {
    courseName: string;
    discription: string;
    tags: string;
    thumbnail: string;
    duration: string;
    moduleNo: string;
    moduleTittle: string;
    videoTittle: string;
    videoNo: string;
    videoUrl: string;
  };

  setCourseData: React.Dispatch<
    React.SetStateAction<{
      courseName: string;
      discription: string;
      tags: string;
      thumbnail: string;
      duration: string;
      moduleNo: string;
      moduleTittle: string;
      videoTittle: string;
      videoNo: string;
      videoUrl: string;
    }>
  >;
  setModuleVideos: React.Dispatch<
    React.SetStateAction<Record<string, string | Record<string, string>[]>[]>
  >;
};

const AddModuleVideos = ({
  courseData,
  setCourseData,
  setModuleVideos,
}: Props) => {
  const [addModule] = useAddModuleMutation();
  const [addToBucket] = useAddToBucketMutation();
  const [addModuleVideos] = useAddModuleVideosMutation();
  const userId = useSelector(
    (state: { user: IUserState }) => state.user.userData._id as string
  );
  const moduleVideoRef = useRef<HTMLInputElement>(null);
  const videoNameRef = useRef<HTMLInputElement>(null);
  const [progressStatus, setProgressStatus] = useState(false);
  const [progressWidth, setProgressWidth] = useState(0);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (progressStatus) {
      timeoutId = setTimeout(() => {
        if (progressWidth > 99) {
          console.log("inside greater 99");
          setProgressWidth(0);
        } else {
          setProgressWidth((prevProgress) => prevProgress + 1);
        }
      }, 100);
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [progressStatus, progressWidth]);

  const handleAddModule = async (moduleVideoBody: IModuleVideoBody) => {
    try {
      const fileInput = moduleVideoRef.current;
      if (fileInput && fileInput.files && fileInput.files.length > 0) {
        const fileType = fileInput.files[0].name.split(".").pop();

        const moduleFileName =
          (videoNameRef.current?.value as string) + "-" + Date.now();
        const result = await addModule({
          fileName: `${moduleFileName}.${fileType}`,
          userId: userId,
          contentType: `video/${fileType}`,
        });

        if ("data" in result) {
          const bucketResult = await addToBucket({
            url: result?.data,
            body: fileInput.files[0],
            contentType: fileType as string,
          });
          if (bucketResult) {
            moduleVideoBody.videoTittle = `${userId}/${moduleFileName}.${fileType}`;

            const serverRespons = await addModuleVideos(moduleVideoBody);
            console.log(
              "serverRespons from addModuleVideo ==>>",
              serverRespons
            );
            if ("data" in serverRespons) {
              console.log("inside first if=======>>")
              if (serverRespons.data) {
              console.log("inside second if=======>>");

                if ("data" in serverRespons.data) {
              console.log("inside third if=======>>");

                  const newServerResponse =
                    serverRespons.data as unknown as ICourseDataBody;

                  if (serverRespons.data.data) {
              console.log(
                "inside fourth if and newServerResponse=======>>",
                newServerResponse
              );

                    const regex = /\/(.*?)-/;

                    const moduleData =
                      newServerResponse.data.modules[
                        newServerResponse.data.modules.length - 1
                      ];
                      console.log(
                        "inside fourth if but second=======>>",
                        moduleData
                      );

                    const moduleVideoData =
                      moduleData.videos[moduleData.videos.length - 1];
                    setCourseData({
                      courseName: newServerResponse.data.courseName ?? "",
                      discription: newServerResponse.data.discription ?? "",
                      tags: newServerResponse.data.tags ?? "",
                      thumbnail: newServerResponse.data.thumbnail ?? "",
                      duration: newServerResponse.data.duration ?? "",
                      moduleNo: moduleData.moduleNo ?? "",
                      moduleTittle: moduleData.moduleTittle ?? "",
                      videoTittle:
                        moduleVideoData.videoTittle.match(regex)?.[1] ?? "",
                      videoNo: moduleVideoData.videoNo ?? "",
                      videoUrl: moduleVideoData.videoUrl ?? "",
                    });
                    console.log("courseData after update=====>",courseData)
                    setProgressStatus(false);
                    setModuleVideos(newServerResponse.data.modules);
                    toast.success(newServerResponse.message);
                  } else {
                    toast.error(newServerResponse.message);
                  }
                }
              }
            }
          } else {
            console.log("adding to bucket faild ");
          }
        }
      } else {
        console.error("No file selected");
      }
    } catch (error) {
      responseErrorCatch(error);
    }
  };

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    setValues,
  } = useFormik({
    initialValues: {
      moduleNo: "",
      moduleTittle: "",
      videoTittle: "",
      videoNo: "",
      videoUrl: "",
    },
    validationSchema: addModueleVideosSchema,
    onSubmit: async (values) => {
      try {
        setProgressStatus(true);
        await handleAddModule(values);
      } catch (error) {
        responseErrorCatch(error);
      }
    },
  });

  useEffect(() => {
    setValues({
      moduleNo: courseData.moduleNo,
      moduleTittle: courseData.moduleTittle,
      videoTittle: courseData.videoTittle,
      videoNo: courseData.videoNo,
      videoUrl: "",
    });
  }, [courseData, setValues]);
  return (
    <form className="p-8" onSubmit={handleSubmit}>
      <div className="relative z-0 w-full mb-5 group">
        <label
          htmlFor="moduleNo"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Module No
        </label>
        <input
          type="number"
          name="moduleNo"
          id="moduleNo"
          value={values.moduleNo}
          onChange={handleChange}
          onBlur={handleBlur}
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          required
        />
        {errors.moduleNo && touched.moduleNo && (
          <p className="text-red-600">{errors.moduleNo}</p>
        )}
      </div>

      <div className="relative z-0 w-full mb-5 group">
        <label
          htmlFor="moduleTittle"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Module Tittle
        </label>
        <input
          type="text"
          name="moduleTittle"
          id="moduleTittle"
          value={values.moduleTittle}
          onChange={handleChange}
          onBlur={handleBlur}
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          required
        />
        {errors.moduleTittle && touched.moduleTittle && (
          <p className="text-red-600">{errors.moduleTittle}</p>
        )}
      </div>

      <div className="relative z-0 w-full mb-5 group">
        <label
          htmlFor="videoTittle"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Video Tittle
        </label>
        <input
          ref={videoNameRef}
          type="text"
          name="videoTittle"
          id="videoTittle"
          value={values.videoTittle}
          onChange={handleChange}
          onBlur={handleBlur}
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          required
        />
        {errors.videoTittle && touched.videoTittle && (
          <p className="text-red-600">{errors.videoTittle}</p>
        )}
      </div>

      <div className="relative z-0 w-full mb-5 group">
        <label
          htmlFor="videoNo"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Video No
        </label>
        <input
          type="number"
          name="videoNo"
          id="videoNo"
          value={values.videoNo}
          onChange={handleChange}
          onBlur={handleBlur}
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          required
        />
        {errors.videoNo && touched.videoNo && (
          <p className="text-red-600">{errors.videoNo}</p>
        )}
      </div>

      <div className="relative z-0 w-full mb-5 group">
        <label
          htmlFor="videoUrl"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Add File
        </label>
        <input
          ref={moduleVideoRef}
          type="file"
          name="videoUrl"
          id="videoUrl"
          value={values.videoUrl}
          onChange={handleChange}
          onBlur={handleBlur}
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          required
        />
        {errors.videoUrl && touched.videoUrl && (
          <p className="text-red-600">{errors.videoUrl}</p>
        )}
      </div>
      <button
        type="submit"
        className="dark:bg-c_color-colorSeven dark:text-white font-bold px-3 py-1 w-30 rounded-sm text-black hover:text-[18px] transition-all ease duration-700"
      >
        Add Modules
      </button>

      {progressStatus && (
        <div className="w-full h-[5px] bg-slate-50 rounded-full relative -bottom-4">
          <div
            style={{ width: `${progressWidth}%` }}
            className={`h-[5px] bg-green-950  absolute left-0`}
          ></div>
        </div>
      )}
    </form>
  );
};

export default AddModuleVideos;

// ========================================================================
// import { useFormik } from "formik";
// import { addModueleVideosSchema } from "../../../schema/addModuleVideosSchema";
// import { useEffect, useRef, useState } from "react";
// import {
//   useAddModuleMutation,
//   useAddToBucketMutation,
//   useAddModuleVideosMutation,
// } from "../../../redux/features/course/courseApi";
// import { useSelector } from "react-redux";
// import toast from "react-hot-toast";
// import { IModuleVideoBody } from "../../../redux/interfaces/Course/addModuleVideos";
// type Props = {
//   moduleList: {
//     [key: string]: string | number;
//   }[];
//   setModuleList: React.Dispatch<
//     React.SetStateAction<
//       {
//         [key: string]: string | number;
//       }[]
//     >
//   >;
//   courseData: {
//     courseName: string;
//     discription: string;
//     tags: string;
//     thumbnail: string;
//     duration: string;
//     moduleNo: string;
//     moduleTittle: string;
//     videoTittle: string;
//     videoNo: string;
//     videoUrl: string;
//   };

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

// const AddModuleVideos = ({
//   courseData,
//   setCourseData,
//   setModuleVideos,
// }: Props) => {
//   const [addModule] = useAddModuleMutation();
//   const [addToBucket] = useAddToBucketMutation();
//   const [addModuleVideos] = useAddModuleVideosMutation();
//   const userId = useSelector((state: any) => state.user.userData._id);
//   const moduleVideoRef = useRef<HTMLInputElement>(null);
//   const videoNameRef = useRef<HTMLInputElement>(null);
//   const [progressStatus, setProgressStatus] = useState(false);
//   const [progressWidth, setProgressWidth] = useState(0);

//   useEffect(() => {
//     let timeoutId: NodeJS.Timeout;

//     if (progressStatus) {
//       timeoutId = setTimeout(() => {
//         if (progressWidth > 99) {
//           console.log("inside greater 99");
//           setProgressWidth(0);
//         } else {
//           setProgressWidth((prevProgress) => prevProgress + 1);
//         }
//       }, 100);
//     }

//     return () => {
//       clearTimeout(timeoutId);
//     };
//   }, [progressStatus, progressWidth]);

//   const handleAddModule = async (moduleVideoBody: IModuleVideoBody) => {
//     try {
//       const fileInput = moduleVideoRef.current;
//       if (fileInput && fileInput.files && fileInput.files.length > 0) {
//         const fileType = fileInput.files[0].name.split(".").pop();

//         const moduleFileName =
//           (videoNameRef.current?.value as string) + "-" + Date.now();
//         const result = await addModule({
//           fileName: `${moduleFileName}.${fileType}`,
//           userId: userId,
//           contentType: `video/${fileType}`,
//         });

//         const bucketResult = await addToBucket({
//           url: result?.data,
//           body: fileInput.files[0],
//           contentType: fileType as string,
//         });

//         if (bucketResult) {
//           moduleVideoBody.videoTittle = `${userId}/${moduleFileName}.${fileType}`;

//           const serverRespons = await addModuleVideos(moduleVideoBody);
//           if (serverRespons.data.data) {
//             const regex = /\/(.*?)-/;
//             const moduleData =
//               serverRespons.data.data.modules[
//                 serverRespons.data.data.modules.length - 1
//               ];
//             const moduleVideoData =
//               moduleData.videos[moduleData.videos.length - 1];
//             setCourseData({
//               courseName: serverRespons.data.data.courseName ?? "",
//               discription: serverRespons.data.data.discription ?? "",
//               tags: serverRespons.data.data.tags ?? "",
//               thumbnail: serverRespons.data.data.thumbnail ?? "",
//               duration: serverRespons.data.data.duration ?? "",
//               moduleNo: moduleData.moduleNo ?? "",
//               moduleTittle: moduleData.moduleTittle ?? "",
//               videoTittle: moduleVideoData.videoTittle.match(regex)[1] ?? "",
//               videoNo: moduleVideoData.videoNo ?? "",
//               videoUrl: moduleVideoData.videoUrl ?? "",
//             });
//             setProgressStatus(false);
//             setModuleVideos(serverRespons.data.data.modules);
//             toast.success(serverRespons.data.message);
//           } else {
//             toast.error(serverRespons.data.message);
//           }
//         } else {
//           console.log("adding to bucket faild ");
//         }
//       } else {
//         console.error("No file selected");
//       }
//     } catch (error: any) {
//       console.log(error?.message);
//     }
//   };

//   const {
//     values,
//     errors,
//     touched,
//     handleChange,
//     handleBlur,
//     handleSubmit,
//     setValues,
//   } = useFormik({
//     initialValues: {
//       moduleNo: "",
//       moduleTittle: "",
//       videoTittle: "",
//       videoNo: "",
//       videoUrl: "",
//     },
//     validationSchema: addModueleVideosSchema,
//     onSubmit: async (values) => {
//       try {
//         setProgressStatus(true);
//         await handleAddModule(values);
//       } catch (error: any) {
//         toast.error(error.message);
//       }
//     },
//   });

//   useEffect(() => {
//     setValues({
//       moduleNo: courseData.moduleNo,
//       moduleTittle: courseData.moduleTittle,
//       videoTittle: courseData.videoTittle,
//       videoNo: courseData.videoNo,
//       videoUrl: "",
//     });
//   }, [courseData]);
//   return (
//     <form className="p-8" onSubmit={handleSubmit}>
//       <div className="relative z-0 w-full mb-5 group">
//         <label
//           htmlFor="moduleNo"
//           className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
//         >
//           Module No
//         </label>
//         <input
//           type="number"
//           name="moduleNo"
//           id="moduleNo"
//           value={values.moduleNo}
//           onChange={handleChange}
//           onBlur={handleBlur}
//           className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
//           placeholder=" "
//           required
//         />
//         {errors.moduleNo && touched.moduleNo && (
//           <p className="text-red-600">{errors.moduleNo}</p>
//         )}
//       </div>

//       <div className="relative z-0 w-full mb-5 group">
//         <label
//           htmlFor="moduleTittle"
//           className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
//         >
//           Module Tittle
//         </label>
//         <input
//           type="text"
//           name="moduleTittle"
//           id="moduleTittle"
//           value={values.moduleTittle}
//           onChange={handleChange}
//           onBlur={handleBlur}
//           className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
//           placeholder=" "
//           required
//         />
//         {errors.moduleTittle && touched.moduleTittle && (
//           <p className="text-red-600">{errors.moduleTittle}</p>
//         )}
//       </div>

//       <div className="relative z-0 w-full mb-5 group">
//         <label
//           htmlFor="videoTittle"
//           className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
//         >
//           Video Tittle
//         </label>
//         <input
//           ref={videoNameRef}
//           type="text"
//           name="videoTittle"
//           id="videoTittle"
//           value={values.videoTittle}
//           onChange={handleChange}
//           onBlur={handleBlur}
//           className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
//           placeholder=" "
//           required
//         />
//         {errors.videoTittle && touched.videoTittle && (
//           <p className="text-red-600">{errors.videoTittle}</p>
//         )}
//       </div>

//       <div className="relative z-0 w-full mb-5 group">
//         <label
//           htmlFor="videoNo"
//           className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
//         >
//           Video No
//         </label>
//         <input
//           type="number"
//           name="videoNo"
//           id="videoNo"
//           value={values.videoNo}
//           onChange={handleChange}
//           onBlur={handleBlur}
//           className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
//           placeholder=" "
//           required
//         />
//         {errors.videoNo && touched.videoNo && (
//           <p className="text-red-600">{errors.videoNo}</p>
//         )}
//       </div>

//       <div className="relative z-0 w-full mb-5 group">
//         <label
//           htmlFor="videoUrl"
//           className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
//         >
//           Add File
//         </label>
//         <input
//           ref={moduleVideoRef}
//           type="file"
//           name="videoUrl"
//           id="videoUrl"
//           value={values.videoUrl}
//           onChange={handleChange}
//           onBlur={handleBlur}
//           className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
//           placeholder=" "
//           required
//         />
//         {errors.videoUrl && touched.videoUrl && (
//           <p className="text-red-600">{errors.videoUrl}</p>
//         )}
//       </div>
//       <button
//         type="submit"
//         className="dark:bg-c_color-colorSeven dark:text-white font-bold px-3 py-1 w-30 rounded-sm text-black hover:text-[18px] transition-all ease duration-700"
//       >
//         Add Modules
//       </button>

//       {progressStatus && (
//         <div className="w-full h-[5px] bg-slate-50 rounded-full relative -bottom-4">
//           <div
//             style={{ width: `${progressWidth}%` }}
//             className={`h-[5px] bg-green-950  absolute left-0`}
//           ></div>
//         </div>
//       )}
//     </form>
//   );
// };

// export default AddModuleVideos;
