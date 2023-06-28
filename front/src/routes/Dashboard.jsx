/** Style */
import "../main.scss";

/** React */
import { useEffect } from "react";

/** Components */
import { Header, Navbar, TodoItem } from "../components/index";

/** Store */
import { useSelector, useDispatch } from "react-redux";
import { getData } from "../store/userSlice.js";
import { getAllTodos } from "../store/todoSlice";

/** Assets */

/**
 * Dashboard page component.
 * @component
 * @returns {JSX.Element} - The dashboard page component.
 */
export default function Dashboard() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getData());
    dispatch(getAllTodos());
  }, []);

  const name = useSelector((state) => state.user.name);
  const todoList = useSelector((state) => state.todos.todoList);
  const latestTasks = todoList.slice(0, 4);
  const tasksToComplete = todoList.filter((task) => task.isDone === false);

  return (
    <>
      <Header />
      <div className="dashboard-wrapper">
        <section className="dashboard-section dashboard-welcome">
          <h1 className="dashboard-title">
            Bienvenue <br /> {name}
          </h1>
          <p className="dashboard-last-connection">Dernière connexion le …</p>
        </section>
        <section className="dashboard-section dashboard-messages">
          <h1 className="dashboard-title">Mes messages non lus</h1>
        </section>
        <section className="dashboard-section dashboard-calendar">
          <h1 className="dashboard-title">Mes prochains événements</h1>
        </section>
        <section className="dashboard-section dashboard-todo">
          <h1 className="dashboard-title">
            Mes tâches ({tasksToComplete.length})
          </h1>
          {todoList.length === 0
            ? "Vous n'avez aucune tâche à compléter."
            : latestTasks.map((todo) => (
                <TodoItem
                  text={todo.content}
                  status={todo.isDone}
                  id={todo.id}
                  key={todo.id}
                />
              ))}
        </section>
      </div>
      <Navbar />
    </>
  );
}
