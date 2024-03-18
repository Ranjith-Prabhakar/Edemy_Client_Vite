import { addCourseDataSchema } from "../../../schema/addCourseDataSchema";
import { useFormik } from "formik";
import { FaArrowRightLong } from "react-icons/fa6";
import {
  useAddFileToCloudMutation,
  useAddCourseDataMutation,
  useAddToBucketMutation,
  useUpdateCourseMutation,
} from "../../../redux/features/course/courseApi";
import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { IUserState } from "../../../redux/interfaces/authApi";
import responseErrorCatch from "../../../utils/responseErrorToast";
import { ICourseDataBodyReq } from "../../../redux/interfaces/Course/addCourseData";
import { useGetCategoryQuery } from "../../../redux/features/course/courseApi";
import { ICategory } from "../../../redux/interfaces/Course/getCategories";

type Props = {
  setStepper: React.Dispatch<React.SetStateAction<number>>;
  courseData: {
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
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  submit: boolean;
};

const AddCourseData = ({
  setStepper,
  courseData,
  setCourseData,
  visible,
  setVisible,
  submit,
}: Props) => {
  const { data: categoryData, isSuccess: categorySuccess } =
    useGetCategoryQuery();
  const [categoryList, addCategoryList] = useState<ICategory[]>([]);
  const [categoryError, setCategoryError] = useState(false);

  const [addFileToCloud] = useAddFileToCloudMutation();
  const [addToBucket] = useAddToBucketMutation();
  const [addCourseData] = useAddCourseDataMutation();
  const [updateCourse, { data, isSuccess, error, isError }] =
    useUpdateCourseMutation();
  const userId = useSelector(
    (state: { user: IUserState }) => state.user.userData._id as string
  );
  const [loading, setLoading] = useState(false);
  const thumbnailRef = useRef<HTMLInputElement>(null);
  const courseNameRef = useRef<HTMLInputElement>(null);
  const categoryRef = useRef<HTMLSelectElement>(null);

  useEffect(() => {
    if (isSuccess) {
      if (data) {
        toast.success(data.message);
      }
    } else if (isError) {
      responseErrorCatch(error);
    }
  }, [data, error, isError, isSuccess]);

  useEffect(() => {
    if (categorySuccess) {
      addCategoryList(categoryData.data as ICategory[]);
      console.log("categoryList ===>", categoryList);
    }
  }, [categoryData, categoryList, categorySuccess]);

  const handleUpdation = async (data: Record<string, string>) => {
    try {
      await updateCourse(data);
    } catch (error) {
      responseErrorCatch(error);
    }
  };

  const handleAddImage = async (): Promise<{
    folderName: string;
    fileType: string;
    imgageFileName: string;
  } | void> => {
    try {
      const fileInput = thumbnailRef.current;
      if (fileInput && fileInput.files && fileInput.files.length > 0) {
        const fileType = fileInput.files[0].name.split(".").pop();

        if (fileType) {
          const imgageFileName = "thumbnail";
          const folderName = (courseNameRef?.current?.value as string) || "";
          const result = await addFileToCloud({
            fileName: `${imgageFileName}.${fileType}`,
            userId: userId,
            contentType: `video/${fileType}`,
            folderName: folderName,
          });

          console.log("result from handle image ====>>>", result);
          if ("data" in result) {
            if (result.data === "a course already exist in this name") {
              toast.error(result.data);
              return;
            }
            await addToBucket({
              url: result?.data,
              body: fileInput.files[0],
              contentType: fileType as string,
            });

            return { folderName, fileType, imgageFileName };
          }
        } else {
          console.error("File type not found");
        }
      } else {
        console.error("No file selected");
      }
    } catch (error) {
      responseErrorCatch(error);
    }
    return;
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
      courseName: courseData.courseName,
      price: courseData.price,
      discription: courseData.discription,
      tags: courseData.tags,
      thumbnail: courseData.thumbnail,
      duration: courseData.duration,
    },
    validationSchema: addCourseDataSchema,
    onSubmit: async (values) => {
      if (categoryRef.current?.value === "choose one category") {
        setCategoryError(true);
      } else {
        setLoading(true);
        const clonedObject: { [key: string]: string | undefined } =
          Object.create(null); // to clone an object without the prototype chaining

        for (const key in values) {
          if (Object.prototype.hasOwnProperty.call(values, key)) {
            clonedObject[key] = values[key as keyof typeof values] as
              | string
              | undefined;
          }
        }
        clonedObject.category = categoryRef.current?.value;

        //
        const imageInfo = await handleAddImage();

        if (imageInfo) {
          const { folderName, fileType, imgageFileName } = imageInfo;
          clonedObject.thumbnail = `${userId}/${folderName}/${imgageFileName}.${fileType}`;
          const result = await addCourseData(
            clonedObject as unknown as ICourseDataBodyReq
          );

          console.log("second result imageInfo ===>", result);
          if ("data" in result) {
            if (result.data) {
              if ("data" in result.data) {
                if (result.data) {
                  const regex = /\/(.*?)-/;
                  const moduleData =
                    result.data.data.modules[
                      result.data.data.modules.length - 1
                    ];
                  const moduleVideoData =
                    moduleData?.videos[moduleData.videos.length - 1];
                  setCourseData({
                    courseName: result.data.data.courseName ?? "",
                    price: result.data.data.price ?? "",
                    discription: result.data.data.discription ?? "",
                    tags: result.data.data.tags ?? "",
                    thumbnail: result.data.data.thumbnail ?? "",
                    duration: result.data.data.duration ?? "",
                    moduleNo: moduleData?.moduleNo ?? "",
                    moduleTittle: moduleData?.moduleTittle ?? "",
                    videoTittle:
                      moduleVideoData?.videoTittle?.match(regex)?.[1] ?? "",
                    videoNo: moduleVideoData?.videoNo ?? "",
                    videoUrl: moduleVideoData?.videoUrl ?? "",
                  });

                  // setCourseData(result.data.data);
                }
                setVisible(false);
                setStepper(2);
              }
            }
          }
        } else {
          console.error("Error handling image");
          setLoading(false);
          return;
        }
        setLoading(false);
      }

      //
    },
  });

  useEffect(() => {
    setValues({
      courseName: courseData.courseName,
      price: courseData.price,
      discription: courseData.discription,
      tags: courseData.tags,
      thumbnail: courseData.thumbnail,
      duration: courseData.duration,
    });
    if (courseData.courseName) {
      setVisible(false);
    } else {
      setVisible(true);
    }
  }, [courseData, setValues, setVisible]);

  return (
    <form onSubmit={handleSubmit} action="" className="p-8 ">
      <div className="relative z-0 w-full mb-5 group">
        <select
          ref={categoryRef}
          name="category"
          id="category"
          className=" block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
        >
          <option
            value="choose one category"
            className="italic font-bold dark:bg-c_color-colorSeven dark:hover:bg-c_color "
          >
            choose one category
          </option>
          {categoryList.map((option) => (
            <option
              value={option.name}
              className="italic font-bold dark:bg-c_color-colorSeven"
            >
              {option.name}
            </option>
          ))}
        </select>

        {categoryError && !submit && (
          <p className="text-red-600">please select a category</p>
        )}
      </div>

      <div className="relative z-0 w-full mb-5 group">
        <input
          type="number"
          name="price"
          id="price"
          value={values.price}
          onChange={handleChange}
          onBlur={handleBlur}
          className=" block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer relative"
          placeholder=" "
        />
        {!visible && (
          <button
            type="button"
            className="dark:bg-c_color-colorSeven px-3 py-1 w-20 rounded-sm dark:text-white font-bold flex justify-center items-center absolute right-2 top-1 hover:text-[18px] transition-all ease duration-700"
            onClick={() => handleUpdation({ price: values.price })}
          >
            Update
          </button>
        )}
        {errors.price && touched.price && (
          <p className="text-red-600">{errors.price}</p>
        )}
        {/* ========================================================================= */}

        <label
          htmlFor="courseName"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Price
        </label>
      </div>

      <div className="relative z-0 w-full mb-5 group">
        <input
          ref={courseNameRef}
          type="text"
          name="courseName"
          id="courseName"
          value={values.courseName}
          onChange={handleChange}
          onBlur={handleBlur}
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer relative"
          placeholder=" "
        />
        {!visible && (
          <button
            type="button"
            className="dark:bg-c_color-colorSeven px-3 py-1 w-20 rounded-sm dark:text-white font-bold flex justify-center items-center absolute right-2 top-1 hover:text-[18px] transition-all ease duration-700"
            onClick={() => handleUpdation({ courseName: values.courseName })}
          >
            Update
          </button>
        )}
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
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer relative"
          placeholder=" "
        />
        {!visible && (
          <button
            type="button"
            className="hover:text-[18px] transition-all ease duration-700 dark:bg-c_color-colorSeven dark:text-white font-bold px-3 py-1 w-20 rounded-sm  flex justify-center items-center absolute right-2 top-2"
            onClick={() => handleUpdation({ discription: values.discription })}
          >
            Update
          </button>
        )}
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
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer relative"
          placeholder=" "
        />
        {!visible && (
          <button
            type="button"
            className="hover:text-[18px] transition-all ease duration-700 dark:bg-c_color-colorSeven dark:text-white font-bold px-3 py-1 w-20 rounded-sm  flex justify-center items-center absolute right-2 top-1"
            onClick={() => handleUpdation({ tags: values.tags })}
          >
            Update
          </button>
        )}
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
          ref={thumbnailRef}
          type="file"
          name="thumbnail"
          id="thumbnail"
          // value={values.thumbnail}
          onChange={handleChange}
          onBlur={handleBlur}
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer relative"
          placeholder=" "
        />
        {!visible && (
          <button
            type="button"
            className="hover:text-[18px] transition-all ease duration-700 dark:bg-c_color-colorSeven dark:text-white font-bold px-3 py-1 w-20 rounded-sm  flex justify-center items-center absolute right-2 top-2"
            onClick={() => handleUpdation({ thumbnail: values.thumbnail })}
          >
            Update
          </button>
        )}
        {errors.thumbnail && touched.thumbnail && (
          <p className="text-red-600">{errors.thumbnail}</p>
        )}
      </div>

      <div className="relative z-0 w-full mb-5 group">
        <input
          type="number"
          name="duration"
          id="duration"
          value={values.duration}
          onChange={handleChange}
          onBlur={handleBlur}
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer relative"
          placeholder=" "
        />
        {!visible && (
          <button
            type="button"
            className="hover:text-[18px] transition-all ease duration-700 dark:bg-c_color-colorSeven dark:text-white font-bold px-3 py-1 w-20 rounded-sm  flex justify-center items-center absolute right-2 top-1"
            onClick={() => handleUpdation({ duration: values.duration })}
          >
            Update
          </button>
        )}
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
      {visible && (
        <button
          type="submit"
          // className="  px-3 py-1 w-20 rounded-sm  flex justify-center items-center absolute right-2 top-1"
          className="dark:bg-c_color-colorSeven dark:text-white hover:text-[18px] transition-all ease duration-700 font-bold  px-3 py-1 w-20 rounded-sm text-black flex justify-center items-center"
        >
          {loading ? (
            <div role="status">
              <svg
                aria-hidden="true"
                className="inline w-10 h-5 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span className="sr-only">Loading...</span>
            </div>
          ) : (
            <FaArrowRightLong />
          )}
        </button>
      )}
    </form>
  );
};

