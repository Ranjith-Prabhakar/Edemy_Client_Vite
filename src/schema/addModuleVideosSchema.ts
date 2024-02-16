import * as yup from "yup";

const allowedVideoFileTypes = ["mp4", "avi", "mkv"];

export const addModueleVideosSchema = yup.object().shape({
  moduleNo: yup.number().required("Please enter valid module number"),
  moduleTittle: yup
    .string()
    .min(5)
    .required("Please enter valid module tittle"),
  videoNo: yup.number().required("Please enter valid module number"),
  videoTittle: yup
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
