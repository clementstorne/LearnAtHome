/** Style */
import "../main.scss";

/** React */
import { useEffect } from "react";

/** PropTypes */
import PropTypes from "prop-types";

/** Components */
import { ButtonAction, TodoItem } from "../components/index";

/** Store */
import { useSelector, useDispatch } from "react-redux";
import { getData } from "../store/userSlice.js";
import { getAllTasks } from "../store/taskSlice";
import { getAllTodos } from "../store/todoSlice";

export default function TodoList({ id }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getData());
    dispatch(getAllTodos());
  }, []);

  const todoList = useSelector((state) => state.todos.todoList);
  // const taskList = useSelector((state) => state.tasks.tasksList);

  return (
    <div className="todo-list">
      <ButtonAction category="todo" />
      <ButtonAction category="task" />

      <div className="todo-tasks">
        {todoList.length === 0
          ? "Vous n'avez aucune tâche à compléter, créez-en une"
          : todoList.map((todo) => (
              <TodoItem
                text={todo.content}
                status={todo.isDone}
                id={todo.id}
                key={todo.id}
              />
            ))}
        {/* <TodoItem text="texte" status={false} taskId="0" />
            <TodoItem text="texte" status={false} taskId="0" />
            <TodoItem text="texte" status={false} taskId="0" />
            <TodoItem text="texte" status={false} taskId="0" />
            <TodoItem text="texte" status={false} taskId="0" />
            <TodoItem text="texte" status={false} taskId="0" />
            <TodoItem text="texte" status={false} taskId="0" />
            <TodoItem text="texte" status={false} taskId="0" />
            <TodoItem text="texte" status={false} taskId="0" />
            <TodoItem text="texte" status={false} taskId="0" />
            <TodoItem text="texte" status={false} taskId="0" />
            <TodoItem text="texte" status={false} taskId="0" />
            <TodoItem text="texte" status={false} taskId="0" />
            <TodoItem text="texte" status={false} taskId="0" /> */}
      </div>
    </div>
  );
}

TodoItem.propTypes = {
  text: PropTypes.string.isRequired,
  status: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired,
};
