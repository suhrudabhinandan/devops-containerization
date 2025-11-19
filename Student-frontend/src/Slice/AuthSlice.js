import { createSlice } from "@reduxjs/toolkit";
import {jwtDecode} from "jwt-decode";



const initialState = {
  name: null,
  token: null,
  institute_id: null,
};

const studentSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setStudent: (state, action) => {
      const { token } = action.payload;

      let decoded = {};
      try {
        decoded = jwtDecode(token); 
      } catch (err) {
        console.error("Invalid token:", err);
      }

      state.name = decoded.name || null;
      state.token = token || null;
      state.institute_id = decoded.institute_id || null;

      localStorage.setItem(
        "student",
        JSON.stringify({
          name: state.name,
          token: state.token,
          institute_id: state.institute_id,
        })
      );
    },

    updateStudent: (state, action) => {
      state.name = action.payload.name ?? state.name;
      state.token = action.payload.token ?? state.token;
      state.institute_id = action.payload.institute_id ?? state.institute_id;

      localStorage.setItem(
        "student",
        JSON.stringify({
          name: state.name,
          token: state.token,
          institute_id: state.institute_id,
        })
      );
    },

    clearStudent: (state) => {
      state.name = null;
      state.token = null;
      state.institute_id = null;
      localStorage.removeItem("student");
    },

    loadStudentFromStorage: (state) => {
      const stored = JSON.parse(localStorage.getItem("student"));
      state.name = stored?.name || null;
      state.token = stored?.token || null;
      state.institute_id = stored?.institute_id || null;
    },
  },
});

export const { setStudent, updateStudent, clearStudent, loadStudentFromStorage } =
  studentSlice.actions;

export default studentSlice.reducer;
