import * as yup from "yup";

const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const passwordRules: RegExp =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/;

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .matches(emailRegex, { message: "Please enter a valid email address" })
    .required("Please enter a valid email address"),
  password: yup
    .string()
    .min(8)
    .matches(passwordRules, { message: "Please create a strong password" })
    .required("Please create a strong password"),
});
// ------------------------------------------------------------------------------------------------
export const signupSchema = yup.object().shape({
  name: yup.string().min(3).required("Please fill the name field"),
  email: yup
    .string()
    .matches(emailRegex, { message: "Please enter a valid email address" })
    .required("Please enter a valid email address"),
  password: yup
    .string()
    .min(8)
    .matches(passwordRules, { message: "Please create a strong password" })
    .required("Please create a strong password"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .min(8)
    .matches(passwordRules, { message: "Please create a strong password" })
    .required("Please create a strong password"),
});
