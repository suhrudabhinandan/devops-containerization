// src/Redux/slices/apiSlice/attendanceSlice.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL= import.meta.env.VITE_BASE_URL_API;

export const attendanceApi = createApi({
  reducerPath: "attendanceApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL, 
    prepareHeaders: (headers) => {
      const token =
        localStorage.getItem("studentToken") ||
        localStorage.getItem("teacherToken"); 
        // console.log(token);
      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),

  endpoints: (builder) => ({
   
    getAttendanceByStudentId: builder.query({
      query: (studentId) => `Attendance/student/${studentId}`,
    }),

    getAllAttendance: builder.query({
      query: () => `/all`,
    }),
  }),
});

export const {
  useGetAttendanceByStudentIdQuery,
  useGetAllAttendanceQuery,
} = attendanceApi;
