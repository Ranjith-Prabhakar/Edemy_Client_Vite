import toast from "react-hot-toast";
import { apiSlice } from "../../api/apiSlice";
import { createCategory, getCategories } from "./categorySlice";

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
          if (!result.data.success) {
            toast.error(result.data.message);
          } else {
            dispatch(
              createCategory({
                data: result,
              })
            );
          }
        } catch (error) {
          console.log(error);
        }
      },
    }),

    fetchCategories: builder.query({
      query: () => ({
        url: "admin/get_categories",
        method: "get",
        credentials: "include" as const,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;

          dispatch(
            getCategories({
              data: result.data.data,
            })
          );
        } catch (error: any) {
          console.log(error);
        }
      },
    }),
  }),
});

export const { useCreateCategoryMutation, useFetchCategoriesQuery } =
  categoryApi;
