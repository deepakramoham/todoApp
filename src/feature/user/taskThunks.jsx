import { createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../../services/apiClient";

export const fetchTasks = createAsyncThunk(
  "task/fetchTasks",
  async (_, { dispatch, signal }) => {
    const response = await apiClient.get(`/v1/task`, {
      signal,
    });
    return response?.data;
  },
);

export const postTask = createAsyncThunk("task/postTask", async (taskData) => {
  const response = await apiClient.post(`/v1/task`, taskData);
  return response?.data?.task;
});

export const deleteTask = createAsyncThunk(
  "task/deleteTask",
  async (deleteTaskId) => {
    const response = await apiClient.delete(`/v1/task/${deleteTaskId}`);

    return response?.data?.deletedId;
  },
);
