import { createSlice } from "@reduxjs/toolkit";

interface Category {
  name: string;
  noOfCourses?: number;
  status: "active" | "freez";
}

const initialState = {
  loading: true,
  categoryData: [] as Array<Category>,
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    getCategories: (state, action) => {
      state.loading = false;
      state.categoryData = action.payload.data;
    },
    createCategory: (state, action) => {
      state.categoryData = [...state.categoryData, action.payload.data];
    },
    freezCategory: (state, action) => {
      const index = state.categoryData.findIndex(
        (item) => item.name === action.payload.categoryName
      );
      state.categoryData[index] = action.payload;
    },
  },
});

export const { getCategories, createCategory, freezCategory } =
  categorySlice.actions;

export default categorySlice.reducer;


// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// import { createSlice } from "@reduxjs/toolkit";

// interface Category {
//   name: string;
//   noOfCourses?: number;
//   status: "active" | "freez";
// }

// // const initialState = {
// //   loading: true,
// //   categoryData: [] as Category[],
// // };
// const initialState = {
//   loading: true,
//   categoryData: [{} as Category],
// };

// const categorySlice = createSlice({
//   name: "category",
//   initialState,
//   reducers: {
//     getCategories: (state, action) => {
//       state.loading = false;
//       state.categoryData = action.payload.data;
//     },
//     createCategory: (state, action) => {
//       state.categoryData = [...state.categoryData, action.payload.data];
//     },
//     freezCategory: (state, action) => {
//       const index = state.categoryData.findIndex(
//         (item) => item.name === action.payload.categoryName
//       );
//       state.categoryData[index] = action.payload;
//     },
//   },
// });

// export const { getCategories, createCategory, freezCategory } =
//   categorySlice.actions;

// export default categorySlice.reducer;
