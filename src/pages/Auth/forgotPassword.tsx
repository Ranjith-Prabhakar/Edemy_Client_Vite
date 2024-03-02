import { Link, useNavigate } from "react-router-dom";
import { IoHome } from "react-icons/io5";
import { useFormik } from "formik";
import ThemeToggler from "../../components/utils/ThemeToggler";
import { forgotPasswordEmailSchema } from "../../schema/forgotPasswordSchema";
import { useForgotPasswordEmailSubmissionMutation } from "../../redux/features/auth/authApi";
import { useEffect, useState } from "react";
import responseErrorCatch from "../../utils/responseErrorToast";
import toast from "react-hot-toast";
import { SpinnerButton } from "../../components/Buttons/SpinnerButton";
import GeneralButton from "../../components/Buttons/GeneralButton";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [forgotPasswordEmailSubmission, { isSuccess, data, isError, error,isLoading }] =
    useForgotPasswordEmailSubmissionMutation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isSuccess) {
      setLoading(false);
      console.log("success", data);
      if (data && "message" in data) {
        toast.success(data.message as string);
        navigate("/auth/forgot_password_otp_verification");
      }
    } else if (isLoading) {
      setLoading(true);
    } else if (isError) {
      setLoading(false);
      responseErrorCatch(error);
    }
  }, [isSuccess, isError, data, navigate, error, isLoading]);
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
      email: "",
    },
    validationSchema: forgotPasswordEmailSchema,
    onSubmit: async (values, actions) => {
      console.log("onsubmit", values.email);
      await forgotPasswordEmailSubmission({ email: values.email });
      actions.resetForm(); // after submission to clear the fields
    },
  });

  return (
    <section>
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow-lg  md:mt-0 sm:max-w-md xl:p-0 dark:bg-[#063134] ">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <div className="flex justify-between items-center">
              <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl ">
                Forgot Password
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
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium "
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur} // to check whether click on the field
                  className="bg-gray-50 border border-gray-300 text-black dark:text-black sm:text-sm rounded-lg focus:ring-[#69D3DC] focus:border-[#69D3DC] block w-full p-2.5 dark:bg-[#b7e2e6]  dark:placeholder-gray-400   "
                  placeholder="name@company.com"
                />
                {errors.email && touched.email && (
                  <p className="text-red-600">{errors.email}</p>
                )}
              </div>
              {loading ? (
                <SpinnerButton status="Validating Data" />
              ) : (
                <GeneralButton
                  type="submit"
                  disabled={isSubmitting} //
                >
                  Submit
                </GeneralButton>
              )}
              
            </form>
            <button
              className="w-full focus:ring-1 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-[#008E80] dark:hover:bg-[#009B7D] "
              onClick={(e) => {
                e.preventDefault();
                console.log("cliced cancel");
                navigate("/auth/login");
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ForgotPassword;
