import { createSlice } from "@reduxjs/toolkit";
import { fetchUsers, restrictUserAccess } from "./userThunks";

const initialState = {
  loading: false,
  error: null,
  users: [],
  searchUser: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    searchUser(state, action) {
      state.searchUser = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
      .addCase(restrictUserAccess.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(restrictUserAccess.fulfilled, (state, action) => {
        state.loading = false;
        state.users = state.users?.map((user) =>
          user?._id === action.payload?._id ? action.payload : user,
        );
      })
      .addCase(restrictUserAccess.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });
  },
});

export const { searchUser } = userSlice.actions;
export default userSlice.reducer;
