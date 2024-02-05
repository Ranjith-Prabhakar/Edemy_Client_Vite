import * as yup from "yup";
const stringRule: RegExp = /^[^\s]+(\s[^\s]+)*$/;

export const beInstructorSchema = yup.object().shape({
  qualification: yup
    .string()
    .min(3)
    .matches(stringRule, {
      message: "begining or end of a name shouldn`t be empty",
    })
    .required("Please fill the field"),
});
