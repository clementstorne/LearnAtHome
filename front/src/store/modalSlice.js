/** Store */
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
  message: "",
  category: "",
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state, action) => {
      state.isOpen = true;
      state.message = action.payload;
    },
    closeModal: (state) => {
      state.isOpen = false;
      state.message = "";
    },
    openFormModal: (state, action) => {
      state.isOpen = true;
      state.category = action.payload;
    },
    closeFormModal: (state) => {
      state.isOpen = false;
      state.category = "";
    },
  },
});

export const { openModal, closeModal, openFormModal, closeFormModal } =
  modalSlice.actions;
export default modalSlice.reducer;
