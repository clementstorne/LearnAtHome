/** Redux Toolkit */
import { configureStore } from "@reduxjs/toolkit";

/** Slices */
import authReducer from "./authSlice.js.js";
import { userReducer } from "./userSlice.js";

const reducer = {
  auth: authReducer,
  user: userReducer,
};

export default configureStore({
  reducer,
  devTools: true,
});
