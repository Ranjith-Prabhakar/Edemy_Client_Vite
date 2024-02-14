import { useEffect, useRef, useState } from "react";
import { useFormik } from "formik";
import { addCourseDataSchema } from "../../../schema/addCourseDataSchema";
import { FaArrowRightLong } from "react-icons/fa6";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useSelector } from "react-redux";
import AddModuleVideos from "./AddModuleVideos";
import {
  useAddModuleMutation,
  useAddToBucketMutation,
} from "../../../redux/features/course/courseApi";
type Props = {
  setStepper: React.Dispatch<React.SetStateAction<number>>;
  setCoursesList: React.Dispatch<
    React.SetStateAction<
      {
        [key: string]: string | number;
      }[]
    >
  >;
  stepper: number;
};

const AddCourseData = ({ setStepper, setCoursesList, stepper }: Props) => {
  const [addModule] = useAddModuleMutation();
  const [addToBucket] = useAddToBucketMutation();

  const userId = useSelector((state: any) => state.user.userData._id);

  useEffect(() => {
    // if refresh meanwhile adding course but uploaded several modules to bucket
    let courses = localStorage.getItem("moduleVideos");
    if (courses) {
      let parsedCourse = JSON.parse(courses);
      if (parsedCourse) {
        let courseList = parsedCourse.map((item: string, index: number) => {
          console.log("item", item.split("-").shift());
          return {
            moduleNo: ++index,
            moduleName: item.split("-").shift(),
          };
        });
        setCoursesList(courseList);
      }
    }
  }, []);

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
  } = useFormik({
    initialValues: {
      courseName: "",
      discription: "",
      tags: "",
      thumbnail: "",
      duration: "",
      // moduleNo: "",
      // moduleTittle: "",
      // moduleVideo: "",
    },
    validationSchema: addCourseDataSchema,
    onSubmit: (values, actions) => {
      const clonedObject: { [key: string]: string | undefined } =
        Object.create(null); // to clone an object without the prototype chaining

      for (const key in values) {
        if (Object.prototype.hasOwnProperty.call(values, key)) {
          clonedObject[key] = values[key as keyof typeof values] as
            | string
            | undefined;
        }
      }
    },
  });

  const handleAddModule = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    try {
      const fileInput = moduleVideoRef.current;
      if (fileInput && fileInput.files && fileInput.files.length > 0) {
        const fileType = fileInput.files[0].name.split(".").pop();

        const moduleFileName =
          (moduleNameRef.current?.value as string) + "-" + Date.now();
        const result = await addModule({
          fileName: `${moduleFileName}.${fileType}`,
          userId: userId,
          contentType: `video/${fileType}`,
        });

        await addToBucket({
          url: result?.data,
          body: fileInput.files[0],
          contentType: fileType as string,
        });

        const localStorageVideos = localStorage.getItem("moduleVideos");
        if (!localStorageVideos) {
          const moduleVideos = [`${moduleFileName}.${fileType}`];
          localStorage.setItem("moduleVideos", JSON.stringify(moduleVideos));
        } else {
          let dataFromLocalStorage = JSON.parse(localStorageVideos);
          dataFromLocalStorage.push(`${moduleFileName}.${fileType}`);
          localStorage.setItem(
            "moduleVideos",
            JSON.stringify(dataFromLocalStorage)
          );
        }
        setCoursesList([
          ...coursesList,
          {
            moduleNo: ++coursesList.length,
            moduleName: moduleNameRef.current?.value as string,
          },
        ]);
        setFieldValue("moduleNo", "");
        setFieldValue("moduleTittle", "");
        setFieldValue("moduleVideo", "");
      } else {
        console.error("No file selected");
      }
    } catch (error: any) {
      console.log(error?.message);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="w-full">
        {stepper === 1 && (
          <>
            <div className="relative z-0 w-full mb-5 group">
              <input
                // ref={courseNameRef}
                type="text"
                name="courseName"
                id="courseName"
                value={values.courseName}
                onChange={handleChange}
                onBlur={handleBlur}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
              {errors.courseName && touched.courseName && (
                <p className="text-red-600">{errors.courseName}</p>
              )}
              <label
                htmlFor="courseName"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Course Name
              </label>
            </div>

            <div className="relative z-0 w-full mb-5 group">
              <textarea
                // ref={descriptionRef}
                name="discription"
                id="discription"
                value={values.discription}
                onChange={handleChange}
                onBlur={handleBlur}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
              {errors.discription && touched.discription && (
                <p className="text-red-600">{errors.discription}</p>
              )}
              <label
                htmlFor="discription"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Description
              </label>
            </div>

            <div className="relative z-0 w-full mb-5 group">
              <input
                // ref={tagsRef}
                type="text"
                name="tags"
                id="tags"
                value={values.tags}
                onChange={handleChange}
                onBlur={handleBlur}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
              {errors.tags && touched.tags && (
                <p className="text-red-600">{errors.tags}</p>
              )}
              <label
                htmlFor="tags"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Tags
              </label>
            </div>

            <div className="relative z-0 w-full mb-5 group">
              <label
                htmlFor="thumbnail"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Thumbnail
              </label>
              <input
                // ref={thumbnailRef}
                type="file"
                name="thumbnail"
                id="thumbnail"
                // value={values.thumbnail}
                onChange={handleChange}
                onBlur={handleBlur}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
              {errors.thumbnail && touched.thumbnail && (
                <p className="text-red-600">{errors.thumbnail}</p>
              )}
            </div>

            <div className="relative z-0 w-full mb-5 group">
              <input
                // ref={duraitonRef}
                type="time"
                name="duration"
                id="duration"
                value={values.duration}
                onChange={handleChange}
                onBlur={handleBlur}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
              {errors.duration && touched.duration && (
                <p className="text-red-600">{errors.duration}</p>
              )}
              <label
                htmlFor="duration"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Duration
              </label>
            </div>
          </>
        )}

        {stepper === 2 && (
          <>
            <AddModuleVideos />
          </>
        )}
        {/* {stepper === 3 && (
            <>
              <div className="bg-gray-900 h-[380px] rounded-lg">
                By submitting your course, you acknowledge and agree to the
                following terms and policies set forth by Edemy: Authenticity of
                Contents: You certify that all course contents uploaded to Edemy
                are authentic and not forged. Misrepresentation of content is
                strictly prohibited. Ownership Transfer: Uploading a course
                implies the transfer of ownership to Edemy. By submitting your
                course, you grant Edemy the right to host, distribute, and
                modify the content as necessary for the platform. Exclusive
                Platform Rights: You agree that the same course uploaded on
                Edemy shall not be uploaded to any other online learning
                platform. Any violation of this term will be considered a
                punishable offense. Quality Standards: Courses must adhere to
                Edemy's quality standards. Edemy reserves the right to review
                and, if necessary, request improvements to maintain a
                high-quality learning experience for users. Honest
                Representation: All information provided about the course,
                including but not limited to its title, description, and
                metadata, must be accurate and representative of the actual
                content. Compliance with Laws: You commit to complying with all
                applicable laws and regulations related to the creation and
                distribution of educational content. Infringement and
                Plagiarism: Courses must not infringe on the intellectual
                property rights of others. Plagiarism or unauthorized use of
                copyrighted material is strictly prohibited. Communication
                Standards: Users engaging with the course material should be
                treated with respect. Any form of harassment, discrimination, or
                inappropriate communication is not tolerated. Security Measures:
                You are responsible for implementing appropriate security
                measures to protect sensitive information shared within the
                course content. Termination of Agreement: Edemy reserves the
                right to terminate the agreement and remove any course that
                violates these terms and policies without prior notice. By
                submitting your course to Edemy, you affirm your understanding
                and acceptance of these terms and policies. Edemy may update
                these terms periodically, and it is your responsibility to stay
                informed of any changes.
              </div>
            </>
          )} */}

        <div className="flex gap-2 justify-between items-center">
          {stepper === 1 && (
            <button
              className="bg-slate-500 px-3 py-1 w-20 rounded-sm text-black flex justify-center items-center"
              onClick={(e) => {
                handleNext(e);
              }}
            >
              <FaArrowRightLong />
            </button>
          )}
          {stepper === 2 && (
            <>
              <div className="flex gap-2">
                <button
                  className="bg-slate-500 px-3 py-1 w-20 rounded-sm text-black flex justify-center items-center"
                  onClick={(e) => {
                    handlePrev(e);
                  }}
                >
                  <FaArrowLeftLong />
                </button>

                <button
                  className="bg-slate-500 px-3 py-1 w-20 rounded-sm text-black flex justify-center items-center"
                  onClick={(e) => {
                    handleNext(e);
                  }}
                >
                  <FaArrowRightLong />
                </button>
              </div>
              <button
                type="button"
                className="bg-slate-500 px-3 py-1 w-20 rounded-sm text-black"
                onClick={(e) => {
                  handleAddModule(e);
                }}
              >
                Add
              </button>
            </>
          )}
          {stepper === 3 && (
            <>
              <button
                className="bg-slate-500 px-3 py-1 w-20 rounded-sm text-black flex justify-center items-center"
                onClick={(e) => {
                  handlePrev(e);
                }}
              >
                <FaArrowLeftLong />
              </button>

              <button
                className="bg-slate-500 px-3 py-1 w-20 rounded-sm text-black flex justify-center items-center"
                type="submit"
              >
                Submit
              </button>
            </>
          )}
        </div>
      </form>
    </>
  );
};

