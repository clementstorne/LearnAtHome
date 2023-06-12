/** Style */
import "../main.scss";

/** PropTypes */
import PropTypes from "prop-types";

/** React */
import { useState } from "react";

/** Assets */
import { BsXLg } from "react-icons/bs";

export default function Modal({ text }) {
  const [isHidden, hidModal] = useState(false);

  function closeModal() {
    hidModal(true);
  }

  return (
    <div className={`modal-overlay ${isHidden ? "hidden" : ""}`}>
      <div
        className={`modal ${isHidden ? "hidden" : ""}`}
        aria-hidden={isHidden}
        role="dialog"
        aria-describedby="modal-text"
      >
        <span className="modal-close-button" onClick={closeModal}>
          <BsXLg />
        </span>
        <span id="modal-text" className="modal-text">
          {text}
        </span>
      </div>
    </div>
  );
}

Modal.propTypes = {
  text: PropTypes.string.isRequired,
};
