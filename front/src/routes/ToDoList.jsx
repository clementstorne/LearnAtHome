/** Style */
import "../main.scss";

/** Components */
import { Header, Navbar, TodoItem } from "../components/index";

/** Assets */

/**
 * Todo page component.
 * @component
 * @returns {JSX.Element} - The todo page component.
 */
export default function ToDoList() {
  return (
    <>
      <Header />
      <div className="todo-wrapper">
        <h1>Todo list</h1>
        <TodoItem text="Faire le DM de maths" />
        <TodoItem text="Apprendre le vocabulaire" />
      </div>
      <Navbar />
    </>
  );
}
