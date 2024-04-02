import { apiSlice } from "../../api/apiSlice";
import { getRequests, approveorRejectRequest } from "./instructorRequestSlice";
import { IInstructorAgreement } from "../../../interfaces/Instructor/generalInterfaces";
import {
  IapproveorRejectInstructorRequestsRes,
  IapproveorRejectInstructorRequestsReq,
} from "../../../interfaces/Instructor/approveorRejectInstructorRequests";

const instructorsRequestApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getInstructorRequests: builder.query({
      query: () => ({
        url: "/admin/get_instructor_request",
        method: "get",
        credentials: "include" as const,
      }),
      async onQueryStarted(_arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          console.log("getInstructorRequests .....", result.data.data);
          dispatch(getRequests({ data: result.data.data }));
        } catch (error) {
          console.log(error);
        }
      },
    }),

    approveorRejectInstructorRequests: builder.mutation<
      IapproveorRejectInstructorRequestsRes,
      IapproveorRejectInstructorRequestsReq
    >({
      query: (data) => ({
        method: "post",
        url: "/admin/instructor_approval_or_reject",
        body: data,
        credentials: "include" as const,
      }),
      async onQueryStarted(_arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          const data: IInstructorAgreement = result.data
            .data as IInstructorAgreement;
          dispatch(approveorRejectRequest({ data: data.userId }));
        } catch (error) {
          console.log(error);
        }
      },
    }),
  }),
});

export const {
  useGetInstructorRequestsQuery,
  useApproveorRejectInstructorRequestsMutation,
} = instructorsRequestApi;
