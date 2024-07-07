import { ReactNode, useEffect, useState } from "react";
import web_development from "../../../public/Assets/web_development.avif";
import { FaStar } from "react-icons/fa";
import { FaStarHalf } from "react-icons/fa";
import { MdFormatListBulletedAdd } from "react-icons/md";
import { FaRupeeSign } from "react-icons/fa";
import { ICourse } from "../../redux/interfaces/Course/generalInterface";
import { useNavigate } from "react-router-dom";
import {
  useEnrollCourseMutation,
  useGetThumbnailImagesPreSignedUrlMutation,
} from "../../redux/features/course/courseApi";
import toast from "react-hot-toast";
import useGetUser from "../../hooks/useGetUser";
import { FaCartPlus } from "react-icons/fa";
import { useGetSingleCourseReviewAndRatingMutation } from "../../redux/features/reviewAndRating/reiewAndRatingApi";
import { TReviewAndRating } from "../../features/Video/ReviewAndRating";

type TResponse = {
  data: {
    courseId: string;
    courseName: string;
    createdAt: string;
    updatedAt: string;
    reviewAndRating: TReviewAndRating[]
  };
  message: string;
  success: boolean;
};

type Props = {
  courseCategory: ICourse;
};

const CourseCard = ({ courseCategory }: Props): ReactNode => {
  const [getThumbnailImagesPreSignedUrl, { data, isSuccess }] =
    useGetThumbnailImagesPreSignedUrlMutation();


  const [
    getSingleCourseReviewAndRating,
    {
      data: singleCourseReviewAndRatingData,
      isSuccess: singleCourseReviewAndRatingIsSuccess,
    },
  ] = useGetSingleCourseReviewAndRatingMutation();

  const [coursereviewAndRatingData, setCoursereviewAndRatingData] = useState<
    TReviewAndRating[]
  >([]);

  const user = useGetUser();
  const navigate = useNavigate();
  const [imgUrl, setImagUrl] = useState("");
  const [
    enrollCourse,
    {
      isSuccess: enrollIsSuccess,
      data: enrollData,
      isError: enrollIsError,
      error: enrollError,
    },
  ] = useEnrollCourseMutation();

  useEffect(() => {
    getSingleCourseReviewAndRating({ courseId: courseCategory._id });
  }, []);

  useEffect(() => {
    if (singleCourseReviewAndRatingIsSuccess) {
    
       setCoursereviewAndRatingData(
         (setCoursereviewAndRatingData as unknown as TResponse)?.data?.reviewAndRating 
       );
    }
  }, [singleCourseReviewAndRatingIsSuccess]);


  useEffect(() => {
  }, [coursereviewAndRatingData]);

  useEffect(() => {
    getThumbnailImagesPreSignedUrl({
      thumbnail: courseCategory.thumbnail,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (isSuccess) {
      setImagUrl(data?.data as string);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);

  useEffect(() => {
    if (enrollIsSuccess) {
      window.location = enrollData?.data as unknown as Location;
    }
    if (enrollIsError) {
      toast.error("something went wrong please try again");
    }
  }, [enrollData, enrollError, enrollIsError, enrollIsSuccess]);

  let isCoursePurchasedByUser = user.enrolledCourses?.includes(
    courseCategory._id
  );

  if (!isCoursePurchasedByUser) {
    isCoursePurchasedByUser = user.courses?.includes(courseCategory._id);
  }

  return (
    <div
      key={courseCategory.courseName}
      className="flex flex-col w-[300px] rounded-2xl overflow-hidden dark:bg-c_color-colorSeven shadow-lg pb-4 space-y-2"
    >
      <div className="relative">
        <div className="absolute right-3 top-3 cursor-pointer">
          <FaCartPlus size={25} title="Add to cart" />
        </div>
        <img
          src={imgUrl || web_development}
          alt=""
          className="w-full h-[200px] cursor-pointer"
          onClick={() => {
            navigate("/course_single_page", {
              state: { courseData: courseCategory },
            });
          }}
        />
        <h4
          className="text-[#fffff] mt-2 text-xl ps-4 cursor-pointer"
          onClick={() => {
            navigate("/course_single_page", {
              state: { courseData: courseCategory },
            });
          }}
        >
          {courseCategory.courseName}
        </h4>
        <div className="space-y-2">
          <div className="flex justify-between px-4">
            <div className="flex ">
              <FaStar color={"#fffff"} />
              <FaStar color={"#fffff"} />
              <FaStar color={"#fffff"} />
              <FaStar color={"#fffff"} />
              <FaStarHalf color={"#fffff"} />
            </div>
            <div className="flex items-center ">
              <FaRupeeSign />
              <h3>{courseCategory.price}</h3>
            </div>
          </div>
          <div className="flex px-4 justify-between">
            <div className="flex gap-1 items-center">
              <MdFormatListBulletedAdd size={20} />
              <h4>
                {courseCategory.modules.reduce((acc, curr) => {
                  return acc + curr.videos.length;
                }, 0)}
              </h4>
            </div>
            <div className="">
              {isCoursePurchasedByUser || user.role === "admin" ? (
                <button
                  className="bg-white text-gray-950 font-bold px-8  py-0.5 rounded-full hover:scale-110"
                  onClick={() => {
                    navigate("/course_single_page", {
                      state: { courseData: courseCategory },
                    });
                  }}
                >
                  Play
                </button>
              ) : (
                <button
                  className="bg-white text-gray-950 py-1 px-2 rounded-sm font-semibold"
                  onClick={() => {
                    enrollCourse([
                      {
                        courseId: courseCategory._id,
                        courseName: courseCategory.courseName,
                        price: courseCategory.price,
                        category: courseCategory.category,
                      },
                    ]);
                  }}
                >
                  Enroll Now
                </button>
              )}
            </div>
          </div>
          <div className=""></div>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;


// // import { ReactNode, useEffect, useState } from "react";
// // import web_development from "../../../public/Assets/web_development.avif";
// // import { FaStar } from "react-icons/fa";
// // import { FaStarHalf } from "react-icons/fa";
// // import { MdFormatListBulletedAdd } from "react-icons/md";
// // import { FaRupeeSign } from "react-icons/fa";
// // import { ICourse } from "../../redux/interfaces/Course/generalInterface";
// // import { useNavigate } from "react-router-dom";
// // import {
// //   useEnrollCourseMutation,
// //   useGetThumbnailImagesPreSignedUrlMutation,
// // } from "../../redux/features/course/courseApi";
// // import toast from "react-hot-toast";
// // import useGetUser from "../../hooks/useGetUser";
// // import { FaCartPlus } from "react-icons/fa";
// // import { useGetSingleCourseReviewAndRatingMutation } from "../../redux/features/reviewAndRating/reiewAndRatingApi";
// // import { TReviewAndRating } from "../../features/Video/ReviewAndRating";

// // type TResponse = {
// //   data: {
// //     courseId: string;
// //     courseName: string;
// //     createdAt: string;
// //     updatedAt: string;
// //     reviewAndRating: TReviewAndRating[]
// //   };
// //   message: string;
// //   success: boolean;
// // };

// // type Props = {
// //   courseCategory: ICourse;
// // };

// // const CourseCard = ({ courseCategory }: Props): ReactNode => {
// //   const [getThumbnailImagesPreSignedUrl, { data, isSuccess }] =
// //     useGetThumbnailImagesPreSignedUrlMutation();


// //   const [
// //     getSingleCourseReviewAndRating,
// //     {
// //       data: singleCourseReviewAndRatingData,
// //       isSuccess: singleCourseReviewAndRatingIsSuccess,
// //     },
// //   ] = useGetSingleCourseReviewAndRatingMutation();

// //   const [coursereviewAndRatingData, setCoursereviewAndRatingData] = useState<
// //     TReviewAndRating[]
// //   >([]);

// //   const user = useGetUser();
// //   const navigate = useNavigate();
// //   const [imgUrl, setImagUrl] = useState("");
// //   const [
// //     enrollCourse,
// //     {
// //       isSuccess: enrollIsSuccess,
// //       data: enrollData,
// //       isError: enrollIsError,
// //       error: enrollError,
// //     },
// //   ] = useEnrollCourseMutation();

// //   useEffect(() => {
// //     console.log("courseId", courseCategory._id);
// //     getSingleCourseReviewAndRating({ courseId: courseCategory._id });
// //   }, []);

// //   useEffect(() => {
// //     if (singleCourseReviewAndRatingIsSuccess) {
// //       console.log(
// //         "singleCourseReviewAndRatingData",
// //         singleCourseReviewAndRatingData
// //       );
// //        setCoursereviewAndRatingData(
// //          (setCoursereviewAndRatingData as unknown as TResponse)?.data?.reviewAndRating 
// //        );
// //     }
// //   }, [singleCourseReviewAndRatingIsSuccess]);


// //   useEffect(() => {
// //     console.log("coursereviewAndRatingData", coursereviewAndRatingData);
// //   }, [coursereviewAndRatingData]);

// //   useEffect(() => {
// //     getThumbnailImagesPreSignedUrl({
// //       thumbnail: courseCategory.thumbnail,
// //     });
// //     // eslint-disable-next-line react-hooks/exhaustive-deps
// //   }, []);
// //   useEffect(() => {
// //     if (isSuccess) {
// //       setImagUrl(data?.data as string);
// //     }
// //     // eslint-disable-next-line react-hooks/exhaustive-deps
// //   }, [isSuccess]);

// //   useEffect(() => {
// //     if (enrollIsSuccess) {
// //       window.location = enrollData?.data as unknown as Location;
// //     }
// //     if (enrollIsError) {
// //       toast.error("something went wrong please try again");
// //     }
// //   }, [enrollData, enrollError, enrollIsError, enrollIsSuccess]);

// //   let isCoursePurchasedByUser = user.enrolledCourses?.includes(
// //     courseCategory._id
// //   );

// //   if (!isCoursePurchasedByUser) {
// //     isCoursePurchasedByUser = user.courses?.includes(courseCategory._id);
// //   }

// //   return (
// //     <div
// //       key={courseCategory.courseName}
// //       className="flex flex-col w-[300px] rounded-2xl overflow-hidden dark:bg-c_color-colorSeven shadow-lg pb-4 space-y-2"
// //     >
// //       <div className="relative">
// //         <div className="absolute right-3 top-3 cursor-pointer">
// //           <FaCartPlus size={25} title="Add to cart" />
// //         </div>
// //         <img
// //           src={imgUrl || web_development}
// //           alt=""
// //           className="w-full h-[200px] cursor-pointer"
// //           onClick={() => {
// //             navigate("/course_single_page", {
// //               state: { courseData: courseCategory },
// //             });
// //           }}
// //         />
// //         <h4
// //           className="text-[#fffff] mt-2 text-xl ps-4 cursor-pointer"
// //           onClick={() => {
// //             navigate("/course_single_page", {
// //               state: { courseData: courseCategory },
// //             });
// //           }}
// //         >
// //           {courseCategory.courseName}
// //         </h4>
// //         <div className="space-y-2">
// //           <div className="flex justify-between px-4">
// //             <div className="flex ">
// //               <FaStar color={"#fffff"} />
// //               <FaStar color={"#fffff"} />
// //               <FaStar color={"#fffff"} />
// //               <FaStar color={"#fffff"} />
// //               <FaStarHalf color={"#fffff"} />
// //             </div>
// //             <div className="flex items-center ">
// //               <FaRupeeSign />
// //               <h3>{courseCategory.price}</h3>
// //             </div>
// //           </div>
// //           <div className="flex px-4 justify-between">
// //             <div className="flex gap-1 items-center">
// //               <MdFormatListBulletedAdd size={20} />
// //               <h4>
// //                 {courseCategory.modules.reduce((acc, curr) => {
// //                   return acc + curr.videos.length;
// //                 }, 0)}
// //               </h4>
// //             </div>
// //             <div className="">
// //               {isCoursePurchasedByUser || user.role === "admin" ? (
// //                 <button
// //                   className="bg-white text-gray-950 font-bold px-8  py-0.5 rounded-full hover:scale-110"
// //                   onClick={() => {
// //                     navigate("/course_single_page", {
// //                       state: { courseData: courseCategory },
// //                     });
// //                   }}
// //                 >
// //                   Play
// //                 </button>
// //               ) : (
// //                 <button
// //                   className="bg-white text-gray-950 py-1 px-2 rounded-sm font-semibold"
// //                   onClick={() => {
// //                     enrollCourse([
// //                       {
// //                         courseId: courseCategory._id,
// //                         courseName: courseCategory.courseName,
// //                         price: courseCategory.price,
// //                         category: courseCategory.category,
// //                       },
// //                     ]);
// //                   }}
// //                 >
// //                   Enroll Now
// //                 </button>
// //               )}
// //             </div>
// //           </div>
// //           <div className=""></div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default CourseCard;

// import { ReactNode, useEffect, useState } from "react";
// import web_development from "../../../public/Assets/web_development.avif";
// import { FaStar } from "react-icons/fa";
// import { FaStarHalf } from "react-icons/fa";
// import { MdFormatListBulletedAdd } from "react-icons/md";
// import { FaRupeeSign } from "react-icons/fa";
// import { ICourse } from "../../redux/interfaces/Course/generalInterface";
// import { useNavigate } from "react-router-dom";
// import {
//   useEnrollCourseMutation,
//   useGetThumbnailImagesPreSignedUrlMutation,
// } from "../../redux/features/course/courseApi";
// import toast from "react-hot-toast";
// import useGetUser from "../../hooks/useGetUser";
// import { FaCartPlus } from "react-icons/fa";

// type Props = {
//   courseCategory: ICourse;
// };

// const CourseCard = ({ courseCategory }: Props): ReactNode => {
//   const [getThumbnailImagesPreSignedUrl, { data, isSuccess }] =
//     useGetThumbnailImagesPreSignedUrlMutation();
//   const user = useGetUser();
//   const navigate = useNavigate();
//   const [imgUrl, setImagUrl] = useState("");
//   const [
//     enrollCourse,
//     {
//       isSuccess: enrollIsSuccess,
//       data: enrollData,
//       isError: enrollIsError,
//       error: enrollError,
//     },
//   ] = useEnrollCourseMutation();

//   useEffect(() => {
//     getThumbnailImagesPreSignedUrl({
//       thumbnail: courseCategory.thumbnail,
//     });
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);
//   useEffect(() => {
//     if (isSuccess) {
//       setImagUrl(data?.data as string);
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [isSuccess]);

//   useEffect(() => {
//     if (enrollIsSuccess) {
//       window.location = enrollData?.data as unknown as Location;
//     }
//     if (enrollIsError) {
//       toast.error("something went wrong please try again");
//     }
//   }, [enrollData, enrollError, enrollIsError, enrollIsSuccess]);

//   let isCoursePurchasedByUser = user.enrolledCourses?.includes(
//     courseCategory._id
//   );

//   if (!isCoursePurchasedByUser) {
//     isCoursePurchasedByUser = user.courses?.includes(courseCategory._id);
//   }

//   return (
//     <div
//       key={courseCategory.courseName}
//       className="flex flex-col w-[300px] rounded-2xl overflow-hidden dark:bg-c_color-colorSeven shadow-lg pb-4 space-y-2"
//     >
//       <div className="relative">
//         <div className="absolute right-3 top-3 cursor-pointer">
//           <FaCartPlus size={25} title="Add to cart"/>
//         </div>
//         <img
//           src={imgUrl || web_development}
//           alt=""
//           className="w-full h-[200px] cursor-pointer"
//           onClick={() => {
//             navigate("/course_single_page", {
//               state: { courseData: courseCategory },
//             });
//           }}
//         />
//         <h4
//           className="text-[#fffff] mt-2 text-xl ps-4 cursor-pointer"
//           onClick={() => {
//             navigate("/course_single_page", {
//               state: { courseData: courseCategory },
//             });
//           }}
//         >
//           {courseCategory.courseName}
//         </h4>
//         <div className="space-y-2">
//           <div className="flex justify-between px-4">
//             <div className="flex ">
//               <FaStar color={"#fffff"} />
//               <FaStar color={"#fffff"} />
//               <FaStar color={"#fffff"} />
//               <FaStar color={"#fffff"} />
//               <FaStarHalf color={"#fffff"} />
//             </div>
//             <div className="flex items-center ">
//               <FaRupeeSign />
//               <h3>{courseCategory.price}</h3>
//             </div>
//           </div>
//           <div className="flex px-4 justify-between">
//             <div className="flex gap-1 items-center">
//               <MdFormatListBulletedAdd size={20} />
//               <h4>
//                 {courseCategory.modules.reduce((acc, curr) => {
//                   return acc + curr.videos.length;
//                 }, 0)}
//               </h4>
//             </div>
//             <div className="">
//               {isCoursePurchasedByUser || user.role === "admin" ? (
//                 <button
//                   className="bg-white text-gray-950 font-bold px-8  py-0.5 rounded-full hover:scale-110"
//                   onClick={() => {
//                     navigate("/course_single_page", {
//                       state: { courseData: courseCategory },
//                     });
//                   }}
//                 >
//                   Play
//                 </button>
//               ) : (
//                 <button
//                   className="bg-white text-gray-950 py-1 px-2 rounded-sm font-semibold"
//                   onClick={() => {
//                     enrollCourse([
//                       {
//                         courseId: courseCategory._id,
//                         courseName: courseCategory.courseName,
//                         price: courseCategory.price,
//                         category: courseCategory.category,
//                       },
//                     ]);
//                   }}
//                 >
//                   Enroll Now
//                 </button>
//               )}
//             </div>
//           </div>
//           <div className=""></div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CourseCard;
