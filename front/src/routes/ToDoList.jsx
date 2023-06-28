/** Style */
import "../main.scss";

/** React */
import { useState, useEffect } from "react";

/** Components */
import {
  Header,
  Navbar,
  ButtonAction,
  ProfilePicture,
  TodoItem,
  TodoCard,
  ModalForm,
} from "../components/index";

/** Store */
import { useSelector, useDispatch } from "react-redux";
import { getData } from "../store/userSlice.js";
import { getAllTasks } from "../store/taskSlice";
import { getAllTodos } from "../store/todoSlice";

/** Assets */
import defaultProfilePicture from "../assets/default-profile-picture.png";

/**
 * Todo page component.
 * @component
 * @returns {JSX.Element} - The todo page component.
 */
export default function ToDoList() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getData());
    dispatch(getAllTasks());
    dispatch(getAllTodos());

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const userName = useSelector((state) => state.user.name);
  const userPicture = useSelector((state) => state.user.profilePicture);
  const todoList = useSelector((state) => state.todos.todoList);
  // const taskList = useSelector((state) => state.tasks.tasksList);

  const tasksToComplete = todoList.filter((task) => task.isDone === false);

  return (
    <>
      <Header />
      <ModalForm />
      <div className="todo-wrapper">
        <div className="todo-menu">
          <TodoCard
            name={userName}
            picture={userPicture}
            taskList={tasksToComplete}
          />
        </div>
        <div className="todo-list">
          <ButtonAction category="todo" />
          <ButtonAction category="task" />
          {/* <div className="todo-header">
            <ProfilePicture
              source={userPicture ? userPicture : defaultProfilePicture}
              size={windowWidth >= 768 ? "80" : "40"}
            />
            <div className="todo-title">
              <div className="todo-owner">{userName}</div>
              <div className="todo-message">
                {tasksToComplete.length === 0
                  ? "Aucune tâche à compléter"
                  : tasksToComplete.length === 1
                  ? "1 tâche à compléter"
                  : `${tasksToComplete.length} tâches à compléter`}
              </div>
            </div>
          </div> */}

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
      </div>
      <Navbar />
    </>
  );
}
