import { IAddModuleBody } from "../../interfaces/Course/addModule";
import {
  ICourseDataBody,
  ICourseDataBodyReq,
} from "../../interfaces/Course/addCourseData";
import { ICourseResponse } from "../../interfaces/Course/addCourseData";
import { IModuleVideoBody } from "../../interfaces/Course/addModuleVideos";

import { apiSlice } from "../api/apiSlice";
import {
  getCoursesState,
  getCourseseInProgressState,
  removeCourseAfterApprovalOrReject,
} from "./courseSlice";
import {
  ICourse,
  ICourseCategoryBaseResponse,
} from "../../interfaces/Course/generalInterface";
import { IAddCategoriesRes } from "../../interfaces/Course/getCategories";
import {
  IGetVideoForUserReq,
  IGetVideoForUserRes,
} from "../../interfaces/Course/getVideoForUser";
import { IEnrollReq, IEnrollRes } from "../../interfaces/Course/enrollCourse";
import { catchError } from "../../../utils/catchError";
import { addTutorialIntoCourseArray, userLoggedIn } from "../auth/authSlice";
import { IPaymentStatusReq } from "../../interfaces/Course/paymentStatus";
import { ICloudStorageResponse } from "../../interfaces/CloudStorage/CloudStorageResponse";

export const courseApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCourseInProgress: builder.query<ICourseDataBody, void>({
      query: () => ({
        method: "get",
        url: "course/get_course_in_progress",
        credentials: "include" as const,
      }),
    }),
    addFileToCloud: builder.mutation<string, IAddModuleBody>({
      query: (data) => ({
        method: "post",
        url: "course/addFileToCloud",
        body: data,
        credentials: "include" as const,
      }),
    }),

    addCourseData: builder.mutation<ICourseDataBody, ICourseDataBodyReq>({
      query: (data) => ({
        method: "post",
        url: "course/addCourseData",
        body: data,
        credentials: "include" as const,
      }),
      async onQueryStarted(_arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          console.log("result from courseApi  > getCoursesInRequest", result);
          console.log(
            "result from courseApi  > getCoursesInRequest",
            result.data.data
          );
          dispatch(addTutorialIntoCourseArray({ data: result.data.data._id }));
        } catch (error) {
          catchError(error);
        }
      },
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
      async onQueryStarted(_arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          console.log("result from courseApi  > getCourses", result);
          dispatch(getCoursesState({ data: result.data.data }));
        } catch (error) {
          catchError(error);
        }
      },
    }),

    getCoursesInRequest: builder.query<ICourseResponse, void>({
      query: () => ({
        method: "get",
        url: "course/get_courses_in_Request",
        credentials: "include" as const,
      }),
      async onQueryStarted(_arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          console.log(
            "result from courseApi  > getCoursesInRequest",
            result.data.data
          );
          dispatch(getCourseseInProgressState({ data: result.data.data }));
        } catch (error) {
          catchError(error);
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

      async onQueryStarted(_arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          const data = result?.data?.data as ICourse;
          dispatch(
            removeCourseAfterApprovalOrReject({
              data: data?._id as string,
            })
          );
        } catch (error) {
          catchError(error);
        }
      },
    }),

    getCoursesForUser: builder.query<ICourseResponse, void>({
      query: () => ({
        method: "get",
        url: "course/get_courses_for_user",
        credentials: "include" as const,
      }),

      async onQueryStarted(_arg, { queryFulfilled }) {
        try {
          const result = await queryFulfilled;
          console.log(
            "result from getCoursesForUser  > getCoursesForUser",
            result
          );
          // dispatch(getCoursesState({ data: result.data.data }));
        } catch (error) {
          catchError(error);
        }
      },
    }),

    getCategory: builder.query<IAddCategoriesRes, void>({
      query: () => ({
        method: "get",
        url: "course/get_categories",
        credentials: "include" as const,
      }),
    }),

    getVideoForUser: builder.mutation<IGetVideoForUserRes, IGetVideoForUserReq>(
      {
        query: (data) => ({
          method: "post",
          url: "course/get_video_for_user",
          body: data,
          credentials: "include" as const,
        }),
      }
    ),

    getVideoForVisitors: builder.mutation<
      IGetVideoForUserRes,
      IGetVideoForUserReq
    >({
      query: (data) => ({
        method: "post",
        url: "course/get_video_for_visitors",
        body: data,
        credentials: "include" as const,
      }),
    }),

    enrollCourse: builder.mutation<IEnrollRes, IEnrollReq[]>({
      query: (data) => ({
        method: "post",
        body: data,
        url: "course/enroll_course",
        credentials: "include" as const,
      }),
    }),

    paymentStatus: builder.mutation<
      IPaymentStatusReq,
      { paymentStatus: boolean }
    >({
      query: (data) => ({
        method: "post",
        url: "course/payment_status",
        body: data,
        credentials: "include" as const,
      }),

      async onQueryStarted(_arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          console.log("result from onquery courseApi", result.data);
          dispatch(
            userLoggedIn({
              userData: result.data.data,
            })
          );
        } catch (error) {
          catchError(error);
        }
      },
    }),

    getThumbnailImagesPreSignedUrl: builder.mutation<
      ICloudStorageResponse,
      { thumbnail: string }
    >({
      query: (data) => ({
        method: "post",
        body: data,
        url: "course/get_thumbnail_image_presigned_url",
      }),
    }),

    getUserEnrolledCourses: builder.mutation<
      ICourseResponse,
      { courses: string[] }
    >({
      query: (data) => ({
        method: "post",
        url: "course/get_user_enrolled_courses",
        body: data,
        credentials: "include",
      }),
    }),

    getCourseByCategory: builder.mutation<
      ICourseCategoryBaseResponse,
      {
        category: string;
        pageNumber: number;
        frequency: number;
        sort?: string;
        filter?: string;
      }
    >({
      query: (data) => ({
        method: "post",
        url: "/course/get_courses_by_category",
        body: data,
      }),
    }),

    getCourseForSearch: builder.mutation<
      ICourseCategoryBaseResponse,
      {
        key: string;
        pageNumber: number;
        frequency: number;
        sort?: string;
        filter?: string;
      }
    >({
      query: (data) => ({
        method: "post",
        url: "/course/get_courses_for_search",
        body: data,
      }),
    }),

    getInstructorTutorial: builder.mutation<
      ICourseResponse,
      { courses: string[] }
    >({
      query: (data) => ({
        method: "post",
        url: "course/get_instructor_tutorials",
        body: data,
        credentials: "include",
      }),
    }),

    //22
    setVideoTrack: builder.mutation<void,>({
      query: (data) => ({
        method: "post",
        url: "course/set_video_track",
        body: data,
        credentials: "include" as const,
      }),
    }),

    // ______________________________
  }),
});

