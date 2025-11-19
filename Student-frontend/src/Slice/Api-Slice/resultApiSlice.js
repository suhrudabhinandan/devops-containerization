// src/Redux/slices/apiSlice/resultSlice.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


const BASE_URL= import.meta.env.VITE_BASE_URL_API;
export const resultApi = createApi({
  reducerPath: "resultApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
      const token =
        localStorage.getItem("studentToken") ||
        localStorage.getItem("teacherToken");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Result"],
  endpoints: (builder) => ({
    // Get all results
    getAllResults: builder.query({
      query: () => "/getAllResults",
      providesTags: ["Result"],
    }),

    // Get results by student ID
    getResultsByStudent: builder.query({
      query: (studentId) => `/Result/getResultsByStudent/${studentId}`,
      providesTags: ["Result"],
    }),
  }),
});

export const {
  useGetAllResultsQuery,
  useGetResultsByStudentQuery,
} = resultApi;