import { apiSlice } from "../../api/apiSlice";
import { getRequests, approveRequest } from "./instructorRequestSlice";

const instructorsRequestApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getInstructorRequests: builder.query({
      query: () => ({
        url: "/admin/get_instructor_request",
        method: "get",
        credentials: "include" as const,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          console.log("getInstructorRequests .....", result.data.data);
          dispatch(getRequests({data:result.data.data}));
        } catch (error) {
          console.log(error);
        }
      },
    }),
  }),
});

export const { useGetInstructorRequestsQuery } = instructorsRequestApi;
