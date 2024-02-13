import { apiSlice } from "../api/apiSlice";

export interface AddModuleBody {
  fileName: string;
  contentType: string;
}

export const courseApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addModule: builder.mutation<string, AddModuleBody>({
      query: (data) => ({
        method: "post",
        url: "course/addModule",
        body: data,
        credentials: "include" as const,
      }),
    }),

    addToBucket: builder.mutation<any, { url: string;body:File,contentType: string }>({
      query: (data) => ({
        method: "put",
        url: data.url,
        body:data.body,
        headers: {
          "Content-Type": data.contentType,
        },
      }), 
    }),
  }),
});

export const { useAddModuleMutation, useAddToBucketMutation } = courseApi;
