import { apiSlice } from "../api/apiSlice";
// import { userRegistration } from "./authSlice";

type RegistrationResponse = {
  message: string;
  activationToken: string;
};

type RegistrationData = {};

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation<RegistrationResponse, RegistrationData>({
      // apiendpint
      query: (data) => ({
        url: "register",
        method: "post",
        body: data,
        credentials: "include" as const,
      }),
      // transformResponse:res=>res.sort((a,b)=>a-b)
      // provideTags:["todos"] // to start  cached data
      //state updation after result

      // async onQueryStarted(arg, { queryFulfilled, dispatch }) {
      //   try {
      //     const result = await queryFulfilled;
      //     dispatch(
      //       userRegistration({
      //         token: result.data.activationToken,
      //       })
      //     );
      //   } catch (error: any) {
      //     console.log(error);
      //   }
      // },
    }),

    createUser: builder.mutation({
      query: (data) => ({
        url: "create_user",
        method:"post",
        body:data,
        credentials:"include" as const,
      }),
    }),

    //invalidateTags:["todos"] // for mutate the cache otherwise the cached one will remain the same even after we make any update
  }),
});

export const { useRegisterMutation,useCreateUserMutation  } = authApi;
