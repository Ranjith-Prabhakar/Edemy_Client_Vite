import { useFormik } from "formik";
import { addModueleVideosSchema } from "../../../schema/addModuleVideosSchema";
import { useEffect, useRef, useState } from "react";
import {
  useAddFileToCloudMutation,
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
      price: string;
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
  const [addFileToCloud] = useAddFileToCloudMutation();
  const [addToBucket] = useAddToBucketMutation();
  const [addModuleVideos] = useAddModuleVideosMutation();
  const userId = useSelector(
    (state: { user: IUserState }) => state.user.userData._id as string
  );
  const moduleVideoRef = useRef<HTMLInputElement>(null);
  const videoNameRef = useRef<HTMLInputElement>(null);
  const previewRef = useRef<HTMLSelectElement>(null);
  const [previewError, setPreviewError] = useState(false);
  const [progressStatus, setProgressStatus] = useState(false);
  const [progressWidth, setProgressWidth] = useState(0);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (progressStatus) {
      timeoutId = setTimeout(() => {
        if (progressWidth > 99) {
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
        const result = await addFileToCloud({
          fileName: `${moduleFileName}.${fileType}`,
          userId: userId,
          contentType: `video/${fileType}`,
          folderName: courseData.courseName,
          fromAddModuleVideo: true,
        });

        if ("data" in result) {
          const bucketResult = await addToBucket({
            url: result?.data,
            body: fileInput.files[0],
            contentType: fileType as string,
          });
          if (bucketResult) {
            moduleVideoBody.videoTittle = `${userId}/${courseData.courseName}/${moduleFileName}.${fileType}`;
            if (previewRef.current?.value === "true") {
              ///////
              moduleVideoBody.preview = true;
            } else {
              moduleVideoBody.preview = false;
            }

            const serverRespons = await addModuleVideos(moduleVideoBody);

            if ("data" in serverRespons) {
              if (serverRespons.data) {
                if ("data" in serverRespons.data) {
                  const newServerResponse =
                    serverRespons.data as unknown as ICourseDataBody;
                  if (serverRespons.data.data) {

                    const moduleData =
                      newServerResponse.data.modules[
                        newServerResponse.data.modules.length - 1
                      ];
                    const moduleVideoData =
                      moduleData.videos[moduleData.videos.length - 1];

                    const lastDashIndex =
                      moduleVideoData.videoTittle.lastIndexOf("-");
                    const lastSlashIndex =
                      moduleVideoData.videoTittle.lastIndexOf("/");
                    const extractedString =
                      moduleVideoData.videoTittle.substring(
                        lastSlashIndex + 1,
                        lastDashIndex
                      );

                    setCourseData({
                      courseName: newServerResponse.data.courseName ?? "",
                      price: newServerResponse.data.price ?? "",
                      discription: newServerResponse.data.discription ?? "",
                      tags: newServerResponse.data.tags ?? "",
                      thumbnail: newServerResponse.data.thumbnail ?? "",
                      duration: newServerResponse.data.duration ?? "",
                      moduleNo: moduleData.moduleNo ?? "",
                      moduleTittle: moduleData.moduleTittle ?? "",
                      videoTittle:extractedString,
                      videoNo: moduleVideoData.videoNo ?? "",
                      videoUrl: moduleVideoData.videoUrl ?? "",
                    });
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
        if (previewRef.current?.value === "choose one  preview option") {
          setPreviewError(true);
        } else {
          setProgressStatus(true);
          await handleAddModule(values);
        }
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
          className="peer-focus:font-medium absolute text-sm  text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto  peer-focus:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
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
          className="block py-2.5 px-0 w-full text-sm  bg-transparent border-0 border-b-2  appearance-none text-white border-gray-600 focus:border-blue-500 focus:outline-none focus:ring-0  peer"
          placeholder=" "
        />
        {errors.moduleNo && touched.moduleNo && (
          <p className="text-red-600">{errors.moduleNo}</p>
        )}
      </div>

      <div className="relative z-0 w-full mb-5 group">
        <label
          htmlFor="moduleTittle"
          className="peer-focus:font-medium absolute text-sm  text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto  peer-focus:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
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
          className="block py-2.5 px-0 w-full text-sm  bg-transparent border-0 border-b-2  appearance-none text-white border-gray-600 focus:border-blue-500 focus:outline-none focus:ring-0  peer"
          placeholder=" "
        />
        {errors.moduleTittle && touched.moduleTittle && (
          <p className="text-red-600">{errors.moduleTittle}</p>
        )}
      </div>

      <div className="relative z-0 w-full mb-5 group">
        <label
          htmlFor="videoTittle"
          className="peer-focus:font-medium absolute text-sm  text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto  peer-focus:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
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
          className="block py-2.5 px-0 w-full text-sm  bg-transparent border-0 border-b-2  appearance-none text-white border-gray-600 focus:border-blue-500 focus:outline-none focus:ring-0  peer"
          placeholder=" "
        />
        {errors.videoTittle && touched.videoTittle && (
          <p className="text-red-600">{errors.videoTittle}</p>
        )}
      </div>

      <div className="relative z-0 w-full mb-5 group">
        <label
          htmlFor="videoNo"
          className="peer-focus:font-medium absolute text-sm  text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto  peer-focus:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
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
          className="block py-2.5 px-0 w-full text-sm  bg-transparent border-0 border-b-2  appearance-none text-white border-gray-600 focus:border-blue-500 focus:outline-none focus:ring-0  peer"
          placeholder=" "
        />
        {errors.videoNo && touched.videoNo && (
          <p className="text-red-600">{errors.videoNo}</p>
        )}
      </div>

      <select
        ref={previewRef}
        name="preview"
        id="preview"
        className="block py-2.5 px-0 w-full mb-8 text-sm  bg-transparent border-0 border-b-2  appearance-none text-gray-400 border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
      >
        <option
          value="choose one option"
          className="italic font-bold bg-c_color-colorSeven hover:bg-c_color"
        >
          choose one preview option
        </option>

        <option
          value="true"
          className="italic font-bold bg-c_color-colorSeven"
        >
          true
        </option>

        <option
          value="false"
          className="italic font-bold bg-c_color-colorSeven"
        >
          false
        </option>
      </select>
      {previewError && (
        <p className="text-red-600">please choose an option for preview</p>
      )}
      <div className="relative z-0 w-full mb-5 group">
        <label
          htmlFor="videoUrl"
          className="peer-focus:font-medium absolute text-sm  text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto  peer-focus:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
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
          className="block py-2.5 px-0 w-full text-sm  bg-transparent border-0 border-b-2  appearance-none text-white border-gray-600 focus:border-blue-500 focus:outline-none focus:ring-0  peer"
          placeholder=" "
        />
      </div>
      <button
        type="submit"
        className="bg-c_color-colorSeven text-white font-bold px-3 py-1 w-30 rounded-sm  hover:text-[18px] transition-all ease duration-700"
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
