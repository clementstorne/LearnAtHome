/** Style */
import "../main.scss";

/** PropTypes */
import PropTypes from "prop-types";

/** Assets */
import { BsExclamationTriangleFill } from "react-icons/bs";

/**
 * A password check input field component.
 * @param   {boolean}     isRequired   - Indicates if the input field is required.
 * @param   {string}      className    - The CSS class name for the input field container.
 * @param   {string}      id           - The unique identifier for the password field.
 * @param   {string}      label        - The label text for the password field.
 * @param   {string}      errorMessage - The error message to display.
 * @param   {Function}    event        - The callback function called when a change is made to the input field.
 * @returns {JSX.Element}              - The input field component.
 */
export default function PasswordCheckField({
  isRequired,
  className,
  id,
  label,
  errorMessage,
  event,
}) {
  return (
    <div className={`${className}-field`}>
      <label htmlFor={id} id={`${id}-label`} className={`${className}-label`}>
        <span
          className={`${className}-field-error-logo ${
            !errorMessage ? "hidden" : ""
          }`}
          aria-hidden={`${!errorMessage ? "true" : "false"}`}
        >
          <BsExclamationTriangleFill />
        </span>{" "}
        {label}
      </label>
      <input
        type="password"
        autoComplete="off"
        id={id}
        aria-describedby={`${id}-label`}
        required={isRequired}
        aria-required={isRequired}
        spellCheck="false"
        className={`${className}-input`}
        onChange={event}
      />
      <div className={`${className}-field-error`}>{errorMessage}</div>
    </div>
  );
}

PasswordCheckField.propTypes = {
  isRequired: PropTypes.bool,
  className: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  errorMessage: PropTypes.string.isRequired,
  event: PropTypes.func.isRequired,
};

PasswordCheckField.defaultProps = {
  isRequired: false,
};
