import { IGetSingleCourseReviewAndRatingRes } from "../../interfaces/ReviewAndRating/getSingleCourseReviewAndRating";
import {
  IReviewAndRatingReq,
  IReviewAndRatingRes,
} from "../../interfaces/ReviewAndRating/updateReviewAndRating";
import { apiSlice } from "../api/apiSlice";

export const ReviewAndRatingApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    updateReviewAndRating: builder.mutation<
      IReviewAndRatingRes,
      IReviewAndRatingReq
    >({
      query: (data) => ({
        url: "course/update_review_and_rating",
        method: "post",
        body: data,
        credentials: "include" as const,
      }),

    }),
// *************************************************************************
    getSingleCourseReviewAndRating: builder.mutation<
      IGetSingleCourseReviewAndRatingRes,
      { courseId: string }
    >({
      query: (data) => ({
        method: "post",
        url: "course/get_single_course_review_and_rating",
        body: data,
        credentials: "include" as const,
      }),
    }),
  }),
});

export const {
  useUpdateReviewAndRatingMutation,
  useGetSingleCourseReviewAndRatingMutation
} = ReviewAndRatingApi;
