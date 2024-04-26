import toast from "react-hot-toast";
import { apiSlice } from "../../api/apiSlice";
import {
  createCategory,
  getCategories,
  freezCategory,
  unfreezCategory,
} from "./categorySlice";

const categoryApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createCategory: builder.mutation({
      query: (data) => ({
        url: "admin/add_category",
        method: "post",
        body: data,
        credentials: "include" as const,
      }),

      async onQueryStarted(_arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          if (!result.data.success) {
            toast.error(result.data.message);
          } else {
            dispatch(createCategory({ data: result.data.data })); // Use data.data
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
      async onQueryStarted(_arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(getCategories({ data: result.data.data })); // Use data directly
        } catch (error) {
          console.log(error);
        }
      },
    }),
    //freez category
    freezCategories: builder.mutation({
      query: (id: string) => ({
        url: `admin/freezCategory/${id}`,
        method: "post",
        credentials: "include" as const,
      }),

      async onQueryStarted(_arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(freezCategory({ categoryName: result.data.data.name }));
        } catch (error) {
          console.log(error);
        }
      },
    }),
    //unfreez
    unFreezCategories: builder.mutation({
      query: (id: string) => ({
        url: `admin/unFreezCategory/${id}`,
        method: "post",
        credentials: "include" as const,
      }),

      async onQueryStarted(_arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(unfreezCategory({ categoryName: result.data.data.name }));
        } catch (error) {
          console.log(error);
        }
      },
    }),
  }),
});

export const {
  useCreateCategoryMutation,
  useFetchCategoriesQuery,
  useFreezCategoriesMutation,
  useUnFreezCategoriesMutation,
} = categoryApi;
