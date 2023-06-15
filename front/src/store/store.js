/** Redux Toolkit */
import { configureStore } from "@reduxjs/toolkit";

/** Slices */
import authReducer from "./authSlice.js.js";
import userReducer from "./userSlice.js";
import modalReducer from "./modalSlice.js";

const reducer = {
  auth: authReducer,
  user: userReducer,
  modal: modalReducer,
};

export default configureStore({
  reducer,
  devTools: true,
});
