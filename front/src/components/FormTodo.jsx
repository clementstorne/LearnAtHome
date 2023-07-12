/** Style */
import "../main.scss";

/** React */
import { useState } from "react";

/** Components */
import { FormModalField } from "./index";

/** Store */
import { useDispatch } from "react-redux";
import { closeFormModal } from "../store/modalSlice.js";
import { createTodo } from "../store/todoSlice";

export default function FormTask() {
  const dispatch = useDispatch();

  const [content, setContent] = useState("");

  function handleContentChange(e) {
    const { value } = e.target;
    setContent(value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    const credentials = { content };
    dispatch(createTodo(credentials));
    dispatch(closeFormModal());
  }

  return (
    <form
      id="form-modal"
      className="form-modal"
      action=""
      onSubmit={handleSubmit}
    >
      <FormModalField
        id="task"
        label="Tâche à accomplir"
        event={handleContentChange}
      />

      <input
        type="submit"
        className="form-modal-button"
        value="Créer la tâche"
      />
    </form>
  );
}