export default AddCourseData;

// ***********************************************************************

// import { useEffect, useRef, useState } from "react";
// import { useFormik } from "formik";
// import { addCourseSchema } from "../../../schema/addCourseDataSchema";
// import { FaArrowRightLong } from "react-icons/fa6";
// import { FaArrowLeftLong } from "react-icons/fa6";
// import { useSelector } from "react-redux";
// import {
//   useAddModuleMutation,
//   useAddToBucketMutation,
// } from "../../../redux/features/course/courseApi";
// type Props = {};

// const AddCourse = (props: Props) => {
//   const [stepper, setStepper] = useState(1);
//   const [addModule] = useAddModuleMutation();
//   const [addToBucket] = useAddToBucketMutation();
//    const moduleVideoRef = useRef<HTMLInputElement>(null);
//   const moduleNameRef = useRef<HTMLInputElement>(null);

//   const userId = useSelector((state: any) => state.user.userData._id);
//   const [coursesList, setCoursesList] = useState<
//     Array<{ [key: string]: string | number }>
//   >([]);

//   useEffect(() => {
//     // if refresh meanwhile adding course but uploaded several modules to bucket
//     let courses = localStorage.getItem("moduleVideos");
//     if (courses) {
//       let parsedCourse = JSON.parse(courses);
//       if (parsedCourse) {
//         let courseList = parsedCourse.map((item: string, index: number) => {
//           console.log("item", item.split("-").shift());
//           return {
//             moduleNo: ++index,
//             moduleName: item.split("-").shift(),
//           };
//         });
//         setCoursesList(courseList);
//       }
//     }
//   }, []);

