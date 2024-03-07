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
    .test(
      "fileFormat",
      "Only image (jpeg, png) or PDF files are allowed",
      (value: unknown) => {
        // Explicitly define the type of 'value' as 'any'
        if (!value) {
          return true; // No file provided, let the 'required' validation handle it
        }

        const allowedFormats = ["image/jpeg", "image/png", "application/pdf"];
        return allowedFormats.includes((value as File).type); // Use type assertion to access 'type' property
      }
    ),
});
