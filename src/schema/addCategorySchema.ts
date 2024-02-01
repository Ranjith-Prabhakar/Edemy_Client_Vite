import * as yup from "yup";

const stringRegex = /^[a-zA-Z\s]+$/;

export const addCategoryValidation = yup.object().shape({
  category: yup
    .string()
    .matches(stringRegex, "Invalid characters")
    .min(3)
    .required("Please enter a valid category"),
});
