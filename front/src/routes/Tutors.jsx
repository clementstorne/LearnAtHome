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
export default function Tutors() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getData());
  }, []);

  return (
    <>
      <Header />
      <div className="tutors-wrapper">
        <h1>Mes tuteurs</h1>
      </div>
      <Navbar />
    </>
  );
}
