import { Link, useNavigate } from "react-router-dom";
import { IoHome } from "react-icons/io5";
import { useFormik } from "formik";
import { signupSchema } from "../../schema/authSchema";
import { SpinnerButton } from "../../components/Buttons/SpinnerButton";

import { useRegisterMutation } from "../../redux/features/auth/authApi";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { catchError } from "../../utils/catchError";
import AuthInputs from "../../components/inputFields/AuthInputs";
import GeneralButton from "../../components/Buttons/GeneralButton";
import responseErrorCatch from "../../utils/responseErrorToast";

const SignUp = () => {
  const [register, { isSuccess, isError, error, isLoading }] =
    useRegisterMutation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isLoading) {
      setLoading(true);
    } else if (isSuccess) {
      setLoading(false);
      toast.success("otp has been sent to your mail");
      navigate("/auth/otp_verification", { state: { fromSignup: true } });
    } else if (isError) {
      setLoading(false);
      responseErrorCatch(error);
    }
  }, [isSuccess, isError, error, isLoading, navigate]);

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
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: signupSchema,
    onSubmit: async (values, actions) => {
      try {
        await register({
          name: values.name,
          email: values.email,
          password: values.password,
          confirmPassword: values.confirmPassword,
        });
        actions.resetForm();
      } catch (error: unknown) {
        catchError(error);
      }
    },
  });

  return (
    <section>
      <div className="flex flex-col  items-center justify-center px-4 py-8 mx-auto h-screen lg:py-0">
        <div className="w-full py-5 px-3 rounded-lg shadow-lg md:mt-0 sm:max-w-md xl:p-0 bg-[#063134] ">
          <div className=" sm:p-8">
            <div className="flex justify-between items-center">
              <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl  mb-4">
                Sign up to your account
              </h1>
              <div className="flex justify-center items-center gap-3">
                {" "}
                <Link to={"/"}>
                  <IoHome />
                </Link>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-2 md:space-y-2">
              <div>
                <AuthInputs
                  type="text"
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="John Doe"
                  label="Your name"
                />
                {errors.name && touched.name && (
                  <p className="text-red-600">{errors.name}</p>
                )}
              </div>

              <div>
                <AuthInputs
                  type="text"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="johndoe@gmail.com"
                  label="Your email"
                />
                {errors.email && touched.email && (
                  <p className="text-red-600">{errors.email}</p>
                )}
              </div>
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
              <div>
                <AuthInputs
                  type="password"
                  name="confirmPassword"
                  value={values.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="••••••••"
                  label="Confirm Password"
                />
                {errors.confirmPassword && touched.confirmPassword && (
                  <p className="text-red-600">{errors.confirmPassword}</p>
                )}
              </div>
              <br />
              {loading ? (
                <SpinnerButton status="Validating Data" />
              ) : (
                <GeneralButton type="submit" disabled={isSubmitting}>
                  Sign in
                </GeneralButton>
              )}

              <p className="text-sm font-light">
                Don’t have an account yet?{" "}
                <Link
                  to="/auth/Login"
                  className="font-bold text-[16px] hover:underline"
                >
                  Log in
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