export const {
  useGetCourseInProgressQuery,
  useAddFileToCloudMutation,
  useAddCourseDataMutation,
  useAddToBucketMutation,
  useUpdateCourseMutation,
  useAddModuleVideosMutation,
  useGetCoursesQuery,
  useGetCoursesInRequestQuery,
  useGetVideoMutation,
  useApproveOrRejectCourseMutation,
  useGetCoursesForUserQuery,
  useGetCategoryQuery,
  useGetVideoForUserMutation,
  useGetVideoForVisitorsMutation,
  useEnrollCourseMutation,
  usePaymentStatusMutation,
  useGetThumbnailImagesPreSignedUrlMutation,
  useGetUserEnrolledCoursesMutation,
  useGetCourseByCategoryMutation,
  useGetCourseForSearchMutation,
  useGetInstructorTutorialMutation,
} = courseApi;

// ===========================================================
// import { IAddModuleBody, IAddModuleResponse } from "../../interfaces/Course/addModule";
// import { ICourseDataBody } from "../../interfaces/Course/addCourseData";
// import { ICourseResponse } from "../../interfaces/Course/addCourseData";
// import { IModuleVideoBody } from "../../interfaces/Course/addModuleVideos";

// import { apiSlice } from "../api/apiSlice";
// import {
//   getCoursesState,
//   getCourseseInProgressState,
//   removeCourseAfterApprovalOrReject,
// } from "./courseSlice";
// import { ICloudStorageResponse } from "../../../@types/cloudStorage";
// import { ICourse } from "../../interfaces/Course/generalInterface";

// export const courseApi = apiSlice.injectEndpoints({
//   endpoints: (builder) => ({
//     getCourseInProgress: builder.query<ICourseDataBody, void>({
//       query: () => ({
//         method: "get",
//         url: "course/get_course_in_progress",
//         credentials: "include" as const,
//       }),
//     }),
//     addModule: builder.mutation<IAddModuleResponse, IAddModuleBody>({
//       query: (data) => ({
//         method: "post",
//         url: "course/addModule",
//         body: data,
//         credentials: "include" as const,
//       }),
//     }),

