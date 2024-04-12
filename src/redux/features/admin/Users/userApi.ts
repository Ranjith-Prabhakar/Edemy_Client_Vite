import { apiSlice } from "../../api/apiSlice";
import { blockUser, getUsers, unBlockUser } from "./userSlice";
import { IUser } from "./userSlice";

const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<IUser[], void>({
      query: () => ({
        url: "admin/get_users",
        method: "get",
        credentials: "include" as const,
      }),
      async onQueryStarted(_arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(getUsers(result.data));
        } catch (error) {
          console.log(error);
        }
      },
    }),

    freezUser: builder.mutation({
      query: (id: string) => ({
        url: `admin/freezUser/${id}`,
        method: "post",
        credentials: "include",
      }),
      async onQueryStarted(_arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(blockUser({ userName: result.data.data.name }));
        } catch (error) {
          console.log(error);
        }
      },
    }),

    unFreezUser: builder.mutation({
      query: (id: string) => ({
        url: `admin/unFreezUser/${id}`,
        method: "post",
        credentials: "include",
      }),
      async onQueryStarted(_arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(unBlockUser({ userName: result.data.data.name }));
        } catch (error) {
          console.log(error);
        }
      },
    }),
  }),
});

export const { useGetUsersQuery,useFreezUserMutation,useUnFreezUserMutation } = userApi;
