import { useCreateCategoryMutation } from "../../../redux/features/admin/category/categoryApi";
import { useFormik } from "formik";
import { addCategoryValidation } from "../../../schema/addCategorySchema";
import { IoIosCloseCircleOutline } from "react-icons/io";

type Props = {
  setAddCategory: React.Dispatch<React.SetStateAction<boolean>>;
  addCategory:boolean
};

const AddCategory = ({ setAddCategory, addCategory }: Props) => {
  const [createCategory] = useCreateCategoryMutation();
  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
  } = useFormik({
    initialValues: {
      category: "",
    },
    validationSchema: addCategoryValidation,
    onSubmit: async (values, action) => {
      try {
        await createCategory({ category: values.category });
        action.resetForm();
      } catch (error) {
        console.log(error);
      }
    },
  });
  return (
    <div className=" bg-black opacity-[0.8] absolute z-10 left-[20%] top-[20%] flex items-start justify-center w-[400px] h-[200px] rounded-lg ">
      <form className="max-w-md mx-auto my-auto" onSubmit={handleSubmit}>
        <IoIosCloseCircleOutline
          size={25}
          className="absolute top-2 right-4"
          onClick={() => {
            setAddCategory(!addCategory);
          }}
        />

        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="category"
            id="floating_email"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            value={values.category}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <label
            htmlFor="floating_email"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Type the item here...
          </label>
          {errors.category && touched.category && <p>{errors.category}</p>}
        </div>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          disabled={isSubmitting}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddCategory;
