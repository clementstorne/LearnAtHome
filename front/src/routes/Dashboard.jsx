/** Style */
import "../main.scss";

/** React */
import { useEffect } from "react";

/** Components */
import Header from "../components/Header";
import Navbar from "../components/Navbar";

/** Store */
import { useSelector, useDispatch } from "react-redux";
import { getData } from "../store/userSlice.js";

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
  });

  const name = useSelector((state) => state.user.name);

  return (
    <>
      <Header />
      <div className="dashboard-wrapper">
        <h1>Welcome {name}</h1>
      </div>
      <Navbar />
    </>
  );
}
