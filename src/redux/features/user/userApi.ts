import { apiSlice } from "../api/apiSlice";

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    toBeInstructor: builder.mutation({
      query: (data) => ({
        url: "be_instructor",
        method: "post",
        body: data,
        credentials: "include" as const,
      }),
    }),
  }),
});


export const {useToBeInstructorMutation} = userApi