export default AddCourseData;

// ======================================================
// import { addCourseDataSchema } from "../../../schema/addCourseDataSchema";
// import { useFormik } from "formik";
// import { FaArrowRightLong } from "react-icons/fa6";
// import {
//   useAddModuleMutation,
//   useAddCourseDataMutation,
//   useAddToBucketMutation,
//   useUpdateCourseMutation,
// } from "../../../redux/features/course/courseApi";
// import { useSelector } from "react-redux";
// import { useEffect, useRef } from "react";
// import toast from "react-hot-toast";

// type Props = {
//   setStepper: React.Dispatch<React.SetStateAction<number>>;
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
//   visible: boolean;
//   setVisible: React.Dispatch<React.SetStateAction<boolean>>;
// };

// const AddCourseData = ({
//   setStepper,
//   courseData,
//   setCourseData,
//   visible,
//   setVisible,
// }: Props) => {
//   const [addModule] = useAddModuleMutation();
//   const [addToBucket] = useAddToBucketMutation();
//   const [addCourseData] = useAddCourseDataMutation();
//   const [updateCourse, { data, isSuccess, error, isError }] =
//     useUpdateCourseMutation();
//   const userId = useSelector((state: any) => state.user.userData._id);
//   const thumbnailRef = useRef<HTMLInputElement>(null);
//   const courseNameRef = useRef<HTMLInputElement>(null);

