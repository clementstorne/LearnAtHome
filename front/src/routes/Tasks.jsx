/** Style */
import "../main.scss";

/** React */
import { useEffect, useState } from "react";

/** Components */
import {
  Header,
  Navbar,
  ButtonAction,
  TodoItem,
  TodoCard,
  ModalForm,
  ProfilePicture,
} from "../components/index";

/** Store */
import { useSelector, useDispatch } from "react-redux";
import { getData } from "../store/userSlice.js";
import { getAllTasks } from "../store/taskSlice";
import { getAllTodos } from "../store/todoSlice";

/**
 * Todo page component.
 * @component
 * @returns {JSX.Element} - The todo page component.
 */
export default function Tasks() {
  const dispatch = useDispatch();

  const userId = useSelector((state) => state.user.id);
  const userName = useSelector((state) => state.user.name);
  const userPicture = useSelector((state) => state.user.profilePicture);
  const todoList = useSelector((state) => state.todos.todoList);
  // const taskList = useSelector((state) => state.tasks.tasksList);

  const [userList, setUserList] = useState([]);

  const category = useSelector((state) => state.modal.category);

  useEffect(() => {
    dispatch(getData());
    dispatch(getAllTasks());
    dispatch(getAllTodos());
    const tasksToComplete = todoList.filter((task) => task.isDone === false);
    const user = {
      id: userId,
      name: userName,
      picture: userPicture,
      taskList: tasksToComplete,
    };
    setUserList([
      user,
      {
        id: 1,
        name: "John Doe",
        picture:
          "https://i.pinimg.com/originals/39/e9/b3/39e9b39628e745a39f900dc14ee4d9a7.jpg",
        taskList: [0, 0, 0, 0, 0],
      },
      {
        id: 2,
        name: "Jane Doe",
        picture:
          "https://i.pinimg.com/originals/39/e9/b3/39e9b39628e745a39f900dc14ee4d9a7.jpg",
        taskList: [0, 0, 0],
      },
    ]);
  }, [dispatch, userId, userName, userPicture, todoList]);

  return (
    <>
      <Header />
      <ModalForm category={category} />
      <div className="todo-wrapper">
        <div className="todo-menu">
          {userName !== null &&
            userList.length > 0 &&
            userList.map((user, index) => (
              <TodoCard
                name={user.name}
                picture={user.picture}
                taskList={user.taskList}
                key={index}
              />
            ))}
        </div>
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
      </div>
      <Navbar />
    </>
  );
}
