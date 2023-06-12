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
    <div className="todo-task">
      <input type="checkbox" checked={isDone} onChange={handleToggle} />
      <div
        className={`todo-task-icon ${
          isDone ? "color-secondary" : "color-tertiary"
        } `}
        // onClick={toggleTaskStatus(true)}
      >
        {isDone ? <BsCheckCircle /> : <BsCircle />}
      </div>
      {text}
    </div>
  );
}

TodoItem.propTypes = {
  text: PropTypes.string.isRequired,
};