//   useEffect(() => {
//     if (isSuccess) {
//       if (data) {
//         toast.success(data.message);
//       }
//     } else if (isError) {
//       if (error) {
//         toast.error(error.message);
//       }
//     }
//   }, [data, error, isError, isSuccess]);

//   const handleUpdation = async (data: Record<string, string>) => {
//     try {
//       const result = await updateCourse(data);
//     } catch (error: any) {
//       toast.error(error.message);
//     }
//   };

//   const handleAddImage = async (): Promise<{
//     fileType: string;
//     imgageFileName: string;
//   } | void> => {
//     try {
//       const fileInput = thumbnailRef.current;
//       if (fileInput && fileInput.files && fileInput.files.length > 0) {
//         const fileType = fileInput.files[0].name.split(".").pop();

//         if (fileType) {
//           const imgageFileName = "thumbnail";
//           const result = await addModule({
//             fileName: `${imgageFileName}.${fileType}`,
//             userId: userId,
//             contentType: `video/${fileType}`,
//             courseName: (courseNameRef?.current?.value as string) || "",
//           });

//           console.log("result from handle image", result);
//           if (result.data === "a course already exist in this name") {
//             toast.error(result.data);
//             return;
//           }
//           await addToBucket({
//             url: result?.data,
//             body: fileInput.files[0],
//             contentType: fileType as string,
//           });

