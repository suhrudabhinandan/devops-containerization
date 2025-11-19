import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const resultApi = createApi({
  reducerPath: "resultApi",

  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL_API,

    // Attach JWT token exactly like attendanceApi
    prepareHeaders: (headers, { getState }) => {
      const token = getState()?.auth?.token;

      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),

  tagTypes: ["Result"],

  endpoints: (builder) => ({

    // ➤ Create Result
    createResult: builder.mutation({
      query: (data) => ({
        url: "/Result/resultCreate",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Result"],
    }),

    // ➤ Get All Results
    getAllResults: builder.query({
      query: () => "/Result/getAllResults",
      providesTags: ["Result"],
    }),

    // ➤ Get Results by Student ID
    getResultsByStudent: builder.query({
      query: (studentId) => `/Result/getResultsByStudent/${studentId}`,
      providesTags: ["Result"],
    }),

    // ➤ Update Result
    updateResult: builder.mutation({
      query: ({ id, data }) => ({
        url: `/Result/updateResult/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Result"],
    }),

    // ➤ Delete Result
    deleteResult: builder.mutation({
      query: (id) => ({
        url: `/Result/deleteResult/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Result"],
    }),
  }),
});

export const {
  useCreateResultMutation,
  useGetAllResultsQuery,
  useGetResultsByStudentQuery,
  useUpdateResultMutation,
  useDeleteResultMutation,
} = resultApi;
