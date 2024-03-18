import { createSlice } from "@reduxjs/toolkit";
import { IUser, IUserState } from "../../interfaces/authApi";




const initialState: IUserState = {
  isLoading: true,
  userData: {} as IUser,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userLoggedIn: (state, action) => {
      state.userData = action.payload.userData;
      state.isLoading = false;
    },
    userLoggedOut: (state, action) => {
      console.log("inside userLoggedOut");
      state.userData = action.payload.data;
      console.log("inside userLoggedOut", state.userData);
    },
    addTutorialIntoCourseArray: (state, action) => {
      state.userData = {
        ...state.userData,
        courses: [...state.userData.courses as string[], action.payload.data],
      };
    },
  },
});

export const { userLoggedIn, userLoggedOut, addTutorialIntoCourseArray } =
  authSlice.actions;
export default authSlice.reducer;

