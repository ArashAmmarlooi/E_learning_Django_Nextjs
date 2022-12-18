import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Category, Course, Blog } from "@/types/types";
import { HYDRATE } from "next-redux-wrapper";
import { AnyAsyncThunk } from "@reduxjs/toolkit/dist/matchers";
const URL = process.env.API_URL


export const eLearningApi = createApi({
  reducerPath: "eLearningApi",
  baseQuery: fetchBaseQuery({ baseUrl: URL }),
  keepUnusedDataFor: 3600,
  // refetchOnMountOrArgChange: 900,
  // refetchOnFocus: true,
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  endpoints: (builder) => ({
    getCategory: builder.query<Category, void>({
      query: () => "category",
    }),
    getCourse: builder.query<Course, void>({
      query: () => "courses",
    }),
    getCourseByName: builder.query<Course, any>({
      query: (name) => `course/${name}`,
    }),
    getBlog: builder.query<Blog, void>({
      query: () => "blogs",
    }),
    getBlogByName: builder.query<Blog, any>({
      query: (name) => `blog/${name}`,
    }),
  }),
});

export const {
  useGetCategoryQuery,
  useGetCourseQuery,
  useGetBlogQuery,
  util: { getRunningOperationPromises },
} = eLearningApi;

export const {
  getCategory,
  getCourse,
  getBlog,
  getCourseByName,
  getBlogByName,
} = eLearningApi.endpoints;
