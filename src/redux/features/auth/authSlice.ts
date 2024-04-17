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
      state.userData = action.payload.data;
    },
    addTutorialIntoCourseArray: (state, action) => {
      state.userData = {
        ...state.userData,
        courses: [...state.userData.courses as string[], action.payload.data],
      };
    },
    userRoleChange:(state)=>{
      state.userData = {...state.userData,role:"instructor"}
      state.isLoading = false;
    }
  },
});

export const {
  userLoggedIn,
  userLoggedOut,
  addTutorialIntoCourseArray,
  userRoleChange,
} = authSlice.actions;
export default authSlice.reducer;

