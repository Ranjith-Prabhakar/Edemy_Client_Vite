import { createSlice } from "@reduxjs/toolkit";

export interface IInstructor {
  _id?: string;
  name: string;
  email: string;
  password: string;
  avatar?: {
    public_id: string;
    url: string;
  };
  role?: "user" | "instructor" | "admin";
  status?: "active" | "frozen";
  isVerified?: boolean;
  courses?: Array<{ courseId: string }>;
  enrolledCourses?: Array<{ courseId: string }>;
}

interface IInstructorState {
  isLoading: boolean;
  instructorData: IInstructor[];
}

const initialState: IInstructorState = {
  isLoading: true,
  instructorData: [], // Initialize with an empty array
};

const instructorsSlice = createSlice({
  name: "instructors",
  initialState,
  reducers: {
    getInstructor: (state, action) => {
      state.instructorData = action.payload.data;
      state.isLoading = false;
    },
    blockInstructor: (state, action) => {
      const index = state.instructorData.findIndex(
        (item) => item.name === action.payload.userName
      );
      if (index !== -1) {
        state.instructorData[index].status = "frozen";
      }
    },
    unBlockInstructor: (state, action) => {
      const index = state.instructorData.findIndex(
        (item) => item.name === action.payload.userName
      );
      if (index !== -1) {
        state.instructorData[index].status = "active";
      }
    },
  },
});

export const { getInstructor, blockInstructor, unBlockInstructor } =
  instructorsSlice.actions;
export default instructorsSlice.reducer;
