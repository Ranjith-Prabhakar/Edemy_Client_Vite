import { createSlice } from "@reduxjs/toolkit";
import { IReviewAndRating } from "../../interfaces/ReviewAndRating/generalInterfaces";

export interface IReviewAndRatingInitialState {
  isLoading: boolean;
  reviewAndRatingData: IReviewAndRating[];
}

const initialState: IReviewAndRatingInitialState = {
  isLoading: true,
  reviewAndRatingData: [],
};

const reviewAndRatingSlice = createSlice({
  name: "reviewAndRating",
  initialState,
  reducers: {
    getReviewAndRating: (state, action) => {
      state.isLoading = false;
      state.reviewAndRatingData = action.payload.data;
    },
    updateReviewAndRating: (state, action) => {
      console.log("action.payload.data", action.payload.data);
      state.isLoading = false;
      const index = state.reviewAndRatingData.findIndex(
        (item) => item._id === action.payload.data._id
      );
      if (index !== -1) {
        state.reviewAndRatingData[index] = action.payload.data;
      } else {
        state.reviewAndRatingData = [
          ...state.reviewAndRatingData,
          action.payload.data,
        ];
      }
    },
  },
});

export const { getReviewAndRating, updateReviewAndRating } =
  reviewAndRatingSlice.actions;
export default reviewAndRatingSlice.reducer;
