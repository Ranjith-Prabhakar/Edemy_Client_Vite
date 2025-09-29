import { Link } from "react-router-dom";
import { IoHome } from "react-icons/io5";
import AuthInputs from "../../../components/inputFields/AuthInputs";
import { useLogin } from "./hook";
import { SpinnerButton } from "../../../components/Buttons/SpinnerButton";
import GeneralButton from "../../../components/Buttons/GeneralButton";

const Login = () => {
  const {
    loading,
    gButtonError,
    setGButtonError,
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
  } = useLogin();

  return (
    <section>
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
        <div className="w-full rounded-lg shadow-lg md:mt-0 sm:max-w-md xl:p-0 bg-c_color-colorOne ">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <div className="flex justify-between items-center">
              <h1 className="text-xl font-bold leading-tight tracking-tight">
                Sign in to your account
              </h1>
              <div className="flex justify-center items-center gap-3">
                {" "}
                <Link to={"/"}>
                  <IoHome />
                </Link>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
              <div>
                <AuthInputs
                  type="text"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="name@company.com"
                  label="Email"
                />
                {errors.email && touched.email && gButtonError && (
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
                {errors.password && touched.password && gButtonError && (
                  <p className="text-red-600">{errors.password}</p>
                )}
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      className="w-4 h-4 bg-[#b7e2e6] rounded focus:outline-none"
                    />
                  </div>
                  <br />
                  <div className="ml-3 text-sm">
                    <label htmlFor="remember">Remember me</label>
                  </div>
                </div>
                <Link
                  to={"/auth/forgot_password"}
                  className="text-sm font-medium  hover:underline  cursor-pointer"
                >
                  Forgot password?
                </Link>
              </div>
              {loading ? (
                <SpinnerButton status="Validating Data" />
              ) : (
                <GeneralButton type="submit" disabled={isSubmitting}>
                  Sign in
                </GeneralButton>
              )}
              <div
                className="flex gap-3"
                onClick={() => {
                  setGButtonError(false);
                }}
              >
                {/* <GoogleButton /> */}
              </div>
              <p className="text-sm font-light">
                Don’t have an account yet?{"    "}
                <Link
                  to="/auth/sign-up"
                  className="font-bold text-[16px] hover:underline"
                >
                  Sign up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
