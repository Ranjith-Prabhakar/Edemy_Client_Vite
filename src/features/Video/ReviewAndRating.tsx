import { FaStar } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";
import {
  useGetSingleCourseReviewAndRatingMutation,
  useUpdateReviewAndRatingMutation,
} from "../../redux/features/reviewAndRating/reiewAndRatingApi";
import { useEffect, useState } from "react";
import { ICourseData } from "../../pages/General/CourseSinglePage";
import { catchError } from "../../utils/catchError";
import useGetUser from "../../hooks/useGetUser";
import { IoSend } from "react-icons/io5";

type Props = {
  courseData: ICourseData;
};

type TReviewAndRating = {
  userId: string;
  userName: string;
  date: string;
  review?: string;
  rating?: number;
};

const ReviewAndRating = ({ courseData }: Props) => {
  const [getSingleCourseReviewAndRating, { data, isSuccess }] =
    useGetSingleCourseReviewAndRatingMutation();

  const user = useGetUser();

  const [review, setReview] = useState("");

  const [showUpdateButton, setShowUpdateButton] = useState(false);

  const [
    updateReviewAndRating,
    {
      data: updateReviewAndRatingData,
      isSuccess: updateReviewAndRatingIsSuccess,
    },
  ] = useUpdateReviewAndRatingMutation();
  const [fillStarUser, setFillStarUser] = useState(0);
  const [fillStarTotal, setFillStarTotal] = useState(0);
  const [coursereviewAndRatingData, setCoursereviewAndRatingData] = useState<
    TReviewAndRating[]
  >([]);

  //getting the course details
  useEffect(() => {
    getSingleCourseReviewAndRating({ courseId: courseData._id });
  }, []);
  //setting the value for coursereviewAndRatingData on success of getSingleCourseReviewAndRating()
  useEffect(() => {
    if (isSuccess) {
      setCoursereviewAndRatingData(
        data?.data?.reviewAndRating as TReviewAndRating[]
      );
    }
  }, [isSuccess]);

  // updating review and rating
  useEffect(() => {
    if (updateReviewAndRatingIsSuccess) {
      setCoursereviewAndRatingData(
        updateReviewAndRatingData?.data?.reviewAndRating as TReviewAndRating[]
      );
    }
  }, [updateReviewAndRatingIsSuccess]);

  // setting the state values for fillStarUser & fillStarTotal on success updation of the state coursereviewAndRatingData
  useEffect(() => {
    if (coursereviewAndRatingData && coursereviewAndRatingData.length) {
      const userRating =
        coursereviewAndRatingData?.find(
          (item: TReviewAndRating) => item.userId === user._id
        )?.rating || 0;
      setFillStarUser(userRating);

      const totalRatingData = coursereviewAndRatingData?.reduce(
        (accu, curr) => {
          if (curr?.rating !== undefined) {
            accu.totalRating += curr.rating;
            accu.countWithRating += 1;
          }

          return accu;
        },
        { totalRating: 0, countWithRating: 0 }
      );

      const totalRating = totalRatingData?.totalRating || 0;
      const countWithRating = totalRatingData?.countWithRating || 0;
      const total =
        (5 / 100) * ((totalRating / (countWithRating * 5)) * 100) || 0;
      const newTotal = Math.round(total);
      setFillStarTotal(newTotal);
    }
  }, [coursereviewAndRatingData]);

  const handleChange = async (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    try {
      const trimmedValue = e.target.value.trimStart();
      if (trimmedValue !== "") {
        setShowUpdateButton(true);
        setReview(trimmedValue);
      } else {
        setShowUpdateButton(false);
        setReview("");
      }
    } catch (error) {
      catchError(error);
    }
  };

  return (
    <div className=" dark:bg-c_color-colorSix  rounded-b-md rounded-tl-md w-full flex justify-between gap-2">
      <div className="border my-2 ml-2 overflow-scroll capitalize  flex-1 rounded-lg text-gray-300 ">
        <div className="dark:bg-c_color-colorSix p-3 rounded-md w-full ">
          <form className="">
            <div className="relative w-full">
              {user?.enrolledCourses?.includes(courseData._id) && (
                <textarea
                  id="message"
                  value={review}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                  rows={1}
                  cols={1000}
                  className=" block p-2.5 w-full text-sm  rounded-lg  focus:ring-blue-500 focus:border-blue-500 dark:bg-transparent "
                  placeholder="Leave a your review..."
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      updateReviewAndRating({
                        courseId: courseData._id,
                        courseName: courseData.courseName,
                        fieldToUpdate: "review",
                        review: review,
                      });
                      setReview("");
                    }
                  }}
                ></textarea>
              )}
              {showUpdateButton && (
                <IoSend
                  className="absolute right-2 bottom-2 cursor-pointer text-white"
                  size={25}
                  onClick={() => {
                    updateReviewAndRating({
                      courseId: courseData._id,
                      courseName: courseData.courseName,
                      fieldToUpdate: "review",
                      review: review,
                    });
                    setReview("");
                  }}
                />
              )}
            </div>
          </form>
          {coursereviewAndRatingData && coursereviewAndRatingData.length ? (
            <div className="ms-2 mb-4">
              <div className="max-w-fit ">
                <>
                  {coursereviewAndRatingData
                    ?.filter(
                      (item: TReviewAndRating) => item.userId === user._id
                    )
                    .map((item: TReviewAndRating) => (
                      <div key={item.userId}>
                        {" "}
                        {/* Ensure each child has a unique key */}
                        <h3 className="italic font-bold">
                          You{" : "}
                          <span className="text-[10px]">
                            ( {item.date.substring(0, 10)} ){" "}
                          </span>
                        </h3>
                        <hr className="border-dashed" />
                        <p className="ms-4 font-light my-2">{item.review}</p>
                      </div>
                    ))}

                  {coursereviewAndRatingData
                    ?.filter(
                      (item: TReviewAndRating) => item.userId !== user._id
                    )
                    .map((item: TReviewAndRating) => (
                      <div key={item.userId}>
                        {" "}
                        {/* Ensure each child has a unique key */}
                        <h3 className="italic font-bold">
                          {item.userName}
                          {" : "}
                          <span className="text-[10px]">
                            ( {item.date.substring(0, 10)} ){" "}
                          </span>
                        </h3>
                        <hr className="border-dashed" />
                        <p className="ms-4 font-light my-2">{item.review}</p>
                      </div>
                    ))}
                </>
              </div>
            </div>
          ) : (
            <h1>No reviews found for this course...</h1>
          )}
        </div>
      </div>
      <div className="flex flex-col flex-2 mr-2 my-3 gap-2">
        <div className="flex flex-col rounded-md dark:bg-[#062e2a]">
          <h1 className="text-center font-bold italic">Total Rating</h1>
          <hr className="w-[90%] m-auto mt-1" />
          <div className="flex shadow-2xl px-5 py-2  ">
            {[...Array(fillStarTotal as number)].map((_, index) => (
              <FaStar
                key={index}
                size={20}
                color="#FFD700"
                className="cursor-pointer"
              />
            ))}
            {[...Array(5 - (fillStarTotal as number))].map((_, index) => (
              <FaRegStar
                key={index}
                size={20}
                color="#FFD700"
                className="cursor-pointer"
              />
            ))}
          </div>
        </div>
        {user?.enrolledCourses?.includes(courseData._id) && (
          <div className="flex flex-col rounded-md dark:bg-[#062e2a]">
            <h1 className="text-center font-bold italic">Add your rating</h1>
            <hr className="w-[90%] m-auto mt-1" />
            <div className="flex shadow-2xl px-5 py-2  ">
              {[...Array(fillStarUser)].map((_, index) => (
                <FaStar
                  key={index}
                  size={20}
                  color="#FFD700"
                  className="cursor-pointer"
                  onClick={() => {
                    setFillStarUser(index + 1);
                    updateReviewAndRating({
                      courseId: courseData._id,
                      courseName: courseData.courseName,
                      fieldToUpdate: "rating",
                      rating: index + 1,
                    });
                  }}
                />
              ))}
              {[...Array(5 - fillStarUser)].map((_, index) => (
                <FaRegStar
                  key={index}
                  size={20}
                  color="#FFD700"
                  className="cursor-pointer"
                  onClick={() => {
                    setFillStarUser(fillStarUser + (index + 1));
                    updateReviewAndRating({
                      courseId: courseData._id,
                      courseName: courseData.courseName,
                      fieldToUpdate: "rating",
                      rating: fillStarUser + (index + 1),
                    });
                  }}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewAndRating;

// import { FaStar } from "react-icons/fa";
// import { VscSend } from "react-icons/vsc";
// import { FaRegStar } from "react-icons/fa";
// import {
//   useGetSingleCourseReviewAndRatingMutation,
//   useUpdateReviewAndRatingMutation,
// } from "../../redux/features/reviewAndRating/reiewAndRatingApi";
// import { useEffect, useState } from "react";
// import { ICourseData } from "../../pages/General/CourseSinglePage";
// import { catchError } from "../../utils/catchError";
// import useGetUser from "../../hooks/useGetUser";

// type Props = {
//   courseData: ICourseData;
// };

// type TReviewAndRating = {
//   userId: string;
//   userName: string;
//   date: string;
//   review?: string;
//   rating?: number;
// };

// const ReviewAndRating = ({ courseData }: Props) => {
//   const [getSingleCourseReviewAndRating, { data, isSuccess }] =
//     useGetSingleCourseReviewAndRatingMutation();

//   const user = useGetUser();

//   const [review, setReview] = useState("");

//   const [showUpdateButton, setShowUpdateButton] = useState(false);

//   const [
//     updateReviewAndRating,
//     {
//       data: updateReviewAndRatingData,
//       isSuccess: updateReviewAndRatingIsSuccess,
//     },
//   ] = useUpdateReviewAndRatingMutation();
//   const [fillStarUser, setFillStarUser] = useState(0);
//   const [fillStarTotal, setFillStarTotal] = useState(0);
//   const [coursereviewAndRatingData, setCoursereviewAndRatingData] = useState<
//     TReviewAndRating[]
//   >([]);

//   //getting the course details
//   useEffect(() => {
//     getSingleCourseReviewAndRating({ courseId: courseData._id });
//   }, []);
//   //setting the value for coursereviewAndRatingData on success of getSingleCourseReviewAndRating()
//   useEffect(() => {
//     if (isSuccess) {
//       setCoursereviewAndRatingData(
//         data?.data?.reviewAndRating as TReviewAndRating[]
//       );
//     }
//   }, [isSuccess]);

//   // updating review and rating
//   useEffect(() => {
//     if (updateReviewAndRatingIsSuccess) {
//       setCoursereviewAndRatingData(
//         updateReviewAndRatingData?.data?.reviewAndRating as TReviewAndRating[]
//       );
//     }
//   }, [updateReviewAndRatingIsSuccess]);

//   // setting the state values for fillStarUser & fillStarTotal on success updation of the state coursereviewAndRatingData
//   useEffect(() => {
//     if (coursereviewAndRatingData && coursereviewAndRatingData.length) {
//       const userRating =
//         coursereviewAndRatingData?.find(
//           (item: TReviewAndRating) => item.userId === user._id
//         )?.rating || 0;
//       setFillStarUser(userRating);

//       const totalRatingData = coursereviewAndRatingData?.reduce(
//         (accu, curr) => {
//           if (curr?.rating !== undefined) {
//             accu.totalRating += curr.rating;
//             accu.countWithRating += 1;
//           }

//           return accu;
//         },
//         { totalRating: 0, countWithRating: 0 }
//       );

//       const totalRating = totalRatingData?.totalRating || 0;
//       const countWithRating = totalRatingData?.countWithRating || 0;
//       const total =
//         (5 / 100) * ((totalRating / (countWithRating * 5)) * 100) || 0;
//       const newTotal = Math.round(total);
//       setFillStarTotal(newTotal);
//     }
//   }, [coursereviewAndRatingData]);

//   const handleChange = async (e: React.ChangeEvent<HTMLTextAreaElement>) => {
//     try {
//       const trimmedValue = e.target.value.trimStart();
//       if (trimmedValue !== "") {
//         setShowUpdateButton(true);
//         setReview(trimmedValue);
//       } else {
//         setShowUpdateButton(false);
//         setReview("");
//       }
//     } catch (error) {
//       catchError(error);
//     }
//   };

//   return (
//     <div className=" dark:bg-c_color-colorSix  rounded-b-md rounded-tl-md w-full flex justify-between gap-2">
//       <div className="border my-2 ml-2 overflow-scroll capitalize  flex-1 rounded-lg text-gray-300 ">
//         <div className="dark:bg-c_color-colorSix p-3 rounded-md w-full ">
//           <form className="">
//             <div className="relative w-full">
//               {user?.enrolledCourses?.includes(courseData._id) && (
//                 <textarea
//                   id="message"
//                   value={review}
//                   onChange={(e) => {
//                     handleChange(e);
//                   }}
//                   rows={1}
//                   cols={1000}
//                   className=" block p-2.5 w-full text-sm  rounded-lg  focus:ring-blue-500 focus:border-blue-500 dark:bg-transparent "
//                   placeholder="Leave a your review..."
//                 ></textarea>
//               )}
//               {showUpdateButton && (
//                 <VscSend
//                   className="absolute right-2 bottom-1 cursor-pointer"
//                   onClick={() => {
//                     updateReviewAndRating({
//                       courseId: courseData._id,
//                       courseName: courseData.courseName,
//                       fieldToUpdate: "review",
//                       review: review,
//                     });
//                     setReview("");
//                   }}
//                 />
//               )}
//             </div>
//           </form>
//           {coursereviewAndRatingData && coursereviewAndRatingData.length ? (
//             <div className="ms-2 mb-4">
//               <div className="max-w-fit ">
//                 <>
//                   {coursereviewAndRatingData
//                     ?.filter(
//                       (item: TReviewAndRating) => item.userId === user._id
//                     )
//                     .map((item: TReviewAndRating) => (
//                       <div key={item.userId}>
//                         {" "}
//                         {/* Ensure each child has a unique key */}
//                         <h3 className="italic font-bold">
//                           You{" : "}
//                           <span className="text-[10px]">
//                             ( {item.date.substring(0, 10)} ){" "}
//                           </span>
//                         </h3>
//                         <hr className="border-dashed" />
//                         <p className="ms-4 font-light my-2">{item.review}</p>
//                       </div>
//                     ))}

//                   {coursereviewAndRatingData
//                     ?.filter(
//                       (item: TReviewAndRating) => item.userId !== user._id
//                     )
//                     .map((item: TReviewAndRating) => (
//                       <div key={item.userId}>
//                         {" "}
//                         {/* Ensure each child has a unique key */}
//                         <h3 className="italic font-bold">
//                           {item.userName}
//                           {" : "}
//                           <span className="text-[10px]">
//                             ( {item.date.substring(0, 10)} ){" "}
//                           </span>
//                         </h3>
//                         <hr className="border-dashed" />
//                         <p className="ms-4 font-light my-2">{item.review}</p>
//                       </div>
//                     ))}
//                 </>
//               </div>
//             </div>
//           ) : (
//             <h1>No reviews found for this course...</h1>
//           )}
//         </div>
//       </div>
//       <div className="flex flex-col flex-2 mr-2 my-3 gap-2">
//         <div className="flex flex-col rounded-md dark:bg-[#062e2a]">
//           <h1 className="text-center font-bold italic">Total Rating</h1>
//           <hr className="w-[90%] m-auto mt-1" />
//           <div className="flex shadow-2xl px-5 py-2  ">
//             {[...Array(fillStarTotal as number)].map((_, index) => (
//               <FaStar
//                 key={index}
//                 size={20}
//                 color="#FFD700"
//                 className="cursor-pointer"
//               />
//             ))}
//             {[...Array(5 - (fillStarTotal as number))].map((_, index) => (
//               <FaRegStar
//                 key={index}
//                 size={20}
//                 color="#FFD700"
//                 className="cursor-pointer"
//               />
//             ))}
//           </div>
//         </div>
//         {user?.enrolledCourses?.includes(courseData._id) && (
//           <div className="flex flex-col rounded-md dark:bg-[#062e2a]">
//             <h1 className="text-center font-bold italic">Add your rating</h1>
//             <hr className="w-[90%] m-auto mt-1" />
//             <div className="flex shadow-2xl px-5 py-2  ">
//               {[...Array(fillStarUser)].map((_, index) => (
//                 <FaStar
//                   key={index}
//                   size={20}
//                   color="#FFD700"
//                   className="cursor-pointer"
//                   onClick={() => {
//                     setFillStarUser(index + 1);
//                     updateReviewAndRating({
//                       courseId: courseData._id,
//                       courseName: courseData.courseName,
//                       fieldToUpdate: "rating",
//                       rating: index + 1,
//                     });
//                   }}
//                 />
//               ))}
//               {[...Array(5 - fillStarUser)].map((_, index) => (
//                 <FaRegStar
//                   key={index}
//                   size={20}
//                   color="#FFD700"
//                   className="cursor-pointer"
//                   onClick={() => {
//                     setFillStarUser(fillStarUser + (index + 1));
//                     updateReviewAndRating({
//                       courseId: courseData._id,
//                       courseName: courseData.courseName,
//                       fieldToUpdate: "rating",
//                       rating: fillStarUser + (index + 1),
//                     });
//                   }}
//                 />
//               ))}
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ReviewAndRating;
