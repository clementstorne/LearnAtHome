/** Style */
import "../main.scss";

/** React Router */
import { Link } from "react-router-dom";

/** Assets */
import {
  BsHouse,
  BsChatText,
  BsCalendar4Week,
  BsListTask,
  BsFillPersonFill,
} from "react-icons/bs";

/**
 * The navigation bar component.
 * @returns {JSX.Element} The rendered JSX element representing the navigation bar.
 */
export default function Navbar() {
  return (
    <nav className="navbar">
      <ul className="navbar-nav">
        <li className="navbar-link">
          <Link to={`/`}>
            <BsHouse />
          </Link>
        </li>
        <li className="navbar-link navbar-separator">
          <Link to={`/profile`}>
            <BsFillPersonFill />
          </Link>
        </li>
        <li className="navbar-link navbar-separator">
          <Link to={`/chat`}>
            <BsChatText />
          </Link>
        </li>
        <li className="navbar-link navbar-separator">
          <Link to={`/calendar`}>
            <BsCalendar4Week />
          </Link>
        </li>
        <li className="navbar-link">
          <Link to={`/todo`}>
            <BsListTask />
          </Link>
        </li>
      </ul>
    </nav>
  );
}
