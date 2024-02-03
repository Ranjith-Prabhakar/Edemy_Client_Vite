// import { createSlice } from "@reduxjs/toolkit";

// export interface ICategory {
//   name: string;
//   noOfCourses?: number;
//   status: "active" | "freez";
// }

// export interface ICategoryState1 {
//   isLoading: boolean;
//   categoryData: Array<ICategory>;
// }

// // interface Category {
// //   name: string;
// //   noOfCourses?: number;
// //   status: "active" | "freez";
// // }

// // export interface ICategoryState {
// //   loading: boolean;
// //   categoryData: Category[];
// // }

// const initialState = {
//   loading: true,
//   categoryData: [{} as ICategory],
// };

// const categorySlice = createSlice({
//   name: "category",
//   initialState,
//   reducers: {
//     getCategories: (state, action) => {
//       console.log("inside getCategories 1", action.payload.data);
//       state.loading = false;
//       state.categoryData = action.payload.data;
//       console.log("inside getCategories 3", state.categoryData);
//     },

//     createCategory: (state, action) => {
//       state.categoryData  = [...state.categoryData, action.payload.data];
//     },
//     freezCategory: (state, action) => {
//       const index = state.categoryData.findIndex(
//         (item) => item === action.payload.categoryName
//       );
//       state.categoryData[index] = action.payload;
//     },
//   },
// });

// export const { getCategories, createCategory, freezCategory } =
//   categorySlice.actions;

// export default categorySlice.reducer;



import { createSlice } from "@reduxjs/toolkit";

interface ICategory {
  name: string;
  noOfCourses?: number;
  status: "active" | "freez";
}

interface ICategoryState {
  isLoading: boolean;
  categoryData: ICategory[];
}

const initialState: ICategoryState = {
  isLoading: true,
  categoryData: [], // Initialize with an empty array
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    getCategories: (state, action) => {
      state.isLoading = false;
      state.categoryData = action.payload.data as ICategory[];
    },

    createCategory: (state, action) => {
      state.categoryData = [
        ...state.categoryData,
        action.payload.data as ICategory,
      ];
    },

    freezCategory: (state, action) => {
      const index = state.categoryData.findIndex(
        (item) => item.name === action.payload.categoryName
      );
      if (index !== -1) {
        state.categoryData[index].status = "freez"; // Update status directly
      }
    },
  },
});

export const { getCategories, createCategory, freezCategory } =
  categorySlice.actions;

export default categorySlice.reducer;
