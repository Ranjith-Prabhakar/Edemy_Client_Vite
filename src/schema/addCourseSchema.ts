import * as yup from "yup";

const stringRule: RegExp = /^[^\s]+(\s[^\s]+)*$/;
const allowedVideoFileTypes = ["mp4", "avi", "mkv"]; 

export const addCourseSchema = yup.object().shape({
  courseName: yup
    .string()
    .min(3)
    .test(
      "string-rule",
      "Custom validation message for stringRule",
      function (value) {
        return value !== undefined && stringRule.test(value);
      }
    )
    .required("Please enter a valid name"),

  discription: yup
    .string()
    .min(3)
    .test(
      "string-rule",
      "Custom validation message for stringRule",
      function (value) {
        return value !== undefined && stringRule.test(value);
      }
    )
    .required("Please enter a valid description"),
  tags: yup
    .string()
    .min(5)
    .test(
      "string-rule",
      "Custom validation message for stringRule",
      function (value) {
        return value !== undefined && stringRule.test(value);
      }
    )
    .required("Please enter valid Tags"),
  thumbnail: yup.string().required("Please enter valid thumbnail"),
  duration: yup.string().required("Please enter valid duration"),
  moduleNo: yup.number().min(2).required("Please enter valid module number"),
  moduleTittle: yup
    .string()
    .min(5)
    .test(
      "string-rule",
      "Custom validation message for stringRule",
      function (value) {
        return value !== undefined && stringRule.test(value);
      }
    )
    .required("Please enter valid module tittle"),
  moduleVideo: yup
    .mixed()
    .test(
      "file-type",
      "Invalid file type. Allowed types: mp4, avi, mkv",
      (value) => {
        if (!value) return true; // If no file is provided, skip the validation
        const fileExtension = (value as string).split(".").pop();
        return (
          typeof fileExtension === "string" &&
          allowedVideoFileTypes.includes(fileExtension.toLowerCase())
        );
      }
    )
    .required("Please enter valid module file"),
});
