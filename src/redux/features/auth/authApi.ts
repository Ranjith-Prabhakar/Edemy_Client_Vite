import { RegistrationReq, RegistrationRes,  } from "../../interfaces/authApi";
import { apiSlice } from "../api/apiSlice";
import { userLoggedIn, userLoggedOut } from "./authSlice";







export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation<RegistrationRes, RegistrationReq>({
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
        credentials: "include",
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
    //forgotPassword-------------------------------------------------------------------------------------
    forgotPasswordEmailSubmission: builder.mutation({
      query: (data) => ({
        url: "forgot_password_email_submission",
        method: "post",
        body: data,
        credentials: "include" as const,
      }),
    }),
    //forgotPassword otp verification-------------------------------------------------------------------------------------
    forgotPasswordOtpVerification: builder.mutation({
      query: (data) => ({
        url: "forgot_password_otp_verification",
        method: "post",
        body: data,
        credentials: "include" as const,
      }),
    }),
    //forgotPassword otp verification-------------------------------------------------------------------------------------
    resetPassword: builder.mutation({
      query: (data) => ({
        url: "/reset_forgot_password",
        method: "post",
        body: data,
        credentials: "include",
      }),
    }),
    //user log out-------------------------------------------------------------------------------------
    logout: builder.mutation({
      query: () => ({
        url: "logout",
        method: "post",
        credentials: "include",
      }),
      async onQueryStarted(arg,{queryFulfilled,dispatch}){
        try {
          await queryFulfilled;
          dispatch(userLoggedOut())
        } catch (error) {
          console.log(error)
        }
      }
    }),
  
  }),
});

export const {
  useRegisterMutation,
  useCreateUserMutation,
  useLoginMutation,
  useForgotPasswordEmailSubmissionMutation,
  useForgotPasswordOtpVerificationMutation,
  useResetPasswordMutation,
  useLogoutMutation
} = authApi;
