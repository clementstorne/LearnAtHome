/** Style */
import "../main.scss";

/** PropTypes */
import PropTypes from "prop-types";

/** Assets */
import { BsPencilSquare, BsCalendarPlus, BsPlusSquare } from "react-icons/bs";

/**
 * A big button component.
 * @component
 * @param   {string}      text  - The text to display on the button.
 * @param   {boolean}     alert - Specifies whether the button has an alert style.
 * @returns {JSX.Element}       - The rendered Button component.
 */
export default function Button({ category }) {
  function renderIcon(category) {
    switch (category) {
      case "todo":
        return <BsPlusSquare />;
      case "calendar":
        return <BsCalendarPlus />;
      case "chat":
        return <BsPencilSquare />;
      default:
        break;
    }
  }
  return <button className="action-button">{renderIcon(category)}</button>;
}

Button.propTypes = {
  category: PropTypes.string.isRequired,
};
