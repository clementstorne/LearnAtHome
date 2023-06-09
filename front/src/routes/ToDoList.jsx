/** Style */
import "../main.scss";

/** Components */
import { Header, Navbar } from "../components/index";

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
      </div>
      <Navbar />
    </>
  );
}
