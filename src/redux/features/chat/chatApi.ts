import { IAddMessageReq } from "../../interfaces/chat/addMessage";
import {
  IGetMessageReq,
  IGetMessageRes,
} from "../../interfaces/chat/getMessage";
import {
  IGetOnlineUsersReq,
  IGetOnlineUsersRes,
} from "../../interfaces/chat/getOnlineUsers";
import { apiSlice } from "../api/apiSlice";

export const chatApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addMessage: builder.mutation<void, IAddMessageReq>({
      query: (data) => ({
        method: "post",
        url: "chat/add_message",
        body: data,
        credentials: "include",
      }),
    }),
    //
    getMessages: builder.mutation<IGetMessageRes, IGetMessageReq>({
      query: (data) => ({
        method: "post",
        url: "chat/get_message",
        body: data,
        credentials: "include",
      }),
    }),
    //
    getOnlineUsers: builder.mutation<IGetOnlineUsersRes, IGetOnlineUsersReq>({
      query: (courseId) => ({
        method: "post",
        body: courseId,
        url: "chat/get_online_users",
        credentials: "include",
      }),
    }),
    // ----
  }),
});

export const {
  useAddMessageMutation,
  useGetMessagesMutation,
  useGetOnlineUsersMutation,
} = chatApi;
