import { createSlice } from "@reduxjs/toolkit";
import { fetchTasks, postTask, deleteTask } from "./taskThunks";

const initialState = {
  tasks: [],
  searchTask: "",
  loading: false,
  error: null,
};

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    searchTask(state, action) {
      state.searchTask = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
      .addCase(postTask.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(postTask.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = [...state.tasks, action.payload];
      })
      .addCase(postTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
      .addCase(deleteTask.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = state?.tasks?.filter(
          (task) => task?._id !== action?.payload,
        );
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });
  },
});

export const { searchTask } = taskSlice.actions;

export default taskSlice.reducer;
