import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setStudent } from "../AuthSlice";

const BASE_URL= import.meta.env.VITE_BASE_URL_API;

export const studentAuthApi = createApi({
  reducerPath: "studentAuthApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("studentToken");
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    loginStudent: builder.mutation({
      query: ({ name, password }) => ({
        url: "User/Login",
        method: "POST",
        body: { name, password },
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const result = await queryFulfilled;
          const data = result.data;
          if (data?.token) {
            dispatch(setStudent({ token: data.token }));
            localStorage.setItem("studentToken", data.token);
          }
        } catch (err) {
          console.error("Student login failed:", err);
        }
      }
      ,
    }),
  }),
});

export const { useLoginStudentMutation } = studentAuthApi;
