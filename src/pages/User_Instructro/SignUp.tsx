import { Link, useNavigate } from "react-router-dom";
import { IoHome } from "react-icons/io5";
import { useFormik } from "formik";
import { signupSchema } from "../../schema/authSchema";
import { SpinnerButton } from "../../components/Buttons/SpinnerButton";

import { useRegisterMutation } from "../../redux/features/auth/authApi";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import ThemeToggler from "../../components/utils/ThemeToggler";
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
        actions.resetForm(); // after submission to clear the fields
      } catch (error: unknown) {
        catchError(error);
      }
    },
  });

  return (
    <section>
      <div className="flex flex-col  items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
        <div className="w-full py-5 bg-white rounded-lg shadow-lg md:mt-0 sm:max-w-md xl:p-0 dark:bg-[#063134] ">
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
                <ThemeToggler />
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-2 md:space-y-2">
              <div>
                <AuthInputs
                  type="text"
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur} // to check whether click on the field
                  placeholder="John Doe"
                  label="Your name"
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
                  onBlur={handleBlur} // to check whether click on the field
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
                <GeneralButton
                  type="submit"
                  disabled={isSubmitting} //
                >
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

// import { Link, useNavigate } from "react-router-dom";
// import { IoHome } from "react-icons/io5";
// import { useFormik } from "formik";
// import { signupSchema } from "../../schema/authSchema";
// import { SpinnerButton } from "../../components/Buttons/SpinnerButton";

// import { useRegisterMutation } from "../../redux/features/auth/authApi";
// import { useEffect, useState } from "react";
// import toast from "react-hot-toast";
// import ThemeToggler from "../../components/utils/ThemeToggler";
// import { RegistrationRes } from "../../redux/interfaces/authApi";
// import { catchError } from "../../utils/catchError";

// const SignUp = () => {
//   const [register, { isSuccess, isError, error, isLoading }] =
//     useRegisterMutation();
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     if (isLoading) {
//       setLoading(true);
//     } else if (isSuccess) {
//       setLoading(false);
//       toast.success("otp has been sent to your mail");
//       navigate("/otp_verification", { state: { fromSignup: true } });
//     } else if (isError && error) {
//       setLoading(false);
//       if ("data" in error) {
//         if (error.data) {
//           const dataType = error.data as RegistrationRes;
//           toast.error(dataType.message);
//         }
//       }
//     }
//   }, [isSuccess, isError, error, isLoading]);

//   const {
//     values,
//     errors,
//     touched,
//     isSubmitting,
//     handleChange,
//     handleBlur,
//     handleSubmit,
//   } = useFormik({
//     initialValues: {
//       name: "",
//       email: "",
//       password: "",
//       confirmPassword: "",
//     },
//     validationSchema: signupSchema,
//     onSubmit: async (values, actions) => {
//       try {
//         await register({
//           name: values.name,
//           email: values.email,
//           password: values.password,
//           confirmPassword: values.confirmPassword,
//         });
//         actions.resetForm(); // after submission to clear the fields
//       } catch (error: unknown) {
//         catchError(error);
//       }
//     },
//   });

//   return (
//     <section>
//       <div className="flex flex-col  items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
//         <div className="w-full py-5 bg-white rounded-lg shadow-lg md:mt-0 sm:max-w-md xl:p-0 dark:bg-[#063134] ">
//           <div className=" sm:p-8">
//             <div className="flex justify-between items-center">
//               <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl  mb-4">
//                 Sign up to your account
//               </h1>
//               <div className="flex justify-center items-center gap-3">
//                 {" "}
//                 <Link to={"/"}>
//                   <IoHome />
//                 </Link>
//                 <ThemeToggler />
//               </div>
//             </div>

//             <form onSubmit={handleSubmit} className="space-y-1 md:space-y-2">
//               <div>
//                 <label
//                   htmlFor="name"
//                   className="block mb-2 text-sm font-medium"
//                 >
//                   Your name
//                 </label>
//                 <input
//                   type="text"
//                   name="name"
//                   id="name"
//                   value={values.name}
//                   onChange={handleChange}
//                   onBlur={handleBlur} // to check whether click on the field
//                   className="bg-gray-50 border border-gray-300 text-black dark:text-black sm:text-sm rounded-lg focus:ring-[#69D3DC] focus:border-[#69D3DC] block w-full p-2.5 dark:bg-[#b7e2e6]  dark:placeholder-gray-400   "
//                   placeholder="name@company.com"
//                 />
//                 {errors.name && touched.name && (
//                   <p className="text-red-600">{errors.name}</p>
//                 )}
//               </div>

//               <div>
//                 <label
//                   htmlFor="email"
//                   className="block mb-2 text-sm font-medium"
//                 >
//                   Your email
//                 </label>
//                 <input
//                   type="email"
//                   name="email"
//                   id="email"
//                   value={values.email}
//                   onChange={handleChange}
//                   onBlur={handleBlur} // to check whether click on the field
//                   className="bg-gray-50 border border-gray-300 text-black sm:text-sm rounded-lg focus:ring-[#69D3DC] focus:border-[#69D3DC] block w-full p-2.5 dark:bg-[#b7e2e6]  dark:placeholder-gray-400"
//                   placeholder="name@company.com"
//                 />
//                 {errors.email && touched.email && (
//                   <p className="text-red-600">{errors.email}</p>
//                 )}
//               </div>
//               <div>
//                 <label
//                   htmlFor="password"
//                   className="block mb-2 text-sm font-medium"
//                 >
//                   Password
//                 </label>
//                 <input
//                   type="password"
//                   name="password"
//                   id="password"
//                   value={values.password}
//                   onChange={handleChange}
//                   onBlur={handleBlur}
//                   placeholder="••••••••"
//                   className="bg-gray-50 border border-gray-300 text-black sm:text-sm rounded-lg focus:ring-[#69D3DC] focus:border-[#69D3DC] block w-full p-2.5 dark:bg-[#b7e2e6]  dark:placeholder-gray-400"
//                 />
//                 {errors.password && touched.password && (
//                   <p className="text-red-600">{errors.password}</p>
//                 )}
//               </div>
//               <div>
//                 <label
//                   htmlFor="confirmPassword"
//                   className="block mb-2 text-sm font-medium"
//                 >
//                   Confirm Password
//                 </label>
//                 <input
//                   type="password"
//                   name="confirmPassword"
//                   id="confirmPassword"
//                   value={values.confirmPassword}
//                   onChange={handleChange}
//                   onBlur={handleBlur}
//                   placeholder="••••••••"
//                   className="bg-gray-50 border border-gray-300 text-black sm:text-sm rounded-lg focus:ring-[#69D3DC] focus:border-[#69D3DC] block w-full p-2.5 dark:bg-[#b7e2e6]  dark:placeholder-gray-400"
//                 />
//                 {errors.confirmPassword && touched.confirmPassword && (
//                   <p className="text-red-600">{errors.confirmPassword}</p>
//                 )}
//               </div>
//               {loading ? (
//                 <SpinnerButton status="Validating Data" />
//               ) : (
//                 <button
//                   type="submit"
//                   className="w-full focus:ring-1 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-[#008E80] dark:hover:bg-[#009B7D] "
//                   disabled={isSubmitting} //
//                 >
//                   Sign in
//                 </button>
//               )}

//               <p className="text-sm font-light">
//                 Don’t have an account yet?{" "}
//                 <Link
//                   to="/Login"
//                   className="font-bold text-[16px] hover:underline"
//                 >
//                   Log in
//                 </Link>
//               </p>
//             </form>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default SignUp;
