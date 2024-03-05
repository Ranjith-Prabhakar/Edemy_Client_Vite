import * as yup from "yup";
// const stringRegex = /^[a-zA-Z\s]+$/;





export const addCourseDataSchema = yup.object().shape({
  courseName: yup
    .string()
    .required("Course name is required")
    .matches(
      /^(?! )[a-zA-Z0-9 _-]+(?<! )$/,
      "Only underscores (_) and hyphens (-) are allowed, and space at the beginning is not allowed"
    )
    .transform((value) => value.trim()) // Remove spaces
    .min(3),
  discription: yup
    .string()
    .required("Please enter a valid description")
    .matches(
      /^(?! )[a-zA-Z0-9 _-]+(?<! )$/,
      "Only underscores (_) and hyphens (-) are allowed, and space at the beginning is not allowed"
    )
    .transform((value) => value.trim()) // Remove spaces
    .min(3),
  tags: yup
    .string()
    .required("Please enter valid Tags")
    .matches(
      /^(?! )[a-zA-Z0-9_, -]+(?<! )$/,
      "Only commas (,), underscores (_), hyphens (-), alphanumeric characters, and spaces between words are allowed, and space at the beginning is not allowed"
    )
    .transform((value) => value.trim()) // Remove spaces
    .min(3),

  thumbnail: yup
    .string()
    .required("Please enter valid thumbnail")
    .matches(
      /\.(jpg|jpeg|png|gif|bmp)$/i,
      "Only image files with extensions jpg, jpeg, png, gif, or bmp are allowed"
    )
    .transform((value) => value.trim()) // Remove spaces
    .min(3),

  duration: yup
    .string()
    .required("Please enter valid duration")
    .matches(
      /^(?! )[a-zA-Z0-9 _-]+(?<! )$/,
      "Only underscores (_) and hyphens (-) are allowed, and space at the beginning is not allowed"
    )
    .transform((value) => value.trim()) // Remove spaces
    .min(2),
});