//   const {
//     values,
//     errors,
//     touched,
//     handleChange,
//     handleBlur,
//     handleSubmit,
//     setFieldValue,
//   } = useFormik({
//     initialValues: {
//       courseName: "",
//       discription: "",
//       tags: "",
//       thumbnail: "",
//       duration: "",
//       moduleNo: "",
//       moduleTittle: "",
//       moduleVideo: "",
//     },
//     validationSchema: addCourseSchema,
//     onSubmit: (values, actions) => {
//       const clonedObject: { [key: string]: string | undefined } =
//         Object.create(null); // to clone an object without the prototype chaining

//       for (const key in values) {
//         if (Object.prototype.hasOwnProperty.call(values, key)) {
//           clonedObject[key] = values[key as keyof typeof values] as
//             | string
//             | undefined;
//         }
//       }

//     },
//   });

//   const handleNext = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
//     e.preventDefault();
//     if (stepper < 3) {
//       setStepper((prevState) => prevState + 1);
//     }
//   };

//   const handlePrev = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
//     e.preventDefault();
//     if (stepper > 1) {
//       setStepper((prevState) => prevState - 1);
//     }
//   };

//   const handleAddModule = async (
//     e: React.MouseEvent<HTMLButtonElement, MouseEvent>
//   ) => {
//     e.preventDefault();
//     try {
//       const fileInput = moduleVideoRef.current;
//       if (fileInput && fileInput.files && fileInput.files.length > 0) {
//         const fileType = fileInput.files[0].name.split(".").pop();

