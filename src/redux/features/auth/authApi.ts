import { apiSlice } from "../api/apiSlice";
import { userRegistration } from "./authSlice";

type RegistrationResponse = {
  message: string;
  activationToken: string;
};

type RegistrationData = {}

export const authApi = apiSlice.injectEndpoints({
   endpoints: (builder) => ({
    register: builder.mutation<RegistrationResponse, RegistrationData>({
      // apiendpint
      query: (data) => ({
      url: "registration", 
        method: "post",
        body: data,
        credentials: "include" as const,
      }),
//state updation after result
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled; 
          dispatch(
            userRegistration({
              token: result.data.activationToken,
            })
          );
        } catch (error: any) {
          console.log(error);
        }
      },
    }),

     activation: builder.mutation({
      query: ({ activation_token, activation_code }) => ({
        url: "activate-user",
        method: "POST",
        body: { activation_token, activation_code },
      }),
    }),

  })
})

export const { useRegisterMutation, useActivationMutation } = authApi