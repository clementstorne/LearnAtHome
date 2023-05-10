/** Style */
import "../main.scss";

/** React */
// import { useEffect } from "react";

/** React Router */
// import { Link, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

/** Store */
// import { useSelector, useDispatch } from "react-redux";
// import { userLogin, userLogout } from "../store/userSlice";

/** Services */

/** Assets */
import logo from "../assets/Logo.svg";
import { FaPowerOff } from "react-icons/fa";

/**
 * Component for showing the navbar.
 * @component
 */
export default function Navbar() {
  return (
    <nav id="navbar">
      <Link to={`/`}>
        <img id="navbar-logo" src={logo} alt="Learn@Home Logo" />
      </Link>
      <div id="logout-button">
        <span>Se déconnecter</span>
        <FaPowerOff />
      </div>
    </nav>
  );
}
