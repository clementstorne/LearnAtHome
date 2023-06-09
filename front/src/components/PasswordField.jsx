/** Style */
import "../main.scss";

/** PropTypes */
import PropTypes from "prop-types";

/** Components */
import { PasswordConstraint } from "./index";

/** Assets */
import { BsExclamationTriangleFill } from "react-icons/bs";

/**
 * A password input field component with constraints.
 * @param   {boolean}     isRequired   - Indicates if the input field is required.
 * @param   {string}      className    - The CSS class name for the input field container.
 * @param   {string}      id           - The unique identifier for the password field.
 * @param   {string}      label        - The label text for the password field.
 * @param   {string}      errorMessage - The error message to display.
 * @param   {Function}    event        - The callback function called when a change is made to the input field.
 * @param   {object}      constraints  - The password constraints configuration object.
 * @returns {JSX.Element}              - The input field component.
 */
export default function PasswordField({
  isRequired,
  className,
  id,
  label,
  errorMessage,
  event,
  constraints,
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
        autoComplete="new-password"
        id={id}
        aria-describedby={`${id}-label`}
        required={isRequired}
        aria-required={isRequired}
        spellCheck="false"
        className={`${className}-input`}
        onChange={event}
      />
      <div className={`${className}-field-constraint-wrapper`}>
        <PasswordConstraint
          className={`${className}-field`}
          test={constraints.oneUpperCaseLetter}
          text="une majuscule"
          message="Le mot de passe doit contenir une majuscule"
        ></PasswordConstraint>
        <PasswordConstraint
          className={`${className}-field`}
          test={constraints.oneLowerCaseLetter}
          text="une minuscule"
          message="Le mot de passe doit contenir une minuscule"
        ></PasswordConstraint>
        <PasswordConstraint
          className={`${className}-field`}
          test={constraints.oneNumber}
          text="un chiffre"
          message="Le mot de passe doit contenir un chiffre"
        ></PasswordConstraint>
        <PasswordConstraint
          className={`${className}-field`}
          test={constraints.oneSpecialCharacter}
          text="un caractère spécial"
          message="Le mot de passe doit contenir un caractère spécial"
        ></PasswordConstraint>
        <PasswordConstraint
          className={`${className}-field`}
          test={constraints.minimumLength}
          text="8 caractères minimum"
          message="Le mot de passe doit contenir au minimum 8 caractères"
        ></PasswordConstraint>
      </div>
    </div>
  );
}

PasswordField.propTypes = {
  isRequired: PropTypes.bool,
  className: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  errorMessage: PropTypes.string.isRequired,
  event: PropTypes.func.isRequired,
  constraints: PropTypes.object.isRequired,
};

PasswordField.defaultProps = {
  isRequired: false,
};
