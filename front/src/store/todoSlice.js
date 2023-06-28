/** Store */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

/** Services */
import TodoService from "../services/TodoService";

const initialState = {
  todoList: [],
  isLoading: false,
  error: null,
};

export const createTodo = createAsyncThunk(
  "todos/createTodo",
  async (credentials, thunkAPI) => {
    try {
      const res = await TodoService.createTodo(credentials);
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

export const getAllTodos = createAsyncThunk(
  "todos/getAllTodos",
  async (thunkAPI) => {
    try {
      const res = await TodoService.getAllTodos();
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

export const updateTodo = createAsyncThunk(
  "todos/updateTodo",
  async (credentials, thunkAPI) => {
    const todoId = credentials.id;
    try {
      const res = await TodoService.updateTodo(todoId, credentials);
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

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    resetTodoState: (state) => {
      state.todoList = [];
      state.isLoading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createTodo.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createTodo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.todoList = [action.payload.todo, ...state.todoList];
      })
      .addCase(createTodo.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(getAllTodos.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAllTodos.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.todoList = action.payload.todos;
      })
      .addCase(getAllTodos.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(updateTodo.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateTodo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.todoList = state.todoList.map((todo) =>
          todo.id === action.payload.updatedTodo.id
            ? action.payload.updatedTodo
            : todo
        );
      })
      .addCase(updateTodo.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { resetTodoState } = todoSlice.actions;
export default todoSlice.reducer;
