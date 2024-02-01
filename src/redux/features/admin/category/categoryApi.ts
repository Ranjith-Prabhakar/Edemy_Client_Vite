import { apiSlice } from "../../api/apiSlice";
import { createCategory } from "./categorySlice";
const categoryApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createCategory: builder.mutation({
      query: (data) => ({
        url: "admin/add_category",
        method: "post",
        body: data,
        credentials: "include" as const,
      }),
      
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(
            createCategory({
              data: result,
            })
          );
        } catch (error) {
          console.log(error);
        }
      },
    }),
  }),
});

export const { useCreateCategoryMutation } = categoryApi;