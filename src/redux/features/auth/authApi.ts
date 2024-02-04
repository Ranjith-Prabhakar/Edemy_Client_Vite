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
  }),
});

export const {
  useRegisterMutation,
  useCreateUserMutation,
  useLoginMutation,
  useForgotPasswordEmailSubmissionMutation,
  useForgotPasswordOtpVerificationMutation,
  useResetPasswordMutation,
} = authApi;
