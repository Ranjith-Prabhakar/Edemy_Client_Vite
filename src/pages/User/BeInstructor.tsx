import { Link } from "react-router-dom";
import { IoHome } from "react-icons/io5";
import { useFormik } from "formik";
import ThemeToggler from "../../components/utils/ThemeToggler";
import { beInstructorSchema } from "../../schema/beInstructor";
import { useToBeInstructorMutation } from "../../redux/features/user/userApi";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import responseErrorCatch from "../../utils/responseErrorToast";
import AuthInputs from "../../components/inputFields/AuthInputs";
import GeneralButton from "../../components/Buttons/GeneralButton";

const BeInstructor = () => {
  const navigate = useNavigate();
  const [toBeInstructor, { data, isSuccess, isError, error }] =
    useToBeInstructorMutation();
  useEffect(() => {
    if (isSuccess) {
      toast.success(data.message);
      navigate("/user/profile");
    } else if (isError) {
      responseErrorCatch(error);
      navigate("/user/profile");
    }
  }, [isSuccess, isError, data, navigate, error]);
  const {
    values,
    errors,
    touched,

    handleChange,
    handleBlur,
    handleSubmit,
  } = useFormik({
    initialValues: {
      qualification: "",
    },
    validationSchema: beInstructorSchema,
    onSubmit: async (values, actions) => {
      await toBeInstructor({ qualification: values.qualification });
      actions.resetForm();
    },
  });

  return (
    <section>
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow-lg md:mt-0 sm:max-w-md xl:p-0 dark:bg-c_color-colorSeven">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <div className="flex justify-between items-center">
              <h1 className="text-xl font-bold leading-tight tracking-tightmd:text-2xl ">
                Be a instructor
              </h1>
              <div className="flex justify-center items-center gap-3">
                {" "}
                <Link to={"/"}>
                  <IoHome />
                </Link>
                <ThemeToggler />
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
              <div>
                <textarea
                  name=""
                  id=""
                  rounded-lg
                  className=" mb-3 w-[100%] h-[260px] bg-gray-50 border border-gray-300 dark:text-slate-800 sm:text-sm rounded-lg focus:ring-c_color-colorTwo focus:border-c_color-colorTwo block  p-2.5 dark:bg-c_color-colorThree dark:placeholder-gray-400"
                >
                  you are responsible to provide quality education, adhere to
                  the platform's guidelines, maintain professionalism, engage
                  students effectively, and continuously improve your teaching
                  methods for an enriching e-learning experience. tutor agrees
                  to a revenue-sharing model of 30/70, where the tutor receives
                  70% of the income generated, and the platform retains 30%, as
                  specified in our terms and conditions
                </textarea>
                <AuthInputs
                  type="text"
                  name="qualification"
                  value={values.qualification}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Add Qualification"
                  label="Add Qualification"
                />

                {errors.qualification && touched.qualification && (
                  <p className="text-red-600">{errors.qualification}</p>
                )}
              </div>
              <GeneralButton>Submit</GeneralButton>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BeInstructor;
