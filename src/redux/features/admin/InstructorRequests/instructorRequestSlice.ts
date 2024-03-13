import { createSlice } from "@reduxjs/toolkit";
import { IInstructorState } from "../../../interfaces/Admin/InstructorRequest";



const initialState: IInstructorState = {
  isLoading: true,
  instructorRequest: [],
};

const instructorRequestSlice = createSlice({
  name: "instructorsRequest",
  initialState,
  reducers: {
    getRequests: (state, action) => {
      state.instructorRequest = action.payload.data;
    },
    approveorRejectRequest: (state, action) => {
      state.instructorRequest = state.instructorRequest.filter(
        (item) => item.userId !== action.payload.data
      );
    },
  },
});

export const { getRequests, approveorRejectRequest } = instructorRequestSlice.actions;
export default instructorRequestSlice.reducer;
