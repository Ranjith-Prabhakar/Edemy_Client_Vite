import { createSlice } from "@reduxjs/toolkit";

interface Category {
  categoryName: string;
  numberOfCourses: number;
  status: string | number;
}

const initialState = {
  loading: true,
  categoryData: [] as Category[],
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    getCategories: (state, action) => {
      state.loading = false;
      state.categoryData = action.payload;
    },
    createCategory: (state, action) => {
      state.categoryData = [...state.categoryData, action.payload];
    },
    freezCategory: (state, action) => {
      const index = state.categoryData.findIndex(
        (item) => item.categoryName === action.payload.categoryName
      );
      state.categoryData[index] = action.payload;
    },
  },
});

export const { getCategories, createCategory, freezCategory } =
  categorySlice.actions;

export default categorySlice.reducer;
