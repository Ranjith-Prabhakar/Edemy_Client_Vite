import { apiSlice } from "../../api/apiSlice";
import {
  getInstructor,
  blockInstructor,
  unBlockInstructor,
} from "./instructorsSlice";
import { IInstructor } from "./instructorsSlice";

const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getInstructors: builder.query<IInstructor[], void>({
      query: () => ({
        url: "admin/get_instructors",
        method: "get",
        credentials: "include" as const,
      }),
      async onQueryStarted(_arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(getInstructor(result.data));
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
  useGetInstructorsQuery,
  useFreezInstructorMutation,
  useUnFreezInstructorMutation,
} = userApi;