//         const moduleFileName =
//           (moduleNameRef.current?.value as string) + "-" + Date.now();
//         const result = await addModule({
//           fileName: `${moduleFileName}.${fileType}`,
//           userId: userId,
//           contentType: `video/${fileType}`,
//         });

//         await addToBucket({
//           url: result?.data,
//           body: fileInput.files[0],
//           contentType: fileType as string,
//         });

//         const localStorageVideos = localStorage.getItem("moduleVideos");
//         if (!localStorageVideos) {
//           const moduleVideos = [`${moduleFileName}.${fileType}`];
//           localStorage.setItem("moduleVideos", JSON.stringify(moduleVideos));
//         } else {
//           let dataFromLocalStorage = JSON.parse(localStorageVideos);
//           dataFromLocalStorage.push(`${moduleFileName}.${fileType}`);
//           localStorage.setItem(
//             "moduleVideos",
//             JSON.stringify(dataFromLocalStorage)
//           );
//         }
//         setCoursesList([
//           ...coursesList,
//           {
//             moduleNo: ++coursesList.length,
//             moduleName: moduleNameRef.current?.value as string,
//           },
//         ]);
//         setFieldValue("moduleNo", "");
//         setFieldValue("moduleTittle", "");
//         setFieldValue("moduleVideo", "");
//       } else {
//         console.error("No file selected");
//       }
//     } catch (error: any) {
//       console.log(error?.message);
//     }
//   };

//   return (
//     <div className="flex p-3 flex-wrap h-full">
//       <div className="flex-auto ">
//         <form onSubmit={handleSubmit} className="w-full">
//           {stepper === 1 && (
//             <>
//               <div className="relative z-0 w-full mb-5 group">
//                 <input
//                   // ref={courseNameRef}
//                   type="text"
//                   name="courseName"
//                   id="courseName"
//                   value={values.courseName}
//                   onChange={handleChange}
//                   onBlur={handleBlur}
//                   className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
//                   placeholder=" "
//                   required
//                 />
//                 {errors.courseName && touched.courseName && (
//                   <p className="text-red-600">{errors.courseName}</p>
//                 )}
//                 <label
//                   htmlFor="courseName"
//                   className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
//                 >
//                   Course Name
//                 </label>
//               </div>

//               <div className="relative z-0 w-full mb-5 group">
//                 <textarea
//                   // ref={descriptionRef}
//                   name="discription"
//                   id="discription"
//                   value={values.discription}
//                   onChange={handleChange}
//                   onBlur={handleBlur}
//                   className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
//                   placeholder=" "
//                   required
//                 />
//                 {errors.discription && touched.discription && (
//                   <p className="text-red-600">{errors.discription}</p>
//                 )}
//                 <label
//                   htmlFor="discription"
//                   className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
//                 >
//                   Description
//                 </label>
//               </div>

//               <div className="relative z-0 w-full mb-5 group">
//                 <input
//                   // ref={tagsRef}
//                   type="text"
//                   name="tags"
//                   id="tags"
//                   value={values.tags}
//                   onChange={handleChange}
//                   onBlur={handleBlur}
//                   className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
//                   placeholder=" "
//                   required
//                 />
//                 {errors.tags && touched.tags && (
//                   <p className="text-red-600">{errors.tags}</p>
//                 )}
//                 <label
//                   htmlFor="tags"
//                   className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
//                 >
//                   Tags
//                 </label>
//               </div>

//               <div className="relative z-0 w-full mb-5 group">
//                 <label
//                   htmlFor="thumbnail"
//                   className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
//                 >
//                   Thumbnail
//                 </label>
//                 <input
//                   // ref={thumbnailRef}
//                   type="file"
//                   name="thumbnail"
//                   id="thumbnail"
//                   // value={values.thumbnail}
//                   onChange={handleChange}
//                   onBlur={handleBlur}
//                   className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
//                   placeholder=" "
//                   required
//                 />
//                 {errors.thumbnail && touched.thumbnail && (
//                   <p className="text-red-600">{errors.thumbnail}</p>
//                 )}
//               </div>

