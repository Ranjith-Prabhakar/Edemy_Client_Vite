import { Link } from "react-router-dom";
import { IoHome } from "react-icons/io5";
import { useSignUp } from "./hook";
import AuthInputs from "../../../components/inputFields/AuthInputs";
import { SpinnerButton } from "../../../components/Buttons/SpinnerButton";
import GeneralButton from "../../../components/Buttons/GeneralButton";

const SignUp = () => {
  const {
    isLoading,
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
  } = useSignUp();
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
                  label="Name"
                />
                {errors.name && touched.name && (
                  <p className="text-red-600">{errors.name}</p>
                )}
              </div>

              <div>
                <AuthInputs
                  type="email"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="johndoe@gmail.com"
                  label="Email"
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
              {isLoading ? (
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
