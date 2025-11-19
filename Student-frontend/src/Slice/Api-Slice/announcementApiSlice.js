import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL= import.meta.env.VITE_BASE_URL_API;

export const announcementApi = createApi({
  reducerPath: "announcementApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("studentToken");
      

      if (token) 
        headers.set("Authorization", `Bearer ${token}`);

      return headers;
    },
  }),
  tagTypes: ["Announcement"],
  endpoints: (builder) => ({
    getAnnouncements: builder.query({
      query: () => "/Announcement/allAnnouncement", 
      providesTags: ["Announcement"],
    }),
  }),
});

export const { useGetAnnouncementsQuery } = announcementApi;
