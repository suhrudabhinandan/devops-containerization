// src/redux/api/apiSlice.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = import.meta.env.VITE_BASE_URL_API;
export const teacherApi = createApi({
  reducerPath: "teacherApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers, { getState }) => {
    
      const token = getState()?.auth?.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
        console.log(token);
        
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    teacherSignup: builder.mutation({
      query: (teacherData) => ({
        url: "/Teacher/teacherSignup",
        method: "POST",
        body: teacherData,
      }),
    }),
    teacherLogin: builder.mutation({
      query: (loginData) => ({
        url: "/Teacher/teacherLogin",
        method: "POST",
        body: loginData,
      }),
    }),
  }),
});

export const { useTeacherSignupMutation, useTeacherLoginMutation } = teacherApi;
