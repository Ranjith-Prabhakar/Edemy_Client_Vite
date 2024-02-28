import { IAddModuleBody } from "../../interfaces/Course/addModule";
import { ICourseDataBody } from "../../interfaces/Course/addCourseData";
import { ICourseResponse } from "../../interfaces/Course/addCourseData";
import { IModuleVideoBody } from "../../interfaces/Course/addModuleVideos";

import { apiSlice } from "../api/apiSlice";
import {
  getCoursesState,
  getCourseseInProgressState,
  removeCourseAfterApprovalOrReject,
} from "./courseSlice";
import { ICloudStorageResponse } from "../../../@types/cloudStorage";
import { ICourse } from "../../interfaces/Course/generalInterface";

export const courseApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCourseInProgress: builder.query<ICourseDataBody, void>({
      query: () => ({
        method: "get",
        url: "course/get_course_in_progress",
        credentials: "include" as const,
      }),
    }),
    addModule: builder.mutation<string, IAddModuleBody>({
      query: (data) => ({
        method: "post",
        url: "course/addModule",
        body: data,
        credentials: "include" as const,
      }),
    }),

    addCourseData: builder.mutation<ICourseResponse, ICourseDataBody>({
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

    updateCourse: builder.mutation<ICourseResponse, { [key: string]: string }>({
      query: (data) => ({
        method: "post",
        url: "course/updateCourse",
        body: data,
        credentials: "include" as const,
      }),
    }),

    addModuleVideos: builder.mutation<ICourseResponse, IModuleVideoBody>({
      query: (data) => ({
        method: "post",
        url: "course/add_Module_Videos",
        body: data,
        credentials: "include" as const,
      }),
    }),

    getCourses: builder.query<ICourseResponse, void>({
      query: () => ({
        method: "get",
        url: "course/get_courses",
        credentials: "include" as const,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          console.log("result from courseApi  > getCourses", result);
          dispatch(getCoursesState({ data: result.data.data }));
        } catch (error) {
          console.log(
            "error message from courseApi -> getCourse endPoint : ",
            error.message
          );
        }
      },
    }),

    getCoursesInRequest: builder.query<ICourseResponse, void>({
      query: () => ({
        method: "get",
        url: "course/get_courses_in_Request",
        credentials: "include" as const,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          console.log(
            "result from courseApi  > getCoursesInRequest",
            result.data.data
          );
          dispatch(getCourseseInProgressState({ data: result.data.data }));
        } catch (error) {
          console.log(
            "error message from courseApi -> getCoursesInRequest endPoint : ",
            error.message
          );
        }
      },
    }),

    getVideo: builder.mutation<ICloudStorageResponse, { videoName: string }>({
      query: (data) => ({
        method: "post",
        url: "course/get_video",
        body: data,
        credentials: "include" as const,
      }),
    }),

    approveOrRejectCourse: builder.mutation<
      ICourseResponse,
      { courseId: string; action: "approved" | "rejected" }
    >({
      query: (data) => ({
        method: "post",
        url: "course/approve_or_reject_course",
        body: data,
        credentials: "include" as const,
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          const data = result?.data?.data as ICourse;
          dispatch(
            removeCourseAfterApprovalOrReject({
              data: data?._id as string,
            })
          );
        } catch (error) {
          console.log(
            "error message from courseApi -> getCoursesInRequest endPoint : ",
            error.message
          );
        }
      },
    }),

    getCoursesForUser: builder.query<ICourseResponse, void>({
      query: () => ({
        method: "get",
        url: "course/get_courses_for_user",
        credentials: "include" as const,
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          console.log(
            "result from getCoursesForUser  > getCoursesForUser",
            result
          );
          // dispatch(getCoursesState({ data: result.data.data }));
        } catch (error) {
          console.log(
            "error message from courseApi -> getCourse endPoint : ",
            error.message
          );
        }
      },
    }),

  }),
});

export const {
  useGetCourseInProgressQuery,
  useAddModuleMutation,
  useAddCourseDataMutation,
  useAddToBucketMutation,
  useUpdateCourseMutation,
  useAddModuleVideosMutation,
  useGetCoursesQuery,
  useGetCoursesInRequestQuery,
  useGetVideoMutation,
  useApproveOrRejectCourseMutation,
  useGetCoursesForUserQuery
} = courseApi;