//           return { fileType, imgageFileName };
//         } else {
//           console.error("File type not found");
//         }
//       } else {
//         console.error("No file selected");
//       }
//     } catch (error: any) {
//       console.log(error?.message);
//     }
//     return;
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
//       courseName: courseData.courseName,
//       discription: courseData.discription,
//       tags: courseData.tags,
//       thumbnail: courseData.thumbnail,
//       duration: courseData.duration,
//     },
//     validationSchema: addCourseDataSchema,
//     onSubmit: async (values, actions) => {
//       const clonedObject: { [key: string]: string | undefined } =
//         Object.create(null); // to clone an object without the prototype chaining

//       for (const key in values) {
//         if (Object.prototype.hasOwnProperty.call(values, key)) {
//           clonedObject[key] = values[key as keyof typeof values] as
//             | string
//             | undefined;
//         }
//       }

//       //
//       const imageInfo = await handleAddImage();

//       if (imageInfo) {
//         const { fileType, imgageFileName } = imageInfo;
//         clonedObject.thumbnail = `${userId}/${imgageFileName}.${fileType}`;
//         const result = await addCourseData(
//           clonedObject as unknown as ICourseDataBody
//         );

//         if (result.data) {
//           setCourseData(result.data.data as typeof courseData);
//         }
//         setVisible(false);
//         setStepper(2);
//       } else {
//         console.error("Error handling image");
//         return;
//       }
//       //
//     },
//   });

//   useEffect(() => {
//     setValues({
//       courseName: courseData.courseName,
//       discription: courseData.discription,
//       tags: courseData.tags,
//       thumbnail: courseData.thumbnail,
//       duration: courseData.duration,
//     });
//     if (courseData.courseName) {
//       setVisible(false);
//     } else {
//       setVisible(true);
//     }
//   }, [courseData]);

//   return (
//     <form onSubmit={handleSubmit} action="" className="p-8 ">
//       <div className="relative z-0 w-full mb-5 group">
//         <select
//           name="category"
//           id="category"
//           value={values.courseName}
//           onChange={handleChange}
//           onBlur={handleBlur}
//           className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer relative"
//           placeholder=" "
//         >
//           <option value="testOne">testOne</option>
//           <option value="testTwo">testTwo</option>
//           <option value="testThree">testThree</option>
//         </select>

//         {errors.courseName && touched.courseName && (
//           <p className="text-red-600">{errors.courseName}</p>
//         )}
//         <label
//           htmlFor="courseName"
//           className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
//         >
//           Course Name
//         </label>
//       </div>

//       <div className="relative z-0 w-full mb-5 group">
//         <input
//           ref={courseNameRef}
//           type="text"
//           name="courseName"
//           id="courseName"
//           value={values.courseName}
//           onChange={handleChange}
//           onBlur={handleBlur}
//           className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer relative"
//           placeholder=" "
//         />
//         {!visible && (
//           <button
//             type="button"
//             className="dark:bg-c_color-colorSeven px-3 py-1 w-20 rounded-sm dark:text-white font-bold flex justify-center items-center absolute right-2 top-1 hover:text-[18px] transition-all ease duration-700"
//             onClick={() => handleUpdation({ courseName: values.courseName })}
//           >
//             Update
//           </button>
//         )}
//         {errors.courseName && touched.courseName && (
//           <p className="text-red-600">{errors.courseName}</p>
//         )}
//         <label
//           htmlFor="courseName"
//           className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
//         >
//           Course Name
//         </label>
//       </div>

