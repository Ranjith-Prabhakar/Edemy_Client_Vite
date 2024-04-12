import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"; // react specific rtk query
import { userLoggedIn } from "../auth/authSlice";
import { catchError } from "../../../utils/catchError";
import { IUser } from "../../interfaces/authApi";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASEURL,
  }),
  endpoints: (builder) => ({
    refreshToken: builder.query({
      query: () => ({
        url: "refresh",
        method: "get",
        credentials: "include",
      }),
    }),

    loadUser: builder.query<IUser,void>({
      query: () => ({
        url: "user_session",
        method: "GET",
        credentials: "include",
      }),
      async onQueryStarted(_args,{ queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(
            userLoggedIn({
              userData: result.data,
            })
          );
        } catch (error: unknown) {
          catchError(error);
        }
      },
    }),
  }),
});

export const {useLoadUserQuery} = apiSlice;
