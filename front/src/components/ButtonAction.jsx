/** Style */
import "../main.scss";

/** PropTypes */
import PropTypes from "prop-types";

/** Store */
import { useDispatch } from "react-redux";
import { openFormModal } from "../store/modalSlice.js";

/** Assets */
import { BsPencilSquare, BsCalendarPlus, BsPlusSquare } from "react-icons/bs";

/**
 * A big button component.
 * @component
 * @param   {string}      text  - The text to display on the button.
 * @param   {boolean}     alert - Specifies whether the button has an alert style.
 * @returns {JSX.Element}       - The rendered Button component.
 */
export default function ButtonAction({ category }) {
  const dispatch = useDispatch();

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

  function handleClick() {
    dispatch(openFormModal());
  }

  return (
    <button className="action-button" onClick={handleClick}>
      {renderIcon(category)}
    </button>
  );
}

ButtonAction.propTypes = {
  category: PropTypes.string.isRequired,
};
