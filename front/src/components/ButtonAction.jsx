/** Style */
import "../main.scss";

/** React */
import { useState, useEffect } from "react";

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
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [icon, setIcon] = useState(null);
  const [label, setLabel] = useState("");

  const dispatch = useDispatch();

  function customizeButton(category) {
    switch (category) {
      case "todo":
        setIcon(<BsPlusSquare />);
        setLabel("Ajouter une nouvelle tâche");
        break;
      case "calendar":
        setIcon(<BsCalendarPlus />);
        setLabel("Ajouter un nouvel événement");
        break;
      case "chat":
        setIcon(<BsPencilSquare />);
        setLabel("Démarrer une nouvelle conversation");
        break;
      default:
        break;
    }
  }

  function handleClick() {
    dispatch(openFormModal());
  }

  useEffect(() => {
    customizeButton(category);
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <button className="action-button" onClick={handleClick}>
      {icon}{" "}
      <span className="action-button-label">
        {windowWidth >= 768 ? `${label}` : ""}
      </span>
    </button>
  );
}

ButtonAction.propTypes = {
  category: PropTypes.string.isRequired,
};
