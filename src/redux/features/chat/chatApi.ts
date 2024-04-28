import { apiSlice } from "../api/apiSlice";

export interface IAddMessageReq {
  courseId: string;
  message: string;
}

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
  }),
});

export const { useAddMessageMutation } = chatApi;
