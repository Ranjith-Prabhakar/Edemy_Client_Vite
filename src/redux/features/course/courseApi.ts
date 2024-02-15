import { IAddModuleBody } from "../ResponseInterfaces/Course/addModule";
import { ICourseDataBody } from "../ResponseInterfaces/Course/addCourseData";
import { ICourseResponse } from "../ResponseInterfaces/Course/addCourseData";
import { apiSlice } from "../api/apiSlice";

export const courseApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addModule: builder.mutation<string, IAddModuleBody>({
      query: (data) => ({
        method: "post",
        url: "course/addModule",
        body: data,
        credentials: "include" as const,
      }),
    }),

    addCourseData: builder.mutation<ICourseResponse,ICourseDataBody>({
      query: (data) => ({
        method: "post",
        url: "course/addCourseData",
        body: data,
        credentials: "include" as const,
      }),
    }),

    addToBucket: builder.mutation<
      any,
      { url: string; body: File; contentType: string }
    >({
      query: (data) => ({
        method: "put",
        url: data.url,
        body: data.body,
        headers: {
          "Content-Type": data.contentType,
        },
      }),
    }),
  }),
});

export const { useAddModuleMutation, useAddCourseDataMutation,useAddToBucketMutation } = courseApi;
