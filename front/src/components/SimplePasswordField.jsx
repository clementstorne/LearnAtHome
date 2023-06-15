/** Style */
import "../main.scss";

/** PropTypes */
import PropTypes from "prop-types";

/**
 * Password input field without constraints.
 * @component
 * @param   {boolean}     isRequired - Indicates if the input field is required.
 * @param   {string}      className  - The CSS class name for the input field container.
 * @param   {string}      id         - The unique identifier for the input field.
 * @param   {string}      label      - The label text for the input field.
 * @param   {Function}    event      - The callback function called when a change is made to the input field.
 * @returns {JSX.Element}            - The input field component.
 */
export default function SimplePasswordField({
  isRequired,
  className,
  id,
  label,
  event,
}) {
  return (
    <div className={`${className}-field`}>
      <label htmlFor={id} id={`${id}-label`} className={`${className}-label`}>
        {label}
      </label>
      <input
        type="password"
        autoComplete="current-password"
        id={id}
        aria-describedby={`${id}-label`}
        required={isRequired}
        aria-required={isRequired}
        spellCheck="false"
        minLength={8}
        className={`${className}-input`}
        onChange={event}
      />
    </div>
  );
}

SimplePasswordField.propTypes = {
  isRequired: PropTypes.bool,
  className: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  event: PropTypes.func.isRequired,
};

SimplePasswordField.defaultProps = {
  isRequired: false,
};
