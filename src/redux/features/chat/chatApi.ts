import { IAddMessageReq } from "../../interfaces/chat/addMessage";
import {
  IGetMessageReq,
  IGetMessageRes,
} from "../../interfaces/chat/getMessage";
import { apiSlice } from "../api/apiSlice";
// import { addChatList } from "./chatSlice";

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
    // ----
  }),
});

export const { useAddMessageMutation, useGetMessagesMutation } = chatApi;
