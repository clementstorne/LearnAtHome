/** Style */
import "../main.scss";

/** PropTypes */
import PropTypes from "prop-types";

/** React */
import { useState } from "react";

/** Assets */
import { BsCircle, BsCheckCircle } from "react-icons/bs";

export default function TodoItem({ text }) {
  const [isDone, completeTask] = useState(false);

  const handleToggle = () => {
    completeTask(!isDone);
  };

  return (
    <div className="todo-item">
      <input
        type="checkbox"
        id="todo-item-checkbox"
        className="todo-item-checkbox"
        checked={isDone}
        onChange={handleToggle}
      />
      <div
        className={`todo-item-icon ${
          isDone ? "color-secondary" : "color-tertiary"
        } `}
      >
        {isDone ? <BsCheckCircle /> : <BsCircle />}
      </div>
      <label
        htmlFor="todo-item-checkbox"
        className="todo-item-label"
        onClick={handleToggle}
      >
        {text}
      </label>
    </div>
  );
}

TodoItem.propTypes = {
  text: PropTypes.string.isRequired,
};
