/** Style */
import "../main.scss";

/** PropTypes */
import PropTypes from "prop-types";

/** Assets */
import { BsFillCheckCircleFill, BsFillXCircleFill } from "react-icons/bs";

/**
 * A component that displays a password constraint indicator.
 * @param   {string}      className - The CSS class name for the component.
 * @param   {boolean}     test      - Determines whether the constraint is fulfilled or not.
 * @param   {string}      text      - The text to display for the constraint.
 * @param   {string}      message   - The message to display when the constraint is not fulfilled.
 * @returns {JSX.Element}           - The rendered PasswordConstraint component.
 */
export default function PasswordConstraint({ className, test, text, message }) {
  return (
    <span
      className={`${className}-constraint ${
        test ? `${className}-constraint-fulfilled` : ""
      }`}
      aria-label={!test ? { message } : ""}
    >
      <span className={`${className}-constraint-logo`} aria-hidden="true">
        {test ? <BsFillCheckCircleFill /> : <BsFillXCircleFill />}
      </span>{" "}
      {text}
    </span>
  );
}

PasswordConstraint.propTypes = {
  className: PropTypes.string.isRequired,
  test: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
};
