import { Link, useNavigate } from "react-router-dom";
import { IoHome } from "react-icons/io5";
import { useFormik } from "formik";
import ThemeToggler from "../../components/utils/ThemeToggler";
import { resetForgotPasswordSchema } from "../../schema/resetForgotPasswordSchema";

import { useResetPasswordMutation } from "../../redux/features/auth/authApi";
import { useEffect } from "react";
import toast from "react-hot-toast";
import AuthInputs from "../../components/inputFields/AuthInputs";
import GeneralButton from "../../components/Buttons/GeneralButton";
import responseErrorCatch from "../../utils/responseErrorToast";

const ResetForgotPassword = () => {
  const navigate = useNavigate();
  const [resetPassword, { isSuccess, data, isError, error }] =
    useResetPasswordMutation();

  useEffect(() => {
    if (isSuccess) {
      console.log("success", data);
      toast.success(data.message);
      navigate("/auth/login");
    } else if (isError) {
      responseErrorCatch(error)
    }
  }, [isSuccess, isError, data, navigate, error]);
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
      password: "",
    },
    validationSchema: resetForgotPasswordSchema,
    onSubmit: async (values, actions) => {
      console.log("onsubmit", values.password);
      await resetPassword({ password: values.password });
      actions.resetForm();
    },
  });

  return (
    <section>
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow-lg md:mt-0 sm:max-w-md xl:p-0 dark:bg-c_color-colorOne">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <div className="flex justify-between items-center">
              <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl ">
                New Password
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
                <AuthInputs
                  type="password"
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  label="Password"
                />
                {errors.password && touched.password && (
                  <p className="text-red-600">{errors.password}</p>
                )}
              </div>
              <GeneralButton
                type="submit"
                disabled={isSubmitting} //
              >
                Submit
              </GeneralButton>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResetForgotPassword;
