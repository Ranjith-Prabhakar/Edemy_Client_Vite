import { createSlice } from "@reduxjs/toolkit";
import { ICourse } from "../../interfaces/Course/generalInterface";

export interface ICourseInitialState {
  isLoading: boolean;
  coursesData: ICourse[];
  coursesInRequest: ICourse[];
}
const initialState: ICourseInitialState = {
  isLoading: true,
  coursesData: [],
  coursesInRequest: [],
};
const courseSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    getCoursesState: (state, action) => {
      state.isLoading = false;
      state.coursesData = action.payload.data;
    },
    getCourseseInProgressState: (state, action) => {
      state.isLoading = false;
      state.coursesInRequest = action.payload.data;
    },
    removeCourseAfterApprovalOrReject: (state, action) => {
      const courseData = state.coursesInRequest.find(
        (course) => course._id === action.payload.data
      );
      if (courseData) {
        courseData.status = "approved";
        state.coursesData = [...state.coursesData, courseData];
        state.coursesInRequest = state.coursesInRequest.filter(
          (course) => course._id !== action.payload.data
        );
      } else {
        console.error(
          `Course with _id ${action.payload.data} not found in coursesInRequest.`
        );
      }
    },
  },
});

export const {
  getCoursesState,
  getCourseseInProgressState,
  removeCourseAfterApprovalOrReject,
} = courseSlice.actions;
export default courseSlice.reducer;
