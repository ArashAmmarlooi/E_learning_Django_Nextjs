import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface Course {
  course: Array<Object>;
  error: String;
  isLoading: Boolean;
}

const initialState: Course = {
  course: [],
  error: "",
  isLoading: true,
};

export const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {
    fetchCourse: (state, action) => {
      state.course = [...state.course, action.payload];
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.course,
      };
    },
  },
});

export const { fetchCourse } = courseSlice.actions;
export default courseSlice.reducer;
