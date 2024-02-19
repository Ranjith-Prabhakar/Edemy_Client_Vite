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
    blockUser: (state, action) => {
      const index = state.usersData.findIndex(
        (item) => item.name === action.payload.userName
      );
      if (index !== -1) {
        state.usersData[index].status = "frozen";
      }
    },
    unBlockUser: (state, action) => {
      const index = state.usersData.findIndex(
        (item) => item.name === action.payload.userName
      );
      if (index !== -1) {
        state.usersData[index].status = "active";
      }
    },
    removeUser:(state,action)=>{
      state.usersData = state.usersData.filter((item)=>item._id !== action.payload.data)
      
    }
  },
});

export const { getUsers, blockUser, unBlockUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
