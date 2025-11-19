// src/app/store.js
import { configureStore } from "@reduxjs/toolkit";
import {studentAuthApi} from "../Slice/Api-Slice/StudentLoginSlice";
import {instituteApi} from "../Slice/Api-Slice/instituteApi";
import { attendanceApi } from "../Slice/Api-Slice/attendanceApiSlice";
import { announcementApi } from "../Slice/Api-Slice/announcementApiSlice";
import authReducer from "../Slice/AuthSlice";
import { resultApi } from "../Slice/Api-Slice/resultApiSlice";


export const store = configureStore({
  reducer: {
    auth: authReducer,                      
    [studentAuthApi.reducerPath]: studentAuthApi.reducer,
    [instituteApi.reducerPath]: instituteApi.reducer,
    [attendanceApi.reducerPath]: attendanceApi.reducer, 
    [announcementApi.reducerPath]: announcementApi.reducer,
    [resultApi.reducerPath]: resultApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(studentAuthApi.middleware)
      .concat(instituteApi.middleware) 
      .concat(attendanceApi.middleware)
      .concat(announcementApi.middleware)
      .concat(resultApi.middleware),
});

export default store;
