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
  },
});

export const {getCoursesState,getCourseseInProgressState} = courseSlice.actions
export default courseSlice.reducer
