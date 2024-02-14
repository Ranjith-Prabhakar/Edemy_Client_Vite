import { useFormik } from "formik";
import { addModueleVideosSchema } from "../../../schema/addModuleVideosSchema";
import { useRef } from "react";
import {
  useAddModuleMutation,
  useAddToBucketMutation,
} from "../../../redux/features/course/courseApi";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

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
};

const AddModuleVideos = ({ moduleList, setModuleList }: Props) => {
  const [addModule] = useAddModuleMutation();
  const [addToBucket] = useAddToBucketMutation();
  const userId = useSelector((state: any) => state.user.userData._id);
  const moduleVideoRef = useRef<HTMLInputElement>(null);
  const moduleNameRef = useRef<HTMLInputElement>(null);

  const handleAddModule = async () => {
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
        setModuleList([
          ...moduleList,
          {
            moduleNo: ++moduleList.length,
            moduleName: moduleNameRef.current?.value as string,
          },
        ]);
        return;
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
      moduleVideo: "",
    },
    validationSchema: addModueleVideosSchema,
    onSubmit: async (values) => {
      try {
        await handleAddModule();
        resetForm();
        toast.success("Module has been added");
      } catch (error:any) {
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
