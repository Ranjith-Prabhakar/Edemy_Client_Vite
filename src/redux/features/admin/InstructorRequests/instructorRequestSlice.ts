import { createSlice } from "@reduxjs/toolkit";

export interface IInstructorRequest {
  userId: string;
  status: "approved" | "pending" | "rejected";
  qualification: string;
  consent: boolean;
  contract: string;
}

interface IInstructorState {
  isLoading: boolean;
  instructorRequest: IInstructorRequest[];
}

const initialState: IInstructorState = {
  isLoading: true,
  instructorRequest: [],
};

const instructorRequestSlice = createSlice({
  name: "instructorsRequest",
  initialState,
  reducers: {
    getRequests: (state, action) => {
      console.log("inside action action.payload", action.payload);
      console.log("inside action action.payload.data", action.payload.data);
      state.instructorRequest = action.payload.data;
    },
    approveorRejectRequest: (state, action) => {
      state.instructorRequest = state.instructorRequest.filter(
        (item) => item.userId !== action.payload.data
      );
    },
    //  getRequests:
  },
});

export const { getRequests, approveorRejectRequest } = instructorRequestSlice.actions;
export default instructorRequestSlice.reducer;
