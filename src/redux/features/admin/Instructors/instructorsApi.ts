import { IGetInstructorsRes } from "../../../interfaces/Instructor/getInstructors";
import { apiSlice } from "../../api/apiSlice";
import {
  getInstructor,
  blockInstructor,
  unBlockInstructor,
} from "./instructorsSlice";


const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getInstructors: builder.mutation<IGetInstructorsRes, { pageNo: number }>({
      query: (pageNo) => ({
        url: "admin/get_instructors",
        method: "post",
        body: pageNo,
        credentials: "include" as const,
      }),
      async onQueryStarted(_arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(getInstructor({data:result.data.data.data}));
        } catch (error) {
          console.log(error);
        }
      },
    }),

    freezInstructor: builder.mutation({
      query: (id: string) => ({
        url: `admin/freezUser/${id}`,
        method: "post",
        credentials: "include",
      }),
      async onQueryStarted(_arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;

          dispatch(blockInstructor({ userName: result.data.data.name }));
        } catch (error) {
          console.log(error);
        }
      },
    }),

    unFreezInstructor: builder.mutation({
      query: (id: string) => ({
        url: `admin/unFreezUser/${id}`,
        method: "post",
        credentials: "include",
      }),
      async onQueryStarted(_arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(unBlockInstructor({ userName: result.data.data.name }));
        } catch (error) {
          console.log(error);
        }
      },
    }),
  }),
});

export const {
  useGetInstructorsMutation,
  useFreezInstructorMutation,
  useUnFreezInstructorMutation,
} = userApi;