//               <div className="relative z-0 w-full mb-5 group">
//                 <input
//                   // ref={duraitonRef}
//                   type="time"
//                   name="duration"
//                   id="duration"
//                   value={values.duration}
//                   onChange={handleChange}
//                   onBlur={handleBlur}
//                   className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
//                   placeholder=" "
//                   required
//                 />
//                 {errors.duration && touched.duration && (
//                   <p className="text-red-600">{errors.duration}</p>
//                 )}
//                 <label
//                   htmlFor="duration"
//                   className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
//                 >
//                   Duration
//                 </label>
//               </div>
//             </>
//           )}

//           {stepper === 2 && (
//             <>
//               <div className="relative z-0 w-full mb-5 group">
//                 <label
//                   htmlFor="moduleNo"
//                   className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
//                 >
//                   Module No
//                 </label>
//                 <input
//                   // ref={moduleNoRef}
//                   type="number"
//                   name="moduleNo"
//                   id="moduleNo"
//                   value={values.moduleNo}
//                   onChange={handleChange}
//                   onBlur={handleBlur}
//                   className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
//                   placeholder=" "
//                   required
//                 />
//                 {errors.moduleNo && touched.moduleNo && (
//                   <p className="text-red-600">{errors.moduleNo}</p>
//                 )}
//               </div>

//               <div className="relative z-0 w-full mb-5 group">
//                 <label
//                   htmlFor="moduleTittle"
//                   className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
//                 >
//                   Module Tittle
//                 </label>
//                 <input
//                   ref={moduleNameRef}
//                   type="text"
//                   name="moduleTittle"
//                   id="moduleTittle"
//                   value={values.moduleTittle}
//                   onChange={handleChange}
//                   onBlur={handleBlur}
//                   className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
//                   placeholder=" "
//                   required
//                 />
//                 {errors.moduleTittle && touched.moduleTittle && (
//                   <p className="text-red-600">{errors.moduleTittle}</p>
//                 )}
//               </div>

//               <div className="relative z-0 w-full mb-5 group">
//                 <label
//                   htmlFor="moduleVideo"
//                   className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
//                 >
//                   Add File
//                 </label>
//                 <input
//                   ref={moduleVideoRef}
//                   type="file"
//                   name="moduleVideo"
//                   id="moduleVideo"
//                   // value={values.moduleVideo}
//                   onChange={handleChange}
//                   onBlur={handleBlur}
//                   className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
//                   placeholder=" "
//                   required
//                 />
//                 {errors.moduleVideo && touched.moduleVideo && (
//                   <p className="text-red-600">{errors.moduleVideo}</p>
//                 )}
//               </div>
//             </>
//           )}
//           {/* {stepper === 3 && (
//             <>
//               <div className="bg-gray-900 h-[380px] rounded-lg">
//                 By submitting your course, you acknowledge and agree to the
//                 following terms and policies set forth by Edemy: Authenticity of
//                 Contents: You certify that all course contents uploaded to Edemy
//                 are authentic and not forged. Misrepresentation of content is
//                 strictly prohibited. Ownership Transfer: Uploading a course
//                 implies the transfer of ownership to Edemy. By submitting your
//                 course, you grant Edemy the right to host, distribute, and
//                 modify the content as necessary for the platform. Exclusive
//                 Platform Rights: You agree that the same course uploaded on
//                 Edemy shall not be uploaded to any other online learning
//                 platform. Any violation of this term will be considered a
//                 punishable offense. Quality Standards: Courses must adhere to
//                 Edemy's quality standards. Edemy reserves the right to review
//                 and, if necessary, request improvements to maintain a
//                 high-quality learning experience for users. Honest
//                 Representation: All information provided about the course,
//                 including but not limited to its title, description, and
//                 metadata, must be accurate and representative of the actual
//                 content. Compliance with Laws: You commit to complying with all
//                 applicable laws and regulations related to the creation and
//                 distribution of educational content. Infringement and
//                 Plagiarism: Courses must not infringe on the intellectual
//                 property rights of others. Plagiarism or unauthorized use of
//                 copyrighted material is strictly prohibited. Communication
//                 Standards: Users engaging with the course material should be
//                 treated with respect. Any form of harassment, discrimination, or
//                 inappropriate communication is not tolerated. Security Measures:
//                 You are responsible for implementing appropriate security
//                 measures to protect sensitive information shared within the
//                 course content. Termination of Agreement: Edemy reserves the
//                 right to terminate the agreement and remove any course that
//                 violates these terms and policies without prior notice. By
//                 submitting your course to Edemy, you affirm your understanding
//                 and acceptance of these terms and policies. Edemy may update
//                 these terms periodically, and it is your responsibility to stay
//                 informed of any changes.
//               </div>
//             </>
//           )} */}

