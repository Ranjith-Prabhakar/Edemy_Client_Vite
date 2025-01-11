import { useCreateCategoryMutation } from "../../../redux/features/admin/Categories/categoryApi";
import { useFormik } from "formik";
import { addCategoryValidation } from "../../../schema/addCategorySchema";
import { IoIosCloseCircleOutline } from "react-icons/io";
import toast from "react-hot-toast";
import { useEffect } from "react";

type Props = {
  setAddCategory: React.Dispatch<React.SetStateAction<boolean>>;
  addCategory: boolean;
};

const AddCategory = ({ setAddCategory, addCategory }: Props) => {
  const [createCategory, { isSuccess }] = useCreateCategoryMutation();
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

  useEffect(() => {
    if (isSuccess) toast.success("category added");
  }, [isSuccess]);
  return (
    <div className="bg-c_color-colorSeven  shadow-2xl shadow-cyan-500 absolute z-10 left-[20%] top-[20%] flex items-start justify-center w-[400px] h-[200px] rounded-lg ">
      <form className="max-w-md mx-auto my-auto" onSubmit={handleSubmit}>
        <IoIosCloseCircleOutline
          size={25}
          className="absolute top-2 right-4 text-white"
          onClick={() => {
            setAddCategory(!addCategory);
          }}
        />

        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="category"
            id="floating_email"
            className="block py-2.5 px-0 w-full text-sm  bg-transparent border-0 border-b-2 appearance-none text-white border-gray-600 focus:border-blue-500 focus:outline-none focus:ring-0  peer"
            placeholder=" "
            value={values.category}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <label
            htmlFor="floating_email"
            className="peer-focus:font-medium absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-500  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Type the item here...
          </label>
          {errors.category && touched.category && <p>{errors.category}</p>}
        </div>
        <button
          type="submit"
          className="text-black bg-white focus:ring-4 focus:outline-none font-medium rounded-full text-sm w-full sm:w-auto px-10  py-1 text-center hover:bg-cyan-700 hover:text-white focus:ring-blue-800"
          disabled={isSubmitting}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddCategory;
