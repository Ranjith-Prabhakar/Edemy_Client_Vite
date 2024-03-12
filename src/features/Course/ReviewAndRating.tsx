import { FaStar } from "react-icons/fa";
import { VscSend } from "react-icons/vsc";
import { FaRegStar } from "react-icons/fa";
import {
  useGetReviewAndRatingDataQuery,
  useUpdateReviewAndRatingMutation,
} from "../../redux/features/reviewAndRating/reiewAndRatingApi";
import { useEffect, useState } from "react";
import { ICourseData } from "../../pages/General/CourseSinglePage";
import { catchError } from "../../utils/catchError";
import useGetUser from "../../hooks/useGetUser";

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
type TReviewAndRatingObj = {
  _id: string;
  courseId: string;
  courseName: string;
  reviewAndRating: TReviewAndRating[];
};

const ReviewAndRating = ({ courseData }: Props) => {
  const user = useGetUser();
  const [review, setReview] = useState("");
  const [showUpdateButton, setShowUpdateButton] = useState(false);
  const {
    isSuccess: getReviewAndRatingIsSuccess,
    data: getReviewAndRatingData,
  } = useGetReviewAndRatingDataQuery();
  const [updateReviewAndRating, { data, isSuccess, isError, error }] =
    useUpdateReviewAndRatingMutation();
  const [fillStar, setFillStar] = useState(0);
  const [existingReview, setExistingReview] = useState("");
  const [userReviewData, setUserRevieData] = useState<TReviewAndRating>(
    {} as TReviewAndRating
  );
  const [reviewAndRatingCollection, setReviewAndRatingCollection] = useState<
    TReviewAndRating[]
  >([] as TReviewAndRating[]);

  useEffect(() => {
    if (getReviewAndRatingIsSuccess) {
      const isCourseHaveReviewdAndRated = getReviewAndRatingData.data.find(
        (course: TReviewAndRatingObj) => course.courseId === courseData._id
      );
      if (isCourseHaveReviewdAndRated) {
        setReviewAndRatingCollection(
          isCourseHaveReviewdAndRated.reviewAndRating
        );
        console.log(
          "reviewAndRatingCollection22222222",
          reviewAndRatingCollection
        );
        const isUserHaveReviewdOrRatedAlready =
          isCourseHaveReviewdAndRated.reviewAndRating.find(
            (reviewOrRating: TReviewAndRating) =>
              reviewOrRating.userId === user._id
          );
        if (isUserHaveReviewdOrRatedAlready) {
          setUserRevieData(isUserHaveReviewdOrRatedAlready);
          console.log("userReviewData", userReviewData);
        }
        if (isUserHaveReviewdOrRatedAlready?.rating) {
          setFillStar(isUserHaveReviewdOrRatedAlready.rating);
          console.log(
            "isUserHaveReviewdOrRatedAlready```````",
            isUserHaveReviewdOrRatedAlready
          );
        }
        if (isUserHaveReviewdOrRatedAlready?.review) {
          console.log(
            "isUserHaveReviewdOrRatedAlready.review",
            isUserHaveReviewdOrRatedAlready.review
          );
          setExistingReview(isUserHaveReviewdOrRatedAlready.review);
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getReviewAndRatingIsSuccess]);
  useEffect(() => {
    if (isSuccess) {
      console.log("data from ReviewAndRating component", data);
    }
    if (isError) {
      console.log("error from ReviewAndRating component", error);
    }
  }, [data, error, isError, isSuccess]);

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
          {existingReview !== "" ? (
            <div className="ms-2 mb-4">
              <div className="max-w-fit ">
                <h3 className="italic font-bold">
                  You{" "}
                  <span className="text-[10px]">
                    ( {userReviewData.date.substring(0, 10)} )
                  </span>
                  <hr className="border-dashed" />
                </h3>
              </div>
              <p className="italic ms-3 mt-1">{existingReview}</p>
            </div>
          ) : (
            <form className="">
              <div className="relative w-full">
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
                ></textarea>
                {showUpdateButton && (
                  <VscSend
                    className="absolute right-2 bottom-1 cursor-pointer"
                    onClick={() => {
                      updateReviewAndRating({
                        courseId: courseData._id,
                        courseName: courseData.courseName,
                        fieldToUpdate: "review",
                        review: review,
                      });
                    }}
                  />
                )}
              </div>
            </form>
          )}
          <>
            {
              <div className="ms-2 ">
                <div className="max-w-fit ">
                  <h3 className="italic font-bold">
                    You{" "}
                    <span className="text-[10px]">
                      ( {userReviewData.date} )
                    </span>
                    <hr className="border-dashed" />
                  </h3>
                </div>
                <p className="italic ms-3 mt-1">{existingReview}</p>
              </div>
            }
          </>
        </div>
      </div>
      <div className="flex flex-col flex-2 mr-2 my-3 gap-2">
        <div className="flex flex-col rounded-md dark:bg-[#062e2a]">
          <h1 className="text-center font-bold italic">Total Rating</h1>
          <hr className="w-[90%] m-auto mt-1" />
          <div className="flex shadow-2xl px-5 py-2  ">
            <FaStar size={20} color="#FFD700" />
            <FaStar size={20} color="#FFD700" />
            <FaStar size={20} color="#FFD700" />
            <FaStar size={20} color="#FFD700" />
            <FaRegStar size={20} color="#FFD700" />
          </div>
        </div>
        <div className="flex flex-col rounded-md dark:bg-[#062e2a]">
          <h1 className="text-center font-bold italic">Add your rating</h1>
          <hr className="w-[90%] m-auto mt-1" />
          <div className="flex shadow-2xl px-5 py-2  ">
            {[...Array(fillStar)].map((_, index) => (
              <FaStar
                key={index}
                size={20}
                color="#FFD700"
                className="cursor-pointer"
                onClick={() => {
                  setFillStar(index + 1);
                  updateReviewAndRating({
                    courseId: courseData._id,
                    courseName: courseData.courseName,
                    fieldToUpdate: "rating",
                    rating: index + 1,
                  });
                }}
              />
            ))}
            {[...Array(5 - fillStar)].map((_, index) => (
              <FaRegStar
                key={index}
                size={20}
                color="#FFD700"
                className="cursor-pointer"
                onClick={() => {
                  setFillStar(fillStar + (index + 1));
                  updateReviewAndRating({
                    courseId: courseData._id,
                    courseName: courseData.courseName,
                    fieldToUpdate: "rating",
                    rating: fillStar + (index + 1),
                  });
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewAndRating;
