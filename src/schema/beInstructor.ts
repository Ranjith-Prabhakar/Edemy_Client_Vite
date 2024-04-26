import * as yup from "yup";

export const beInstructorSchema = yup.object().shape({
  qualification: yup
    .string()
    .min(3)
    .matches(
      /^[^\s]+(\s[^\s]+)*$/,
      "Beginning or end of a name shouldn't be empty"
    )
    .required("Please fill the field"),
  certificate: yup
    .mixed()
    .required("Certificate is required")
});
