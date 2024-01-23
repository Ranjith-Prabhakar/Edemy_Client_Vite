import React, { useState } from "react";

type Props = {};

const SignUp = (props: Props) => {
  const [name,setName] = useState('')
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [confirmPassword,setConfirmPassword] = useState('')
  
  return (
    <div>
      <form>
        <input onChange={(e)=>{setName(e.target.value)}} value={name} type="text" placeholder="name" />
        <br />
        <input onChange={(e)=>{setEmail(e.target.value)}} value={email} type="text" placeholder="email" />
        <br />
        <input onChange={(e)=>{setPassword(e.target.value)}} value={password} type="text" placeholder="password" />
        <br />
        <input onChange={(e)=>{setConfirmPassword(e.target.value)}} value={confirmPassword} type="text" placeholder="confirm-password" />
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
 
};

export default SignUp;

// import Link from "next/link";
// import React from "react";
// import { IoHome } from "react-icons/io5";
// import {signupSchema} from "../schemas/schemas"
// import {useFormik}  from "formik"

// type Props = {};

// const page = (props: Props) => {

//   const {values,errors,touched,isSubmitting,handleChange,handleBlur,handleSubmit}=useFormik({
//     initialValues:{
//       name:"",
//       email:"",
//       password:""
//     },
//     validationSchema:signupSchema,
//     onSubmit:(values,actions)=>{
//       console.log("submited")
//       actions.resetForm()
//     }
//   })
//   return (
//     <section className="bg-gray-50 dark:bg-gray-900">
//       <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
//         <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
//           <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
//             <div className="flex justify-between items-center">
//               <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
//                 Create an account
//               </h1>
//               <Link href={"/"}>
//                 <IoHome color={"#0D6EFD"} />
//               </Link>
//             </div>

//             <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
//               <div>
//                 <label
//                   htmlFor="name"
//                   className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//                 >
//                   Your name
//                 </label>
//                 <input
//                   type="text"
//                   name="name"
//                   id="name"
//                   className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                   placeholder="Tony stark"
//                   value={values.email}
//                   onChange={handleChange}
//                   onBlur={handleBlur}
//                 />
//                 {errors.name && touched.name &&
//                 <p className="text-red-600">please give a valid name</p>}
//               </div>
//               <div>
//                 <label
//                   htmlFor="email"
//                   className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//                 >
//                   Your email
//                 </label>
//                 <input
//                   type="email"
//                   name="email"
//                   id="email"
//                   className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                   placeholder="name@company.com"
//                   required
//                 />
//               </div>
//               <div>
//                 <label
//                   htmlFor="password"
//                   className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//                 >
//                   Password
//                 </label>
//                 <input
//                   type="password"
//                   name="password"
//                   id="password"
//                   placeholder="••••••••"
//                   className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                   required
//                 />
//               </div>
//               <div>
//                 <label
//                   htmlFor="confirm-password"
//                   className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//                 >
//                   Confirm password
//                 </label>
//                 <input
//                   type="confirm-password"
//                   name="confirm-password"
//                   id="confirm-password"
//                   placeholder="••••••••"
//                   className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                   required
//                 />
//               </div>
//               <div className="flex items-start">
//                 <div className="flex items-center h-5">
//                   <input
//                     id="terms"
//                     aria-describedby="terms"
//                     type="checkbox"
//                     className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
//                     required
//                   />
//                 </div>
//                 <div className="ml-3 text-sm">
//                   <label
//                     htmlFor="terms"
//                     className="font-light text-gray-500 dark:text-gray-300"
//                   >
//                     I accept the{" "}
//                     <a
//                       className="font-medium text-primary-600 hover:underline dark:text-primary-500"
//                       href="#"
//                     >
//                       Terms and Conditions
//                     </a>
//                   </label>
//                 </div>
//               </div>
//               <button
//                 type="submit"
//                 className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
//               >
//                 Create an account
//               </button>
//               <p className="text-sm font-light text-gray-500 dark:text-gray-400">
//                 Already have an account?{" "}
//                 <Link
//                   href="login"
//                   className="font-medium text-primary-600 hover:underline dark:text-primary-500"
//                 >
//                   Login here
//                 </Link>
//               </p>
//             </form>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default page;
