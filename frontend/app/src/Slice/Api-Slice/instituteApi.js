// src/services/instituteApiSlice.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


const BASE_URL= import.meta.env.VITE_BASE_URL_API;
export const instituteApi = createApi({
  reducerPath: "instituteApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = localStorage.getItem("studentToken");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getAllInstitutes: builder.query({
      query: () => "/Institute/allInstitue",
    }),
    getInstituteById: builder.query({
      query: (id) => `/Institute/getInstitute/${id}`,
    }),
    addInstitute: builder.mutation({
      query: (institute) => ({
        url: "/Institute/addInstitute",
        method: "POST",
        body: institute,
      }),
    }),
    updateInstitute: builder.mutation({
      query: ({ id, ...institute }) => ({
        url: `/Institute/updateInstitute/${id}`,
        method: "PUT",
        body: institute,
      }),
    }),
  }),
});

export const {
  useGetAllInstitutesQuery,
  useGetInstituteByIdQuery,
  useAddInstituteMutation,
  useUpdateInstituteMutation,
} = instituteApi;
