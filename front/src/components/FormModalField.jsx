/** Style */
import "../main.scss";

/** PropTypes */
import PropTypes from "prop-types";

/**
 * A field input component for modals.
 * @param   {string}      id           - The unique identifier for the field.
 * @param   {string}      label        - The label text for the field.
 * @param   {Function}    event        - The callback function called when a change is made to the input field.
 * @returns {JSX.Element}              - The input field component.
 */
export default function FormModalField({ id, label, event }) {
  return (
    <div className="form-modal-field">
      <label htmlFor={id} id={`${id}-label`} className="form-modal-label">
        {label}
      </label>
      <input
        type="text"
        id={id}
        aria-describedby={`${id}-label`}
        required
        aria-required="true"
        spellCheck="true"
        className="form-modal-input"
        onChange={event}
      />
    </div>
  );
}

FormModalField.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  event: PropTypes.func.isRequired,
};
