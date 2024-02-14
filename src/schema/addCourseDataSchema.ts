import * as yup from "yup";


export const addCourseDataSchema = yup.object().shape({
  courseName: yup
    .string()
    .min(3)
    .required("Please enter a valid name"),

  discription: yup
    .string()
    .min(3)
    .required("Please enter a valid description"),
  tags: yup
    .string()
    .min(5)
    
    .required("Please enter valid Tags"),
  thumbnail: yup.string().required("Please enter valid thumbnail"),
  duration: yup.string().required("Please enter valid duration"),
 
});
