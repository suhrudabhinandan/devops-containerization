import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = import.meta.env.VITE_BASE_URL_API;

export const attendanceApi = createApi({
  reducerPath: "attendanceApi",

  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = getState()?.auth?.token || localStorage.getItem("token");

      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),

  tagTypes: ["Attendance", "Student"],

  endpoints: (builder) => ({
    // 🌟 Get all students (with OR without instituteId)
    getStudents: builder.query({
      query: (instituteId) =>
        instituteId
          ? `Student/getAllStudents?instituteId=${instituteId}`
          : `Student/getAllStudents`,
      providesTags: ["Student"],
    }),

    // 🌟 Get attendance records by date
    getAttendanceByDate: builder.query({
      query: (date) => `/Attendance/Attendance/all?date=${date}`,
      providesTags: ["Attendance"],
    }),

    // 🌟 Mark attendance
    addAttendance: builder.mutation({
      query: (attendanceData) => ({
        url: `Attendance/markAttendance`,
        method: "POST",
        body: attendanceData,
      }),
      invalidatesTags: ["Attendance"],
    }),
  }),
});

export const {
  useGetStudentsQuery,
  useGetAttendanceByDateQuery,
  useAddAttendanceMutation,
} = attendanceApi;
