import { useFormik } from "formik";
import { addModueleVideosSchema } from "../../../schema/addModuleVideosSchema";
import { useRef } from "react";
import {
  useAddModuleMutation,
  useAddToBucketMutation,
  useAddModuleVideosMutation,
} from "../../../redux/features/course/courseApi";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { IModuleVideoBody } from "../../../redux/features/ResponseInterfaces/Course/addModuleVideos";

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
  };
};

const AddModuleVideos = ({ moduleList, setModuleList, courseData }: Props) => {
  const [addModule] = useAddModuleMutation();
  const [addToBucket] = useAddToBucketMutation();
  const [addModuleVideos] = useAddModuleVideosMutation();
  const userId = useSelector((state: any) => state.user.userData._id);
  const moduleVideoRef = useRef<HTMLInputElement>(null);
  const moduleNameRef = useRef<HTMLInputElement>(null);

  const handleAddModule = async (moduleVideoBody: IModuleVideoBody) => {
    try {
      const fileInput = moduleVideoRef.current;
      if (fileInput && fileInput.files && fileInput.files.length > 0) {
        const fileType = fileInput.files[0].name.split(".").pop();

        const moduleFileName =
          (moduleNameRef.current?.value as string) + "-" + Date.now();
        const result = await addModule({
          fileName: `${moduleFileName}.${fileType}`,
          userId: userId,
          contentType: `video/${fileType}`,
        });

        const bucketResult = await addToBucket({
          url: result?.data,
          body: fileInput.files[0],
          contentType: fileType as string,
        });

        if (bucketResult) {
          moduleVideoBody.videoTittle = `${userId}/${moduleFileName}.${fileType}`;
          const serverRespons = await addModuleVideos(moduleVideoBody);
          console.log("result from video upload ", serverRespons);
        } else {
          console.log("adding to bucket faild ");
        }
      } else {
        console.error("No file selected");
      }
    } catch (error: any) {
      console.log(error?.message);
    }
  };

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
  } = useFormik({
    initialValues: {
      moduleNo: "",
      moduleTittle: "",
      videoNo: "",
      videoTittle: "",
    },
    validationSchema: addModueleVideosSchema,
    onSubmit: async (values) => {
      try {
        await handleAddModule(values);
        resetForm();
        toast.success("Module has been added");
      } catch (error: any) {
        toast.error(error.message);
      }
    },
  });

  return (
    <form action="" onSubmit={handleSubmit}>
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
          htmlFor="videoTittle"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Add File
        </label>
        <input
          ref={moduleVideoRef}
          type="file"
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
      <button
        type="submit"
        className="bg-slate-500 px-3 py-1 w-30 rounded-sm text-black"
      >
        Add Modules
      </button>
    </form>
  );
};

export default AddModuleVideos;

