/** Style */
import "../main.scss";

/** PropTypes */
import PropTypes from "prop-types";

/** Store */
import { useDispatch } from "react-redux";
import { updateTodo } from "../store/todoSlice";

/** Assets */
import { BsCircle, BsCheckCircle } from "react-icons/bs";

export default function TodoItem({ text, status, id }) {
  const dispatch = useDispatch();

  const handleToggle = () => {
    dispatch(updateTodo({ id, isDone: !status }));
  };

  return (
    <div className="todo-item">
      <input
        type="checkbox"
        id="todo-item-checkbox"
        className="todo-item-checkbox"
        checked={status}
        onChange={handleToggle}
      />
      <div
        className={`todo-item-icon ${
          status ? "color-primary" : "color-secondary"
        } `}
      >
        {status ? <BsCheckCircle /> : <BsCircle />}
      </div>
      <label
        htmlFor="todo-item-checkbox"
        className={`todo-item-label ${status ? "todo-item-label-done" : ""}`}
      >
        {text}
      </label>
    </div>
  );
}

TodoItem.propTypes = {
  text: PropTypes.string.isRequired,
  status: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired,
};
