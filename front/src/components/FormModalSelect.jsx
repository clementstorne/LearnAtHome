/** Style */
import "../main.scss";

/** PropTypes */
import PropTypes from "prop-types";

/**
 * A select field component for modals.
 * @param   {string}      id           - The unique identifier for the field.
 * @param   {string}      label        - The label text for the field.
 * @returns {JSX.Element}              - The input field component.
 */
export default function FormModalSelect({ id, label }) {
  return (
    <div className="form-modal-field">
      <label htmlFor={id} id={`${id}-label`} className="form-modal-label">
        {label}
      </label>
      <select name={id} id={id} className="form-modal-input">
        <option value="me">Moi</option>
        <option value="other">Someone else</option>
      </select>
    </div>
  );
}

FormModalSelect.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};