//           <div className="flex gap-2 justify-between items-center">
//             {stepper === 1 && (
//               <button
//                 className="bg-slate-500 px-3 py-1 w-20 rounded-sm text-black flex justify-center items-center"
//                 onClick={(e) => {
//                   handleNext(e);
//                 }}
//               >
//                 <FaArrowRightLong />
//               </button>
//             )}
//             {stepper === 2 && (
//               <>
//                 <div className="flex gap-2">
//                   <button
//                     className="bg-slate-500 px-3 py-1 w-20 rounded-sm text-black flex justify-center items-center"
//                     onClick={(e) => {
//                       handlePrev(e);
//                     }}
//                   >
//                     <FaArrowLeftLong />
//                   </button>

//                   <button
//                     className="bg-slate-500 px-3 py-1 w-20 rounded-sm text-black flex justify-center items-center"
//                     onClick={(e) => {
//                       handleNext(e);
//                     }}
//                   >
//                     <FaArrowRightLong />
//                   </button>
//                 </div>
//                 <button
//                   type="button"
//                   className="bg-slate-500 px-3 py-1 w-20 rounded-sm text-black"
//                   onClick={(e) => {
//                     handleAddModule(e);
//                   }}
//                 >
//                   Add
//                 </button>
//               </>
//             )}
//             {stepper === 3 && (
//               <>
//                 <button
//                   className="bg-slate-500 px-3 py-1 w-20 rounded-sm text-black flex justify-center items-center"
//                   onClick={(e) => {
//                     handlePrev(e);
//                   }}
//                 >
//                   <FaArrowLeftLong />
//                 </button>

//                 <button
//                   className="bg-slate-500 px-3 py-1 w-20 rounded-sm text-black flex justify-center items-center"
//                   type="submit"
//                 >
//                   Submit
//                 </button>
//               </>
//             )}
//           </div>
//         </form>
//       </div>

//       <div className="flex-1 flex-col justify-between h-full">
//         <div className="flex justify-center items-center">
//           <div
//             className={`rounded-full w-11 h-11 text-black font-bold ${
//               stepper === 1 ? "bg-green-950" : "bg-slate-500"
//             } flex justify-center items-center`}
//           >
//             <h1>1</h1>
//           </div>
//           <hr className="w-12 border-[2px]" />
//           <div
//             className={`rounded-full w-11 h-11 text-black font-bold ${
//               stepper === 2 ? "bg-green-950" : "bg-slate-500"
//             } flex justify-center items-center`}
//           >
//             <h1>2</h1>
//           </div>
//           <hr className="w-12 border-[2px]" />
//           <div
//             className={`rounded-full w-11 h-11 text-black font-bold ${
//               stepper === 3 ? "bg-green-950" : "bg-slate-500"
//             } flex justify-center items-center`}
//           >
//             <h1>3</h1>
//           </div>
//         </div>

//         <div className="p-5 flex flex-col gap-3">
//           {coursesList.length > 0 &&
//             coursesList.map((item, index) => (
//               <li
//                 key={index}
//                 className="flex gap-2 justify-between items-center cursor-pointer border border-white rounded-sm p-2 text-white"
//               >
//                 <div>{item?.moduleNo + "."}</div>
//                 <div>{item?.moduleName}</div>
//                 <div>
//                   <button className="bg-slate-500 px-5 text-black font-bold">
//                     Watch
//                   </button>
//                 </div>
//               </li>
//             ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AddCourse;
