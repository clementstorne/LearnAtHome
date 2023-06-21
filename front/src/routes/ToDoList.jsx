/** Style */
import "../main.scss";

/** React */
import { useEffect } from "react";

/** Components */
import {
  Header,
  Navbar,
  ButtonAction,
  ProfilePicture,
  TodoItem,
  ModalForm,
} from "../components/index";

/** Store */
import { useSelector, useDispatch } from "react-redux";
import { getData } from "../store/userSlice.js";
import { getAllTasks } from "../store/taskSlice";

/** Assets */
import defaultProfilePicture from "../assets/default-profile-picture.png";

/**
 * Todo page component.
 * @component
 * @returns {JSX.Element} - The todo page component.
 */
export default function ToDoList() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getData());
    dispatch(getAllTasks());
  }, []);

  const userName = useSelector((state) => state.user.name);
  const userPicture = useSelector((state) => state.user.profilePicture);
  const taskList = useSelector((state) => state.tasks.tasksList);

  const tasksToComplete = taskList.filter((task) => task.isDone === false);

  return (
    <>
      <Header />
      <ModalForm />
      <div className="todo-wrapper">
        <ButtonAction category="todo" />

        <div className="todo-header">
          <span></span>
          <ProfilePicture
            source={userPicture ? userPicture : defaultProfilePicture}
            size="40"
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
        </div>

        <div className="todo-list">
          {taskList.length === 0
            ? "Vous n'avez aucune tâche à compléter, créez-en une"
            : taskList.map((task) => (
                <TodoItem
                  text={task.content}
                  status={task.isDone}
                  taskId={task.id}
                  key={task.id}
                />
              ))}
        </div>
      </div>
      <Navbar />
    </>
  );
}
