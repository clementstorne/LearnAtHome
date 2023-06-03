/** Style */
import "../main.scss";

/** React Router */
import { Link } from "react-router-dom";

/** Store */

/** Assets */
import {
  BsHouse,
  BsChatText,
  BsCalendar4Week,
  BsListTask,
  BsFillPersonFill,
} from "react-icons/bs";

/**
 * Component for showing the navbar.
 * @component
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
