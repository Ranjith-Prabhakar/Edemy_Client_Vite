import { createSlice } from "@reduxjs/toolkit";

export interface IUser {
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

interface IUserState {
  isLoading: boolean;
  usersData: IUser[];
}

const initialState: IUserState = {
  isLoading: true,
  usersData: [], // Initialize with an empty array
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    getUsers: (state, action) => {
      state.usersData = action.payload.data;
      state.isLoading = false;
    },
    freezUser:(state,action)=>{
      const index = state.usersData.findIndex(
        (item) => item.name === action.payload.userName
      );
      if (index !== -1) {
        state.usersData[index].status = "frozen"; // Update status directly
      }
    }
  },
});

export const { getUsers, freezUser } = userSlice.actions;
export default userSlice.reducer;
