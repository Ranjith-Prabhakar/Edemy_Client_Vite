import { FaStar } from "react-icons/fa";
import { VscSend } from "react-icons/vsc";
import { FaRegStar } from "react-icons/fa";
import { useUpdateReviewAndRatingMutation } from "../../redux/features/reviewAndRating/reiewAndRatingApi";
import { useEffect, useState } from "react";
import { ICourseData } from "../../pages/General/CourseSinglePage";
import { catchError } from "../../utils/catchError";

type Props = {
  courseData: ICourseData;
};

const ReviewAndRating = ({ courseData }: Props) => {
  const [review, setReview] = useState("");
  const [showUpdateButton, setShowUpdateButton] = useState(false);
  const [updateReviewAndRating, { data, isSuccess, isError, error }] =
    useUpdateReviewAndRatingMutation();
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
                      fieldToUpdate:"review",
                      review: review,
                    });
                  }}
                />
              )}
            </div>
          </form>
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
            <FaRegStar size={20} color="#FFD700 " className="cursor-pointer" />
            <FaRegStar size={20} color="#FFD700 " className="cursor-pointer" />
            <FaRegStar size={20} color="#FFD700 " className="cursor-pointer" />
            <FaRegStar size={20} color="#FFD700 " className="cursor-pointer" />
            <FaRegStar size={20} color="#FFD700 " className="cursor-pointer" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewAndRating;
