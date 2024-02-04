import { apiSlice } from "../../api/apiSlice";
import { freezUser, getUsers } from "./userSlice";
import { IUser } from "./userSlice";

const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<IUser[], void>({
      query: () => ({
        url: "admin/get_users",
        method: "get",
        credentials: "include" as const,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(getUsers(result.data));
        } catch (error) {
          console.log(error);
        }
      },
    }),

    freezUser: builder.mutation<IUser, string>({
      query: (id) => ({
        url: `admin/freezUser/${id}`,
        method: "post",
        credentials: "include",
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          console.log("result.data", result.data);
          dispatch(freezUser(result.data));
        } catch (error) {
          console.log(error);
        }
      },
    }),
  }),
});

export const { useGetUsersQuery,useFreezUserMutation } = userApi;
