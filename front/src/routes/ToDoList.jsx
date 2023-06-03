/** Style */
import "../main.scss";

/** Components */
import Header from "../components/Header";
import Navbar from "../components/Navbar";

/** Assets */

/**
 * Component for showing the todo page.
 * @component
 */
export default function ToDoList() {
  return (
    <>
      <Header />
      <Navbar />
      <h1>Todo list</h1>
    </>
  );
}