//       <div className="relative z-0 w-full mb-5 group">
//         <textarea
//           name="discription"
//           id="discription"
//           value={values.discription}
//           onChange={handleChange}
//           onBlur={handleBlur}
//           className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer relative"
//           placeholder=" "
//         />
//         {!visible && (
//           <button
//             type="button"
//             className="hover:text-[18px] transition-all ease duration-700 dark:bg-c_color-colorSeven dark:text-white font-bold px-3 py-1 w-20 rounded-sm  flex justify-center items-center absolute right-2 top-2"
//             onClick={() => handleUpdation({ discription: values.discription })}
//           >
//             Update
//           </button>
//         )}
//         {errors.discription && touched.discription && (
//           <p className="text-red-600">{errors.discription}</p>
//         )}
//         <label
//           htmlFor="discription"
//           className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
//         >
//           Description
//         </label>
//       </div>

//       <div className="relative z-0 w-full mb-5 group">
//         <input
//           type="text"
//           name="tags"
//           id="tags"
//           value={values.tags}
//           onChange={handleChange}
//           onBlur={handleBlur}
//           className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer relative"
//           placeholder=" "
//         />
//         {!visible && (
//           <button
//             type="button"
//             className="hover:text-[18px] transition-all ease duration-700 dark:bg-c_color-colorSeven dark:text-white font-bold px-3 py-1 w-20 rounded-sm  flex justify-center items-center absolute right-2 top-1"
//             onClick={() => handleUpdation({ tags: values.tags })}
//           >
//             Update
//           </button>
//         )}
//         {errors.tags && touched.tags && (
//           <p className="text-red-600">{errors.tags}</p>
//         )}
//         <label
//           htmlFor="tags"
//           className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
//         >
//           Tags
//         </label>
//       </div>

//       <div className="relative z-0 w-full mb-5 group">
//         <label
//           htmlFor="thumbnail"
//           className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
//         >
//           Thumbnail
//         </label>
//         <input
//           ref={thumbnailRef}
//           type="file"
//           name="thumbnail"
//           id="thumbnail"
//           // value={values.thumbnail}
//           onChange={handleChange}
//           onBlur={handleBlur}
//           className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer relative"
//           placeholder=" "
//         />
//         {!visible && (
//           <button
//             type="button"
//             className="hover:text-[18px] transition-all ease duration-700 dark:bg-c_color-colorSeven dark:text-white font-bold px-3 py-1 w-20 rounded-sm  flex justify-center items-center absolute right-2 top-2"
//             onClick={() => handleUpdation({ thumbnail: values.thumbnail })}
//           >
//             Update
//           </button>
//         )}
//         {errors.thumbnail && touched.thumbnail && (
//           <p className="text-red-600">{errors.thumbnail}</p>
//         )}
//       </div>

//       <div className="relative z-0 w-full mb-5 group">
//         <input
//           type="number"
//           name="duration"
//           id="duration"
//           value={values.duration}
//           onChange={handleChange}
//           onBlur={handleBlur}
//           className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer relative"
//           placeholder=" "
//         />
//         {!visible && (
//           <button
//             type="button"
//             className="hover:text-[18px] transition-all ease duration-700 dark:bg-c_color-colorSeven dark:text-white font-bold px-3 py-1 w-20 rounded-sm  flex justify-center items-center absolute right-2 top-1"
//             onClick={() => handleUpdation({ duration: values.duration })}
//           >
//             Update
//           </button>
//         )}
//         {errors.duration && touched.duration && (
//           <p className="text-red-600">{errors.duration}</p>
//         )}
//         <label
//           htmlFor="duration"
//           className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
//         >
//           Duration
//         </label>
//       </div>
//       {visible && (
//         <button
//           type="submit"
//           // className="  px-3 py-1 w-20 rounded-sm  flex justify-center items-center absolute right-2 top-1"
//           className="dark:bg-c_color-colorSeven dark:text-white hover:text-[18px] transition-all ease duration-700 font-bold  px-3 py-1 w-20 rounded-sm text-black flex justify-center items-center"
//         >
//           <FaArrowRightLong />
//         </button>
//       )}
//     </form>
//   );
// };

// export default AddCourseData;
