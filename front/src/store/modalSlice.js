/** Store */
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
  message: "",
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state, action) => {
      (state.isOpen = true), (state.message = action.payload);
    },
    closeModal: (state) => {
      (state.isOpen = false), (state.message = "");
    },
    openFormModal: (state) => {
      state.isOpen = true;
    },
    closeFormModal: (state) => {
      state.isOpen = false;
    },
  },
});

export const { openModal, closeModal, openFormModal, closeFormModal } =
  modalSlice.actions;
export default modalSlice.reducer;
