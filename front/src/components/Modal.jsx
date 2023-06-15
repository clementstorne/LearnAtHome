/** Style */
import "../main.scss";

/** React */
import { useEffect } from "react";

/** Store */
import { useSelector, useDispatch } from "react-redux";
import { closeModal } from "../store/modalSlice.js";

/** Assets */
import { BsXLg } from "react-icons/bs";

export default function Modal() {
  const dispatch = useDispatch();

  const isOpen = useSelector((state) => state.modal.isOpen);
  const message = useSelector((state) => state.modal.message);

  function toggleModal() {
    dispatch(closeModal());
  }

  function closeOnEscapeKeyDown(e) {
    if ((e.charCode || e.keyCode) === 27) {
      dispatch(closeModal());
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
        <span id="modal-text" className="modal-text">
          {message}
        </span>
      </div>
    </div>
  );
}
