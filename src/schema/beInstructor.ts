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
    // .test(
    //   "fileFormat",
    //   "Only image (jpeg, png) or PDF files are allowed",
    //   (value) => {
    //     if (!value) {
    //       return true; // No file provided, let the 'required' validation handle it
    //     }

    //     // Check if the file type is in the allowed formats
    //     const isValidFormat =
    //       typeof value === "object" &&
    //       "name" in value &&
    //       ["image/jpeg", "image/png", "application/pdf"].some((format) =>
    //         value.name.toLowerCase().endsWith(format.split("/")[1])
    //       );

    //     return isValidFormat;
    //   }
    // ),
});
