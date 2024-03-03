import { addCourseDataSchema } from "../../../schema/addCourseDataSchema";
import { useFormik } from "formik";
import { FaArrowRightLong } from "react-icons/fa6";
import {
  useAddModuleMutation,
  useAddCourseDataMutation,
  useAddToBucketMutation,
  useUpdateCourseMutation,
} from "../../../redux/features/course/courseApi";
import { useSelector } from "react-redux";
import { useEffect, useRef } from "react";
import { ICourseDataBody } from "../../../redux/ResponseInterfaces/Course/addCourseData";
import toast from "react-hot-toast";

type Props = {
  setStepper: React.Dispatch<React.SetStateAction<number>>;
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
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

const AddCourseData = ({
  setStepper,
  courseData,
  setCourseData,
  visible,
  setVisible,
}: Props) => {
  const [addModule] = useAddModuleMutation();
  const [addToBucket] = useAddToBucketMutation();
  const [addCourseData] = useAddCourseDataMutation();
  const [updateCourse, { data, isSuccess, error, isError }] =
    useUpdateCourseMutation();
  const userId = useSelector((state: any) => state.user.userData._id);
  const thumbnailRef = useRef<HTMLInputElement>(null);
  const courseNameRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSuccess) {
      if (data) {
        toast.success(data.message);
      }
    } else if (isError) {
      if (error) {
        toast.error(error.message);
      }
    }
  }, [data, error, isError, isSuccess]);

  const handleUpdation = async (data: Record<string, string>) => {
    try {
      const result = await updateCourse(data);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleAddImage = async (): Promise<{
    fileType: string;
    imgageFileName: string;
  } | void> => {
    try {
      const fileInput = thumbnailRef.current;
      if (fileInput && fileInput.files && fileInput.files.length > 0) {
        const fileType = fileInput.files[0].name.split(".").pop();

        if (fileType) {
          const imgageFileName = "thumbnail";
          const result = await addModule({
            fileName: `${imgageFileName}.${fileType}`,
            userId: userId,
            contentType: `video/${fileType}`,
            courseName: (courseNameRef?.current?.value as string) || "",
          });

          console.log("result from handle image", result);
          if (result.data === "a course already exist in this name") {
            toast.error(result.data);
            return;
          }
          await addToBucket({
            url: result?.data,
            body: fileInput.files[0],
            contentType: fileType as string,
          });

          return { fileType, imgageFileName };
        } else {
          console.error("File type not found");
        }
      } else {
        console.error("No file selected");
      }
    } catch (error: any) {
      console.log(error?.message);
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
      discription: courseData.discription,
      tags: courseData.tags,
      thumbnail: courseData.thumbnail,
      duration: courseData.duration,
    },
    validationSchema: addCourseDataSchema,
    onSubmit: async (values, actions) => {
      const clonedObject: { [key: string]: string | undefined } =
        Object.create(null); // to clone an object without the prototype chaining

      for (const key in values) {
        if (Object.prototype.hasOwnProperty.call(values, key)) {
          clonedObject[key] = values[key as keyof typeof values] as
            | string
            | undefined;
        }
      }

      //
      const imageInfo = await handleAddImage();

      if (imageInfo) {
        const { fileType, imgageFileName } = imageInfo;
        clonedObject.thumbnail = `${userId}/${imgageFileName}.${fileType}`;
        const result = await addCourseData(
          clonedObject as unknown as ICourseDataBody
        );

        if (result.data) {
          setCourseData(result.data.data as typeof courseData);
        }
        setVisible(false);
        setStepper(2);
      } else {
        console.error("Error handling image");
        return;
      }
      //
    },
  });

  useEffect(() => {
    setValues({
      courseName: courseData.courseName,
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
  }, [courseData]);

  return (
    <form onSubmit={handleSubmit} action="" className="p-8 ">
      <div className="relative z-0 w-full mb-5 group">
        <select
          ref={courseNameRef}
          type="text"
          name="courseName"
          id="courseName"
          value={values.courseName}
          onChange={handleChange}
          onBlur={handleBlur}
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer relative"
          placeholder=" "
        >
          <option value="testOne">testOne</option>
          <option value="testTwo">testTwo</option>
          <option value="testThree">testThree</option>
        </select>

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
          <FaArrowRightLong />
        </button>
      )}
    </form>
  );
};

export default AddCourseData;
