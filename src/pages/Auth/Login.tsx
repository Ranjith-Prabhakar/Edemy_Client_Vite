import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { IoHome } from "react-icons/io5";
import { useFormik } from "formik";
import { loginSchema } from "../../schema/authSchema";
import { useLoginMutation } from "../../redux/features/auth/authApi";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import ThemeToggler from "../../components/utils/ThemeToggler";
import { ILoginRes } from "../../redux/interfaces/authApi";
import AuthInputs from "../../components/inputFields/AuthInputs";
import GeneralButton from "../../components/Buttons/GeneralButton";
import { SpinnerButton } from "../../components/Buttons/SpinnerButton";

const Login = () => {
  const navigate = useNavigate();
  const [login, { isSuccess, isLoading, isError, error }] = useLoginMutation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isSuccess) {
      setLoading(false);
      toast.success("user logged in successfully");
      navigate("/");
    } else if (isLoading) {
      setLoading(true);
      toast.loading;
    } else if (isError && error) {
      setLoading(false);
      if ("data" in error) {
        if (error.data) {
          const dataType = error.data as ILoginRes;
          toast.error(dataType.message);
        }
      }
    }
  }, [isSuccess, isLoading, isError, error, navigate]);

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
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: async (values, actions) => {
      await login({ email: values.email, password: values.password });
      actions.resetForm();
    },
  });

  return (
    <section>
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow-lg md:mt-0 sm:max-w-md xl:p-0 dark:bg-c_color-colorOne ">
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
                <ThemeToggler />
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
              <div>
                <AuthInputs
                  type="email"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur} // to check whether click on the field
                  placeholder="name@company.com"
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
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      className="w-4 h-4 dark:bg-[#b7e2e6] rounded focus:outline-none"
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
                <GeneralButton
                  type="submit"
                  disabled={isSubmitting} //
                >
                  Sign in
                </GeneralButton>
              )}
              <div className="flex gap-3">
                <GeneralButton>
                  <p className="inline">
                    Login with
                    <span>
                      <FcGoogle className="inline ms-2" size={25} />
                    </span>
                  </p>
                </GeneralButton>
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

// =====================================================
// import { useNavigate } from "react-router-dom";
// import { Link } from "react-router-dom";
// import { FcGoogle } from "react-icons/fc";
// import { IoHome } from "react-icons/io5";
// import { useFormik } from "formik";
// import { loginSchema } from "../../schema/authSchema";
// import { useLoginMutation } from "../../redux/features/auth/authApi";
// import { useEffect } from "react";
// import toast from "react-hot-toast";
// import ThemeToggler from "../../components/utils/ThemeToggler";
// import { ILoginRes } from "../../redux/interfaces/authApi";
// // import { useSelector } from "react-redux";
// // import { IUserState } from "../../redux/features/auth/authSlice";

// const Login = () => {
//   // const userData = useSelector((state: IUserState) => state.user.userData);
//   const navigate = useNavigate();
//   const [login, { isSuccess, isLoading, isError, error }] = useLoginMutation();
//   // useEffect(() => {
//   //   if (userData.name) {
//   //     navigate("/");
//   //   }
//   // }, [userData]);

//   useEffect(() => {
//     if (isSuccess) {
//       toast.success("user logged in successfully");
//       navigate("/");
//     } else if (isLoading) {
//       toast.loading;
//     }
//     // else if (isError) {
//     //   if (error?.data) {
//     //     toast.error(error?.data?.message);
//     //   }
//     // }
//     else if (isError && error) {
//       if ("data" in error) {
//         if (error.data) {
//           const dataType = error.data as ILoginRes;
//           toast.error(dataType.message);
//         }
//       }
//     }
//   }, [isSuccess, isLoading, isError]);

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
//       email: "",
//       password: "",
//     },
//     validationSchema: loginSchema,
//     onSubmit: async (values, actions) => {
//       await login({ email: values.email, password: values.password });
//       actions.resetForm();
//     },
//   });

//   return (
//     <section>
//       <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
//         <div className="w-full bg-white rounded-lg shadow-lg md:mt-0 sm:max-w-md xl:p-0 dark:bg-[#063134] ">
//           <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
//             <div className="flex justify-between items-center">
//               <h1 className="text-xl font-bold leading-tight tracking-tight">
//                 Sign in to your account
//               </h1>
//               <div className="flex justify-center items-center gap-3">
//                 {" "}
//                 <Link to={"/"}>
//                   <IoHome />
//                 </Link>
//                 <ThemeToggler />
//               </div>
//             </div>

//             <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
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
//                   className="bg-gray-50 border border-gray-300 text-black dark:text-black sm:text-sm rounded-lg focus:ring-[#69D3DC] focus:border-[#69D3DC] block w-full p-2.5 dark:bg-[#b7e2e6]  dark:placeholder-gray-400   "
//                   placeholder="name@company.com"
//                 />
//                 {errors.email && touched.email && (
//                   <p className="text-red-600">{errors.email}</p>
//                 )}
//               </div>
//               <div>
//                 <label
//                   htmlFor="password"
//                   className="block mb-2 text-sm font-medium "
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
//                   className="bg-gray-50 border border-gray-300 text-black dark:text-black sm:text-sm rounded-lg focus:ring-[#69D3DC] focus:border-[#69D3DC] block w-full p-2.5 dark:bg-[#b7e2e6]  dark:placeholder-gray-400   "
//                 />
//                 {errors.password && touched.password && (
//                   <p className="text-red-600">{errors.password}</p>
//                 )}
//               </div>
//               <div className="flex items-center justify-between">
//                 <div className="flex items-start">
//                   <div className="flex items-center h-5">
//                     <input
//                       id="remember"
//                       aria-describedby="remember"
//                       type="checkbox"
//                       className="w-4 h-4 dark:bg-[#b7e2e6] rounded focus:outline-none"
//                     />
//                   </div>
//                   <br />
//                   <div className="ml-3 text-sm">
//                     <label htmlFor="remember">Remember me</label>
//                   </div>
//                 </div>
//                 <Link
//                   to={"/forgot_password"}
//                   className="text-sm font-medium  hover:underline  cursor-pointer"
//                 >
//                   Forgot password?
//                 </Link>
//               </div>
//               <button
//                 type="submit"
//                 className="w-full focus:ring-1 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-[#008E80] dark:hover:bg-[#009B7D] "
//                 disabled={isSubmitting} //
//               >
//                 Sign in
//               </button>

//               <div className="flex gap-3">
//                 <button className="w-full focus:ring-1 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-[#008E80] dark:hover:bg-[#009B7D] ">
//                   <p className="inline">
//                     Login with
//                     <span>
//                       <FcGoogle className="inline ms-2" size={25} />
//                     </span>
//                   </p>
//                 </button>
//               </div>

//               <p className="text-sm font-light">
//                 Don’t have an account yet?{"    "}
//                 <Link
//                   to="/sign-up"
//                   className="font-bold text-[16px] hover:underline"
//                 >
//                   Sign up
//                 </Link>
//               </p>
//             </form>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Login;
