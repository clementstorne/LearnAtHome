/** Style */
import "../main.scss";

/** React */
import { useState, useEffect } from "react";

/** Components */
import { FormModalField, FormModalSelect } from "./index";

/** Store */
import { useSelector, useDispatch } from "react-redux";
import { closeFormModal } from "../store/modalSlice.js";
import { createTask } from "../store/taskSlice";

/** Assets */
import { BsXLg } from "react-icons/bs";

export default function ModalForm() {
  const dispatch = useDispatch();

  const isOpen = useSelector((state) => state.modal.isOpen);
  const isTutor = useSelector((state) => state.user.isTutor);

  const [content, setContent] = useState("");

  function toggleModal() {
    dispatch(closeFormModal());
  }

  function closeOnEscapeKeyDown(e) {
    if ((e.charCode || e.keyCode) === 27) {
      dispatch(closeFormModal());
    }
  }

  function handleContentChange(e) {
    const { value } = e.target;
    setContent(value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    const credentials = { content };
    dispatch(createTask(credentials));
    dispatch(closeFormModal());
  }

  useEffect(() => {
    document.body.addEventListener("keydown", closeOnEscapeKeyDown);
    return function cleanup() {
      document.body.removeEventListener("keydown", closeOnEscapeKeyDown);
    };
  }, []);

  return (
    <div className={`modal-overlay ${isOpen ? "show" : ""}`}>
      <div
        className={`modal ${isOpen ? "show" : ""}`}
        aria-hidden={!isOpen}
        role="dialog"
        aria-describedby="modal-text"
      >
        <span className="modal-close-button" onClick={toggleModal}>
          <BsXLg />
        </span>
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
          {isTutor ? (
            <FormModalSelect
              id="owner"
              label="Qui doit accomplir cette tâche ?"
            />
          ) : (
            ""
          )}

          <input
            type="submit"
            className="form-modal-button"
            value="Créer la tâche"
          />
        </form>
      </div>
    </div>
  );
}
