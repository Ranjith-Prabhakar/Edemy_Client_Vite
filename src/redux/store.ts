import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./features/api/apiSlice";
import categorySlice from "./features/admin/category/categorySlice";
import authSlice from "./features/auth/authSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer, // instead of exporting slice.reducer from api slice , it does here
    category: categorySlice,
    user: authSlice,
  },
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

const initializeApp = async () => {
  // call the refresh token for every page load
  // await store.dispatch(
  //   apiSlice.endpoints.refreshToken.initiate({}, { forceRefetch: true })
  // );
  // call the load user for every page load
  await store.dispatch(
    apiSlice.endpoints.loadUser.initiate({}, { forceRefetch: true })
  );
};

initializeApp();