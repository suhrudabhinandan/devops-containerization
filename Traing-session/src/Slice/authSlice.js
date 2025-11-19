// src/Slice/authSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: localStorage.getItem("token") || null,
  user: JSON.parse(localStorage.getItem("user")) || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
      localStorage.setItem("token", state.token);
      localStorage.setItem("user", JSON.stringify(state.user));
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
    loadFromStorage: (state) => {
      state.token = localStorage.getItem("token") || null;
      state.user = JSON.parse(localStorage.getItem("user")) || null;
    },
  },
});

export const { setCredentials, logout, loadFromStorage } = authSlice.actions;
export default authSlice.reducer;
