import { createSlice } from "@reduxjs/toolkit";

export interface ICategory {
  _id:string;
  name: string;
  noOfCourses?: number;
  status: "active" | "frozen";
}

export interface ICategoryState {
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
        state.categoryData[index].status = "frozen"; // Update status directly
      }
    },

    unfreezCategory: (state, action) => {
      const index = state.categoryData.findIndex(
        (item) => item.name === action.payload.categoryName
      );

      if (index !== -1) {
        state.categoryData[index].status = "active";
      }
    },
  },
});

export const { getCategories, createCategory, freezCategory, unfreezCategory } =
  categorySlice.actions;

export default categorySlice.reducer;
