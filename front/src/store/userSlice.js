/** Store */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

/** Services */
import UserService from "../services/UserService";

const initialState = {
  id: null,
  name: "",
  email: "",
  profilePicture: null,
  isTutor: false,
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
  reducers: {
    resetUserState: (state) => {
      state.id = null;
      state.name = "";
      state.email = "";
      state.profilePicture = null;
      state.isTutor = false;
      state.isLoading = false;
      state.error = null;
    },
  },
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
        state.isTutor = action.payload.data.role === "tutor";
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
        state.name = action.payload.updatedUser.name;
        state.email = action.payload.updatedUser.email;
        state.profilePicture = action.payload.updatedUser.imageUrl;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

// export const { logout } = authSlice.actions;
export default userSlice.reducer;
