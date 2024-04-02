import { INotificationResponse } from "../../interfaces/notifications/notifications";
import { apiSlice } from "../api/apiSlice";

export const notificationApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getNotifications: builder.query<INotificationResponse, void>({
      query: () => ({
        method: "get",
        url: "/get_notifications",
        credentials: "include" as const,
      }),
    }),

    editNotification: builder.mutation<
      { success: boolean; message: string },
      { notificationHead: string }
    >({
      query: (data) => ({
        method: "post",
        url: "/update_notification",
        body: data,
        credentials: "include" as const,
      }),
    }),
  }),
});

export const { useGetNotificationsQuery, useEditNotificationMutation } =
  notificationApi;
