/** Style */
import "../main.scss";

/** React */
import { useEffect } from "react";

/** Components */
import { Header, Navbar, TodoItem } from "../components/index";

/** Store */
import { useSelector, useDispatch } from "react-redux";
import { getData } from "../store/userSlice.js";
import { getAllTasks } from "../store/taskSlice";

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
    dispatch(getAllTasks());
  }, []);

  const name = useSelector((state) => state.user.name);
  const taskList = useSelector((state) => state.tasks.tasksList);
  const latestTasks = taskList.slice(0, 4);
  const tasksToComplete = taskList.filter((task) => task.isDone === false);

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
          {taskList.length === 0
            ? "Vous n'avez aucune tâche à compléter."
            : latestTasks.map((task) => (
                <TodoItem
                  text={task.content}
                  status={task.isDone}
                  taskId={task.id}
                  key={task.id}
                />
              ))}
        </section>
      </div>
      <Navbar />
    </>
  );
}
