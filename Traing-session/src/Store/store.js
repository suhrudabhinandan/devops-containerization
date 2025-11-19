// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import { teacherApi } from "../Slice/teacherRegisterSlice";
import { attendanceApi } from "../Slice/attendanceSlice";
import { announcementApi } from "../Slice/announcementSlice";
import authReducer from "../Slice/authSlice";
import { resultApi } from "../Slice/resultSlice";

export const store = configureStore({
  reducer: {
    [teacherApi.reducerPath]: teacherApi.reducer,       
    [attendanceApi.reducerPath]: attendanceApi.reducer, 
    [announcementApi.reducerPath]: announcementApi.reducer,
    [resultApi.reducerPath]: resultApi.reducer,
    auth: authReducer,                                   
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(teacherApi.middleware)
      .concat(attendanceApi.middleware)
      .concat(announcementApi.middleware)
      .concat(resultApi.middleware),
});

export default store;
