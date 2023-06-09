/** Store */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

/** Services */
import UserService from "../services/UserService";

const initialState = {
  id: null,
  name: "",
  email: "",
  profilePicture: null,
  isLoading: false,
  error: null,
};

export const getData = createAsyncThunk("user/getData", async (thunkAPI) => {
  try {
    const res = await UserService.getUserData();
    if (res.status >= 200 && res.status <= 209) {
      return res.data;
    } else {
      return thunkAPI.rejectWithValue(res.errorr);
    }
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const updateProfile = createAsyncThunk(
  "user/update",
  async (formData, thunkAPI) => {
    try {
      const res = await UserService.updateUserProfile(formData);
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

const userSlice = createSlice({
  name: "user",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.id = action.payload.data.id;
        state.name = action.payload.data.name;
        state.email = action.payload.data.email;
        state.profilePicture = action.payload.data.imageUrl;
      })
      .addCase(getData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(updateProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.id = action.payload.user.id;
        state.name = action.payload.user.name;
        state.email = action.payload.user.email;
        state.profilePicture = action.payload.user.imageUrl;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

// export const { logout } = authSlice.actions;
export default userSlice.reducer;
