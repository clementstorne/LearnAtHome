/** Style */
import "../main.scss";

/** PropTypes */
import PropTypes from "prop-types";

/** Store */
import { useDispatch } from "react-redux";
import { updateTask } from "../store/taskSlice";

/** Assets */
import { BsCircle, BsCheckCircle } from "react-icons/bs";

export default function TodoItem({ text, status, taskId }) {
  const dispatch = useDispatch();

  const handleToggle = () => {
    dispatch(updateTask({ taskId, isDone: !status }));
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
          status ? "color-secondary" : "color-tertiary"
        } `}
      >
        {status ? <BsCheckCircle /> : <BsCircle />}
      </div>
      <label
        htmlFor="todo-item-checkbox"
        className={`todo-item-label ${status ? "todo-item-label-done" : ""}`}
        onClick={() => {
          console.log("clic label");
        }}
      >
        {text}
      </label>
    </div>
  );
}

TodoItem.propTypes = {
  text: PropTypes.string.isRequired,
  status: PropTypes.bool.isRequired,
  taskId: PropTypes.string.isRequired,
};
