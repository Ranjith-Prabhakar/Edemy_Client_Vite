// import React, { useEffect, useState } from "react";
// import { useRegisterMutation } from "../redux/features/auth/authApi";
// import { useNavigate } from "react-router-dom";

// type Props = {};

// const SignUp = (props: Props) => {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const navigate = useNavigate();

//   const [register, { isError, data, error, isSuccess }] = useRegisterMutation();

//   useEffect(() => {
//     if (isSuccess) {
//       const message = data?.message || "Registration Successfull";
//       alert(message);
//       navigate("verification");
//     }
//     if (error) {
//       if ("data" in error) {
//         const errorData = error as any;
//         alert(errorData.data.message);
//       }
//     }
//   }, [isSuccess, error]);

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     const data = {
//       name,
//       email,
//       password,
//       confirmPassword,
//     };

//     await register(data);
//     console.log("first api----");
//   };

//   return (
//     <div>
//       <form onSubmit={handleSubmit}>
//         <input
//           onChange={(e) => {
//             setName(e.target.value);
//           }}
//           value={name}
//           type="text"
//           placeholder="name"
//         />
//         <br />
//         <input
//           onChange={(e) => {
//             setEmail(e.target.value);
//           }}
//           value={email}
//           type="text"
//           placeholder="email"
//         />
//         <br />
//         <input
//           onChange={(e) => {
//             setPassword(e.target.value);
//           }}
//           value={password}
//           type="text"
//           placeholder="password"
//         />
//         <br />
//         <input
//           onChange={(e) => {
//             setConfirmPassword(e.target.value);
//           }}
//           value={confirmPassword}
//           type="text"
//           placeholder="confirm-password"
//         />
//         <br />
//         <button type="submit">Submit</button>
//       </form>
//     </div>
//   );
// };

// export default SignUp;



import { Link } from "react-router-dom";
import { IoHome } from "react-icons/io5";
import { useFormik } from "formik";
import { signupSchema } from "../schema/schemas";
type Props = {};

const SignUp = (props: Props) => {
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
    onSubmit: (values, actions) => {
      console.log("submitted", values);
      actions.resetForm(); // after submission to clear the fields
    },
  });

  // console.log(values);
  console.log(errors);

  return (
    <section>
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-950 ">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <div className="flex justify-between items-center">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-[#030303]">
                Sign up to your account
              </h1>
              <Link to={"/"}>
                <IoHome color={"#FFd700"} className="dark:text-[#FFD700]" />
              </Link>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-[#FFd700]"
                >
                  Your name
                </label>
                <input
                  type="name"
                  name="name"
                  id="name"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur} // to check whether click on the field
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-[#e4d9a6]  dark:placeholder-gray-400 dark:text-white dark:focus:ring-[#FFD700] dark:focus:border-[#FFD700]"
                  placeholder="name@company.com"
                />
                {errors.name && touched.name && (
                  <p className="text-red-600">{errors.name}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-[#FFd700]"
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
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-[#e4d9a6]  dark:placeholder-gray-400 dark:text-white dark:focus:ring-[#FFD700] dark:focus:border-[#FFD700]"
                  placeholder="name@company.com"
                />
                {errors.email && touched.email && (
                  <p className="text-red-600">{errors.email}</p>
                )}
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-[#FFd700]"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-[#e4d9a6]  dark:placeholder-gray-400 dark:text-white dark:focus:ring-[#FFD700] dark:focus:border-[#FFD700]"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-[#FFd700]"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-[#e4d9a6]  dark:placeholder-gray-400 dark:text-white dark:focus:ring-[#FFD700] dark:focus:border-[#FFD700]"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-[#FFd700]"
                >
                  Confirm confirmPassword
                </label>
                <input
                  type="confirmPassword"
                  name="confirmPassword"
                  id="confirmPassword"
                  value={values.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-[#e4d9a6]  dark:placeholder-gray-400 dark:text-white dark:focus:ring-[#FFD700] dark:focus:border-[#FFD700]"
                  required
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-[#e4d9a6] dark:border-gray-600 dark:focus:ring-[#FFD700] dark:ring-offset-[#FFD700]"
                      required
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor="remember"
                      className="text-gray-500 dark:text-[#FFd700]"
                    >
                      Remember me
                    </label>
                  </div>
                </div>
                <a
                  href="#"
                  className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Forgot password?
                </a>
              </div>
              <button
                type="submit"
                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-[#FFd700] dark:hover:bg-[#fafd58] dark:focus:ring-[#FFd700] dark:text-black"
                disabled={isSubmitting} //
              >
                Sign in
              </button>

              <p className="text-sm font-light text-gray-500 dark:text-[#FFD700]">
                Don’t have an account yet?{" "}
                <Link
                  to="/sign-up"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
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

export default SignUp;
