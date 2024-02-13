import { useEffect, useRef, useState } from "react";
import { useFormik } from "formik";
import { addCourseSchema } from "../../../schema/addCourseSchema";
import { FaArrowRightLong } from "react-icons/fa6";
import { FaArrowLeftLong } from "react-icons/fa6";
import {
  useAddModuleMutation,
  useAddToBucketMutation,
} from "../../../redux/features/course/courseApi";
type Props = {};

const AddCourse = (props: Props) => {
  const [stepper, setStepper] = useState(1);
  const [addModule, { data, isError, error }] = useAddModuleMutation();
  const [addToBucket] = useAddToBucketMutation();
  const moduleVideoRef = useRef<HTMLInputElement>(null);
  const moduleNameRef = useRef<HTMLInputElement>(null);

  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
  } = useFormik({
    initialValues: {
      courseName: "",
      discription: "",
      tags: "",
      thumbnail: "",
      duration: "",
      moduleNo: "",
      moduleTittle: "",
      moduleVideo: "",
    },
    validationSchema: addCourseSchema,
    onSubmit: (values, actions) => {},
  });

  useEffect(() => {
    console.log(error);
  }, [isError]);

  const handleNext = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (stepper < 3) {
      setStepper((prevState) => prevState + 1);
    }
  };

  const handlePrev = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (stepper > 1) {
      setStepper((prevState) => prevState - 1);
    }
  };

  const handleAddModule = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    try {
      const fileInput = moduleVideoRef.current;
      if (fileInput && fileInput.files && fileInput.files.length > 0) {
        const fileType = fileInput.files[0].name.split(".").pop();

        const moduleFileName =
          (moduleNameRef.current?.value as string) + Date.now();
        const result = await addModule({
          fileName: `${moduleFileName}.${fileType}`,
          contentType: `video/${fileType}`,
        });

        await addToBucket({
          url: result?.data,
          body: fileInput.files[0],
          contentType: fileType as string,
        });

        const localStorageVideos = localStorage.getItem("moduleVideos");
        if (!localStorageVideos) {
          const moduleVideos = [`${moduleFileName}.${fileType}`];
          localStorage.setItem("moduleVideos", JSON.stringify(moduleVideos));
        } else {
          let dataFromLocalStorage = JSON.parse(localStorageVideos);
          dataFromLocalStorage.push(`${moduleFileName}.${fileType}`);
          localStorage.setItem(
            "moduleVideos",
            JSON.stringify(dataFromLocalStorage)
          );
        }
       
         setFieldValue("moduleNo", "");
         setFieldValue("moduleTittle", "");
         setFieldValue("moduleVideo", "");
      } else {
        console.error("No file selected");
      }
    } catch (error: any) {
      console.log(error?.message);
    }
  };

  return (
    <div className="flex-col">
      <div className="flex p-3 flex-wrap h-full">
        <div className="flex-auto ">
          <form onSubmit={handleSubmit} className="w-full">
            {stepper === 1 && (
              <>
                <div className="relative z-0 w-full mb-5 group">
                  <input
                    type="text"
                    name="courseName"
                    id="courseName"
                    value={values.courseName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    required
                  />
                  {errors.courseName && touched.courseName && (
                    <p className="text-red-600">{errors.courseName}</p>
                  )}
                  <label
                    htmlFor="courseName"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Course Name
                  </label>
                </div>

                <div className="relative z-0 w-full mb-5 group">
                  <textarea
                    name="discription"
                    id="discription"
                    value={values.discription}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    required
                  />
                  {errors.discription && touched.discription && (
                    <p className="text-red-600">{errors.discription}</p>
                  )}
                  <label
                    htmlFor="discription"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Description
                  </label>
                </div>

                <div className="relative z-0 w-full mb-5 group">
                  <input
                    type="text"
                    name="tags"
                    id="tags"
                    value={values.tags}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    required
                  />
                  {errors.tags && touched.tags && (
                    <p className="text-red-600">{errors.tags}</p>
                  )}
                  <label
                    htmlFor="tags"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Tags
                  </label>
                </div>

                <div className="relative z-0 w-full mb-5 group">
                  <label
                    htmlFor="thumbnail"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Thumbnail
                  </label>
                  <input
                    type="file"
                    name="thumbnail"
                    id="thumbnail"
                    value={values.thumbnail}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    required
                  />
                  {errors.thumbnail && touched.thumbnail && (
                    <p className="text-red-600">{errors.thumbnail}</p>
                  )}
                </div>

                <div className="relative z-0 w-full mb-5 group">
                  <input
                    type="time"
                    name="duration"
                    id="duration"
                    value={values.duration}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    required
                  />
                  {errors.duration && touched.duration && (
                    <p className="text-red-600">{errors.duration}</p>
                  )}
                  <label
                    htmlFor="duration"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Duration
                  </label>
                </div>
              </>
            )}

            {stepper === 2 && (
              <>
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
                    ref={moduleNameRef}
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
                    htmlFor="moduleVideo"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Add File
                  </label>
                  <input
                    ref={moduleVideoRef}
                    type="file"
                    name="moduleVideo"
                    id="moduleVideo"
                    value={values.moduleVideo}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    required
                  />
                  {errors.moduleVideo && touched.moduleVideo && (
                    <p className="text-red-600">{errors.moduleVideo}</p>
                  )}
                </div>
              </>
            )}

            <div className="flex gap-2 justify-between items-center">
              {stepper === 1 && (
                <button
                  className="bg-slate-500 px-3 py-1 w-20 rounded-sm text-black flex justify-center items-center"
                  onClick={(e) => {
                    handleNext(e);
                  }}
                >
                  <FaArrowRightLong />
                </button>
              )}
              {stepper === 2 && (
                <>
                  <button
                    className="bg-slate-500 px-3 py-1 w-20 rounded-sm text-black flex justify-center items-center"
                    onClick={(e) => {
                      handlePrev(e);
                    }}
                  >
                    <FaArrowLeftLong />
                  </button>

                  <button
                    type="button"
                    className="bg-slate-500 px-3 py-1 w-20 rounded-sm text-black"
                    onClick={(e) => {
                      handleAddModule(e);
                    }}
                  >
                    Add
                  </button>

                  <button
                    className="bg-slate-500 px-3 py-1 w-20 rounded-sm text-black flex justify-center items-center"
                    onClick={(e) => {
                      handleNext(e);
                    }}
                  >
                    <FaArrowRightLong />
                  </button>
                </>
              )}
              {stepper === 3 && (
                <button
                  className="bg-slate-500 px-3 py-1 w-20 rounded-sm text-black flex justify-center items-center"
                  onClick={(e) => {
                    handlePrev(e);
                  }}
                >
                  <FaArrowLeftLong />
                </button>
              )}
            </div>
          </form>
        </div>

        <div className="flex-1 flex-col justify-between h-full">
          <div className="flex justify-center items-center">
            <div
              className={`rounded-full w-11 h-11  ${
                stepper === 1 ? "bg-green-950" : "bg-slate-500"
              } flex justify-center items-center`}
            >
              <h1>1</h1>
            </div>
            <hr className="w-12 border-[2px]" />
            <div
              className={`rounded-full w-11 h-11  ${
                stepper === 2 ? "bg-green-950" : "bg-slate-500"
              } flex justify-center items-center`}
            >
              <h1>2</h1>
            </div>
            <hr className="w-12 border-[2px]" />
            <div
              className={`rounded-full w-11 h-11  ${
                stepper === 3 ? "bg-green-950" : "bg-slate-500"
              } flex justify-center items-center`}
            >
              <h1>3</h1>
            </div>
          </div>
        </div>
      </div>

      <div>hai</div>
    </div>
  );
};

export default AddCourse;
