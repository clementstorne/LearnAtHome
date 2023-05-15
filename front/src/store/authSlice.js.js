/** Store */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

/** Services */
import AuthService from "../services/AuthService";

const initialState = {
  token: null || localStorage.getItem("token"),
  isAuth: false,
};

export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }) => {
    const res = await AuthService.login({ email, password });
    return res.data;
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  // extraReducers: {
  //   [login.fulfilled]: (state, action) => {
  //     return [...action.payload];
  //   },
  // },
  extraReducers: (builder) => {
    builder.addCase(login, (state, action) => {
      state.entities.push(action.payload);
    });
  },
});

const { reducer } = authSlice;
export default reducer;
