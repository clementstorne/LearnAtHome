/** Store */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

/** Services */
import TaskService from "../services/TaskService";

const initialState = {
  tasksList: [],
  isLoading: false,
  error: null,
};

export const getAllTasks = createAsyncThunk(
  "tasks/getAllTasks",
  async (thunkAPI) => {
    try {
      const res = await TaskService.getAllTasks();
      if (res.status >= 200 && res.status <= 209) {
        return res.data;
      } else {
        return thunkAPI.rejectWithValue(res.errorr);
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateTask = createAsyncThunk(
  "tasks/updateTask",
  async (credentials, thunkAPI) => {
    const taskId = credentials.taskId;
    try {
      const res = await TaskService.updateTask(taskId, credentials);
      if (res.status >= 200 && res.status <= 209) {
        return res.data;
      } else {
        return thunkAPI.rejectWithValue(res.errorr);
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const taskSlice = createSlice({
  name: "task",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getAllTasks.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAllTasks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.tasksList = action.payload.tasks;
      })
      .addCase(getAllTasks.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(updateTask.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.tasksList = state.tasksList.map((task) =>
          task.id === action.payload.updatedTask.id
            ? action.payload.updatedTask
            : task
        );
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

// export const { logout } = authSlice.actions;
export default taskSlice.reducer;