//     addCourseData: builder.mutation<ICourseResponse, ICourseDataBody>({
//       query: (data) => ({
//         method: "post",
//         url: "course/addCourseData",
//         body: data,
//         credentials: "include" as const,
//       }),
//     }),

//     addToBucket: builder.mutation<
//       any,
//       { url: string; body: File; contentType: string }
//     >({
//       query: (data) => ({
//         method: "put",
//         url: data.url,
//         body: data.body,
//         headers: {
//           "Content-Type": data.contentType,
//         },
//       }),
//     }),

//     updateCourse: builder.mutation<ICourseResponse, { [key: string]: string }>({
//       query: (data) => ({
//         method: "post",
//         url: "course/updateCourse",
//         body: data,
//         credentials: "include" as const,
//       }),
//     }),

//     addModuleVideos: builder.mutation<ICourseResponse, IModuleVideoBody>({
//       query: (data) => ({
//         method: "post",
//         url: "course/add_Module_Videos",
//         body: data,
//         credentials: "include" as const,
//       }),
//     }),

//     getCourses: builder.query<ICourseResponse, void>({
//       query: () => ({
//         method: "get",
//         url: "course/get_courses",
//         credentials: "include" as const,
//       }),
//       async onQueryStarted(arg, { queryFulfilled, dispatch }) {
//         try {
//           const result = await queryFulfilled;
//           console.log("result from courseApi  > getCourses", result);
//           dispatch(getCoursesState({ data: result.data.data }));
//         } catch (error) {
//           console.log(
//             "error message from courseApi -> getCourse endPoint : ",
//             error.message
//           );
//         }
//       },
//     }),

//     getCoursesInRequest: builder.query<ICourseResponse, void>({
//       query: () => ({
//         method: "get",
//         url: "course/get_courses_in_Request",
//         credentials: "include" as const,
//       }),
//       async onQueryStarted(arg, { queryFulfilled, dispatch }) {
//         try {
//           const result = await queryFulfilled;
//           console.log(
//             "result from courseApi  > getCoursesInRequest",
//             result.data.data
//           );
//           dispatch(getCourseseInProgressState({ data: result.data.data }));
//         } catch (error) {
//           console.log(
//             "error message from courseApi -> getCoursesInRequest endPoint : ",
//             error.message
//           );
//         }
//       },
//     }),

//     getVideo: builder.mutation<ICloudStorageResponse, { videoName: string }>({
//       query: (data) => ({
//         method: "post",
//         url: "course/get_video",
//         body: data,
//         credentials: "include" as const,
//       }),
//     }),

//     approveOrRejectCourse: builder.mutation<
//       ICourseResponse,
//       { courseId: string; action: "approved" | "rejected" }
//     >({
//       query: (data) => ({
//         method: "post",
//         url: "course/approve_or_reject_course",
//         body: data,
//         credentials: "include" as const,
//       }),

//       async onQueryStarted(arg, { queryFulfilled, dispatch }) {
//         try {
//           const result = await queryFulfilled;
//           const data = result?.data?.data as ICourse;
//           dispatch(
//             removeCourseAfterApprovalOrReject({
//               data: data?._id as string,
//             })
//           );
//         } catch (error) {
//           console.log(
//             "error message from courseApi -> getCoursesInRequest endPoint : ",
//             error.message
//           );
//         }
//       },
//     }),

//     getCoursesForUser: builder.query<ICourseResponse, void>({
//       query: () => ({
//         method: "get",
//         url: "course/get_courses_for_user",
//         credentials: "include" as const,
//       }),

//       async onQueryStarted(arg, { queryFulfilled, dispatch }) {
//         try {
//           const result = await queryFulfilled;
//           console.log(
//             "result from getCoursesForUser  > getCoursesForUser",
//             result
//           );
//           // dispatch(getCoursesState({ data: result.data.data }));
//         } catch (error) {
//           console.log(
//             "error message from courseApi -> getCourse endPoint : ",
//             error.message
//           );
//         }
//       },
//     }),
//   }),
// });

// export const {
//   useGetCourseInProgressQuery,
//   useAddModuleMutation,
//   useAddCourseDataMutation,
//   useAddToBucketMutation,
//   useUpdateCourseMutation,
//   useAddModuleVideosMutation,
//   useGetCoursesQuery,
//   useGetCoursesInRequestQuery,
//   useGetVideoMutation,
//   useApproveOrRejectCourseMutation,
//   useGetCoursesForUserQuery
// } = courseApi;
