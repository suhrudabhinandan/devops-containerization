import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = import.meta.env.VITE_BASE_URL_API;

export const announcementApi = createApi({
  reducerPath: "/announcementApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = getState()?.auth?.token;
      console.log("Token sent in headers:", token);

      if (token) {
        headers.set("Authorization", `Bearer ${token}`); // ✅ standard capitalization
      }

      return headers;
    },
  }),
  tagTypes: ["Announcement"],
  endpoints: (builder) => ({
    // Fetch all announcements
    getAnnouncements: builder.query({
      query: () => "/Announcement/allAnnouncement", // no leading slash
      providesTags: ["Announcement"],
    }),

    // Create a new announcement
    createAnnouncement: builder.mutation({
      query: (data) => ({
        url: "/Announcement/announcement",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Announcement"],
    }),

    // Update an existing announcement
    updateAnnouncement: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/Announcement/announcement/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Announcement"],
    }),

    // Delete an announcement
    deleteAnnouncement: builder.mutation({
      query: (id) => ({
        url: `/Announcement/announcement/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Announcement"],
    }),
  }),
});

// Export hooks for components
export const {
  useGetAnnouncementsQuery,
  useCreateAnnouncementMutation,
  useUpdateAnnouncementMutation,
  useDeleteAnnouncementMutation,
} = announcementApi;
