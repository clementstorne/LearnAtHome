/** Style */
import "../main.scss";

/** React */
import { useEffect } from "react";

/** PropTypes */
import PropTypes from "prop-types";

/** Components */
import { FormTask, FormTodo } from "./index";

/** Store */
import { useSelector, useDispatch } from "react-redux";
import { closeFormModal } from "../store/modalSlice.js";

/** Assets */
import { BsXLg } from "react-icons/bs";

export default function ModalForm({ category }) {
  const dispatch = useDispatch();

  const isOpen = useSelector((state) => state.modal.isOpen);

  function toggleModal() {
    dispatch(closeFormModal());
  }

  function closeOnEscapeKeyDown(e) {
    if ((e.charCode || e.keyCode) === 27) {
      dispatch(closeFormModal());
    }
  }

  function renderForm(category) {
    switch (category) {
      case "todo":
        return <FormTodo />;
      case "task":
        return <FormTask />;
      default:
        break;
    }
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
        {renderForm(category)}
      </div>
    </div>
  );
}

ModalForm.propTypes = {
  category: PropTypes.string.isRequired,
};
