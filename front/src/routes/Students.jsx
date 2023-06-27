/** Style */
import "../main.scss";

/** React */
import { useEffect } from "react";

/** Components */
import { Header, Navbar } from "../components/index";

/** Store */
import { useDispatch } from "react-redux";
import { getData } from "../store/userSlice.js";

/**
 * Todo page component.
 * @component
 * @returns {JSX.Element} - The todo page component.
 */
export default function ToDoList() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getData());
  }, []);

  return (
    <>
      <Header />
      <div className="students-wrapper">
        <h1>Mes étudiants</h1>
      </div>
      <Navbar />
    </>
  );
}
