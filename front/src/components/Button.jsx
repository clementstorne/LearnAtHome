/** Style */
import "../main.scss";

/** PropTypes */
import PropTypes from "prop-types";

/**
 * Component for showing the profile picture of .
 * @component
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
