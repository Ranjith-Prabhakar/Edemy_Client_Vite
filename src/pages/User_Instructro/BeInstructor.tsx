import { Link } from "react-router-dom";
import { IoHome } from "react-icons/io5";
import { useFormik } from "formik";
import ThemeToggler from "../../components/utils/ThemeToggler";
import { beInstructorSchema } from "../../schema/beInstructor";



const BeInstructor = () => {

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
      qualification: "",
    },
    validationSchema: beInstructorSchema,
    onSubmit: async (values, actions) => {
      actions.resetForm();
    },
  });

  return (
    <section className="dark:bg-black dark:text-white">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-950 ">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <div className="flex justify-between items-center">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-[#FFd700]">
                Be a instructor
              </h1>
              <div className="flex justify-center items-center gap-3">
                {" "}
                <Link to={"/"}>
                  <IoHome color={"#FFd700"} className="dark:text-[#FFD700]" />
                </Link>
                <ThemeToggler />
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
              <div>
                <label
                  htmlFor="qualification"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-[#FFd700]"
                >
                  Qualification
                </label>
                <input
                  type="text"
                  name="qualification"
                  id="qualification"
                  value={values.qualification}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-black dark:text-black sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-[#e4d9a6]  dark:placeholder-gray-400  dark:focus:ring-[#FFD700] dark:focus:border-[#FFD700] "
                  required
                />
                {errors.qualification && touched.qualification && (
                  <p className="text-red-600">{errors.qualification}</p>
                )}
              </div>
              <button
                type="submit"
                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-[#FFd700] dark:hover:bg-[#fafd58] dark:focus:ring-[#FFd700] dark:text-black"
                disabled={isSubmitting} 
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BeInstructor;
