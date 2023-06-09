/** Style */
import "../main.scss";

/** PropTypes */
import PropTypes from "prop-types";

/**
 * A button component.
 * @component
 * @param   {string}      text  - The text to display on the button.
 * @param   {boolean}     alert - Specifies whether the button has an alert style.
 * @returns {JSX.Element}       - The rendered Button component.
 */
export default function Button({ text, alert }) {
  return (
    <button className={`button ${alert ? "button-alert" : ""}`}>{text}</button>
  );
}

Button.propTypes = {
  text: PropTypes.string.isRequired,
  alert: PropTypes.bool,
};

Button.defaultProps = {
  alert: false,
};
