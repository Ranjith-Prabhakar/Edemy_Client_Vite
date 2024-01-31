import * as yup from "yup";

const passwordRules: RegExp =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/;

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a valid Email")
    .required("Please enter a valid Email"),
  // age:yup.number().positive().integer().required(),
  password: yup
    .string()
    .min(8)
    .matches(passwordRules, { message: "please create a strong password" })
    .required("please create a strong password"),
  // confirmPassword:yup.string().oneOf([yup.ref("password"),null],"password must match").required("required"),
});

export const signupSchema = yup.object().shape({
  name: yup.string().min(3).required("please fill the name field"),
  email: yup
    .string()
    .email("please enter a valid email")
    .required("please enter a valid email"),
  password: yup
    .string()
    .min(8)
    .matches(passwordRules, { message: "please create a strong password" })
    .required("please create a strong password"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .min(8)
    .matches(passwordRules, { message: "Please create a strong password" })
    .required("Please create a strong password"),
});
