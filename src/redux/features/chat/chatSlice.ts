import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IChatInitialState {
  chatList: {
    _id?: string;
    courseId?: string;
    senderId: {
      _id: string;
      name: string;
    };
    message: string;
    createdAt: string;
    updatedAt: string;
  }[];
  onlineUsersList: {
    _id: string;
    name: string;
  }[];
  allUsersList: {
    _id: string;
    name: string;
  }[];
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
  onlineUsersList: [
    {
      _id: "",
      name: "",
    },
  ],
  allUsersList: [
    {
      _id: "",
      name: "",
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
    addOnlineUsersList: (state, action) => {
      state.onlineUsersList = action.payload.data;
    },
    removeOnlineUser: (state, action: PayloadAction<{ data: string }>) => {
      state.onlineUsersList = state.onlineUsersList.filter(
        (user) => user._id !== action.payload.data
      );
    },
    addOnlineUser: (state, action) => {
      state.onlineUsersList.push(action.payload.data);
    },
    addAllUsersList: (state, action) => {
      state.allUsersList = action.payload.data;
    },
  },
});

export const {
  addChatList,
  updateChatList,
  addOnlineUsersList,
  removeOnlineUser,
  addOnlineUser,
  addAllUsersList,
} = chatSlice.actions;
export default chatSlice.reducer;

// import { PayloadAction, createSlice } from "@reduxjs/toolkit";

// export interface IChatInitialState {
//   chatList: [
//     {
//       _id?: string;
//       courseId?: string;
//       senderId: {
//         _id: string;
//         name: string;
//       };
//       message: string;
//       createdAt: string;
//       updatedAt: string;
//     }
//   ];
//   onlineUsersList: [
//     {
//       _id: string;
//       name: string;
//     }
//   ];
// }
// export interface IOnlineUsersList {}

// const initialState: IChatInitialState = {
//   chatList: [
//     {
//       _id: "",
//       courseId: "",
//       senderId: {
//         _id: "",
//         name: "",
//       },
//       message: "",
//       createdAt: "",
//       updatedAt: "",
//     },
//   ],
//   onlineUsersList: [
//     {
//       _id: "",
//       name: "",
//     },
//   ],
// };

// const chatSlice = createSlice({
//   name: "chat",
//   initialState,
//   reducers: {
//     addChatList: (state, action) => {
//       state.chatList = action.payload.data;
//     },
//     updateChatList: (state, action) => {
//       state.chatList.push(action.payload.data);
//     },
//     addOnlineUsersList: (state, action) => {
//       state.onlineUsersList = action.payload.data;
//     },
//     removeOnlineUser: (state, action) => {
//       state.onlineUsersList = state.onlineUsersList.filter(
//         (user) => user._id !== action.payload.data
//       );
//     },
//   },
// });

// export const { addChatList, updateChatList, addOnlineUsersList } =
//   chatSlice.actions;
// export default chatSlice.reducer;
