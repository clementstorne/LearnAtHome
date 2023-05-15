import { createSlice } from "@reduxjs/toolkit";

const userState = {
  email: null,
  name: null,
  id: null,
  role: "student",
  lastConnection: null,
};

const userSlice = createSlice({
  name: "user",
  initialState: userState,
  reducers: {
    /**
     * Saves user's data in the store when they log in.
     */
    userLogin: (state, action) => {
      (state.email = action.payload.body.email),
        (state.firstName = action.payload.body.firstName),
        (state.lastName = action.payload.body.lastName),
        (state.id = action.payload.body.id);
    },
    /**
     * Toggle when the user wants to update their firstname and/or lastname.
     */
    userToUpdateToggle: (state) => {
      state.toUpdate = !state.toUpdate;
    },
    /**
     * Updates user's data in the store.
     */
    userUpdate: (state, action) => {
      (state.firstName = action.payload.body.firstName),
        (state.lastName = action.payload.body.lastName),
        (state.toUpdate = false);
    },
    /**
     * Clears the store when user logs out.
     */
    userLogout: (state) => {
      (state.email = null),
        (state.firstName = null),
        (state.lastName = null),
        (state.id = null);
    },
  },
});

export const { userLogin, userToUpdateToggle, userUpdate, userLogout } =
  userSlice.actions;

export const userReducer = userSlice.reducer;
