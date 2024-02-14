import { addCourseDataSchema } from "../../../schema/addCourseDataSchema";
import { useFormik } from "formik";
import { FaArrowRightLong } from "react-icons/fa6";

type Props = {
  setStepper: React.Dispatch<React.SetStateAction<number>>;
  courseData: {
    courseName: string;
    discription: string;
    tags: string;
    thumbnail: string;
    duration: string;
  };
  setCourseData: React.Dispatch<
    React.SetStateAction<{
      courseName: string;
      discription: string;
      tags: string;
      thumbnail: string;
      duration: string;
    }>
  >;
};

const AddCourseData = ({ setStepper, courseData, setCourseData }: Props) => {
  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    // setFieldValue,
  } = useFormik({
    initialValues: {
      courseName: courseData.courseName,
      discription: courseData.discription,
      tags: courseData.tags,
      thumbnail: courseData.thumbnail,
      duration: courseData.duration,
    },
    validationSchema: addCourseDataSchema,
    onSubmit: (values, actions) => {
      const clonedObject: { [key: string]: string | undefined } =
        Object.create(null); // to clone an object without the prototype chaining

      for (const key in values) {
        if (Object.prototype.hasOwnProperty.call(values, key)) {
          clonedObject[key] = values[key as keyof typeof values] as
            | string
            | undefined;
        }
      }

      localStorage.setItem("courseData", JSON.stringify(clonedObject));
      setCourseData(clonedObject as typeof courseData);
      setStepper(2);
    },
  });
  return (
    <form onSubmit={handleSubmit} action="" className="p-8">
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
          // value={values.thumbnail}
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

      <button className="bg-slate-500 px-3 py-1 w-20 rounded-sm text-black flex justify-center items-center">
        <FaArrowRightLong />
      </button>
    </form>
  );
};

export default AddCourseData;
