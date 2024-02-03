import * as yup from "yup";

const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const forgotPasswordEmailSchema = yup.object().shape({
  email: yup
    .string()
    .matches(emailRegex, { message: "Please enter a valid email address" })
    .required("Please enter a valid email address"),
});
