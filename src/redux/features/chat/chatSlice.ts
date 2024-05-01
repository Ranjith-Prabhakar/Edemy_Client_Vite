import { createSlice } from "@reduxjs/toolkit";

export interface IChatInitialState {
  chatList: [
    {
      _id?: string;
      courseId?: string;
      senderId: {
        _id: string;
        name: string;
      };
      message: string;
      createdAt: string;
      updatedAt?: string;
    }
  ];
}

const initialState: IChatInitialState = {
  chatList: [
    {
      _id: "",
      courseId: "",
      senderId: {
        _id: "",
        name: "",
      },
      message: "",
      createdAt: "",
      updatedAt: "",
    },
  ],
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    addChatList: (state, action) => {
      state.chatList = action.payload.data;
    },
    updateChatList: (state, action) => {
      state.chatList.push(action.payload.data);
    },
  },
});

export const { addChatList, updateChatList } = chatSlice.actions;
export default chatSlice.reducer
