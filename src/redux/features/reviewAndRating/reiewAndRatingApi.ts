import { catchError } from "../../../utils/catchError";
import { IGetReviewAndRatingRes } from "../../interfaces/ReviewAndRating/getReviewAndRating";
import {
  IReviewAndRatingReq,
  IReviewAndRatingRes,
} from "../../interfaces/ReviewAndRating/updateReviewAndRating";
import { apiSlice } from "../api/apiSlice";
import {
  getReviewAndRating,
  updateReviewAndRating,
} from "./reviewAndRatingSlice";

export const ReviewAndRatingApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getReviewAndRatingData: builder.query<IGetReviewAndRatingRes, void>({
      query: () => ({
        method: "get",
        url: "course/get_review_and_rating",
        credentials: "include" as const,
      }),
      async onQueryStarted(_arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          console.log("result from onQureyStarted reviewAndRating", result);
          console.log(
            "result from onQureyStarted reviewAndRating",
            result.data.data
          );
          dispatch(getReviewAndRating({ data: result.data.data }));
        } catch (error) {
          catchError(error);
        }
      },
    }),

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

      async onQueryStarted(_arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          console.log("result from onQureyStarted reviewAndRating", result);
          console.log(
            "result from onQureyStarted reviewAndRating",
            result.data.data
          );
          dispatch(updateReviewAndRating({ data: result.data.data }));
        } catch (error) {
          catchError(error);
        }
      },
    }),
  }),
});

export const {useGetReviewAndRatingDataQuery,useUpdateReviewAndRatingMutation } = ReviewAndRatingApi;
