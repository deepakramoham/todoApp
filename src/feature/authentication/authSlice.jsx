import { createSlice } from "@reduxjs/toolkit";
import { register, login } from "./authThunks";

const initialState = {
  // accessToken: null,
  // userId: null,
  // userName: "",
  // role: null,
  loading: false,
  error: null,
  auth: JSON.parse(localStorage?.getItem("auth")) || null,
  // authenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logOut: (state) => {
      state.auth = null;
    },
    resetStatus(state) {
      state.loading = false;
      state.error = false;
      state.auth = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
      .addCase(login.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.auth = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logOut, resetStatus } = authSlice.actions;
export default authSlice.reducer;
