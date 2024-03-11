import { catchError } from "../../../utils/catchError";
import {
  IReviewAndRatingReq,
  IReviewAndRatingRes,
} from "../../interfaces/ReviewAndRating/generalInterfaces";
import { apiSlice } from "../api/apiSlice";
import { updateReviewAndRating } from "./reviewAndRatingSlice";

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

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          console.log("result from onQureyStarted reviewAndRating", result);
          console.log("result from onQureyStarted reviewAndRating", result.data.data);
          dispatch(updateReviewAndRating({ data: result.data.data }));
        } catch (error) {
          catchError(error);
        }
      },
    }),
  }),
});

export const {useUpdateReviewAndRatingMutation} = ReviewAndRatingApi;