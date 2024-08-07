import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./features/api/apiSlice";
import categorySlice from "./features/admin/Categories/categorySlice";
import authSlice from "./features/auth/authSlice";
import usersSlice from "./features/admin/Users/userSlice";
import instructorsSlice from "./features/admin/Instructors/instructorsSlice";
import instructorRequestSlice from "./features/admin/InstructorRequests/instructorRequestSlice";
import courseSlice from "./features/course/courseSlice";
import chatSlice from "./features/chat/chatSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer, // instead of exporting slice.reducer from api slice , it does here
    user: authSlice,
    category: categorySlice,
    users: usersSlice,
    instructors: instructorsSlice,
    instructorRequests: instructorRequestSlice,
    courses: courseSlice,
    chat: chatSlice,
  },
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

const initializeApp = async () => {
  // call the refresh token for every page load
  await store.dispatch(
    apiSlice.endpoints.refreshToken.initiate({}, { forceRefetch: true })
  );
  // call the load user for every page load
  await store.dispatch(
    apiSlice.endpoints.loadUser.initiate(undefined, { forceRefetch: true })
  );
};

initializeApp();

export type IState = typeof store;
