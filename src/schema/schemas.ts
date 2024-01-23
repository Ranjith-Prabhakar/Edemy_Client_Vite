import * as yup from "yup" 

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/

export const loginSchema = yup.object().shape({
  email:yup.string().email("Please enter a valid Email").required("Please enter a valid Email"),
  // age:yup.number().positive().integer().required(),
  password:yup.string().min(5).matches(passwordRules,{message:"please create a strong password"}).required("please create a strong password"),
  // confirmPassword:yup.string().oneOf([yup.ref("password"),null],"password must match").required("required"),
})

export const signupSchema = yup.object().shape({
  name:yup.string().min(3).required("please fill the name field"),
  email:yup.string().email("please enter a valid email").required("please enter a valid email")
})