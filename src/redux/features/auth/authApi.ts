import { apiSlice } from "../api/apiSlice";
import { userLoggedIn } from "./authSlice";

type RegistrationResponse = {
  message: string;
  activationToken: string;
};

type RegistrationData = {};

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation<RegistrationResponse, RegistrationData>({
      // api endpoint
      // Register -----------------------------------------------------------------------------
      query: (data) => ({
        url: "register",
        method: "post",
        body: data,
        credentials: "include" as const,
      }),
    }),
    // create user -----------------------------------------------------------------------------
    createUser: builder.mutation({
      query: (data) => ({
        url: "create_user",
        method: "post",
        body: data,
        credentials: "include" as const,
      }),
    }),
    // login -----------------------------------------------------------------------------
    login: builder.mutation({
      query: (data) => ({
        url: "login",
        method: "post",
        body: data,
        credentials:"include"
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(
            userLoggedIn({
              userData: result.data,
            })
          );
        } catch (error: any) {
          console.log(error);
        }
      },
    }),
  }),
});

export const { useRegisterMutation, useCreateUserMutation, useLoginMutation } =
  authApi;
