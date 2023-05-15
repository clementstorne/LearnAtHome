/** Style */
import "../main.scss";

/** React Router */
import { Link, useNavigate } from "react-router-dom";

/** Store */
import { useSelector, useDispatch } from "react-redux";
import { userLogout } from "../store/userSlice";

/** Assets */
import logo from "../assets/Logo.svg";
import { FaPowerOff } from "react-icons/fa";

/**
 * Component for showing the navbar.
 * @component
 */
export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  let isAuth = useSelector((state) => state.auth.isAuth);

  function logout(e) {
    e.preventDefault();
    dispatch(userLogout());
    navigate("/");
  }

  return (
    <nav id="navbar">
      {isAuth === true ? (
        <Link to={`/`}>
          <img id="navbar-logo" src={logo} alt="Learn@Home Logo" />
        </Link>
      ) : (
        <Link to={`/login`}>
          <img id="navbar-logo" src={logo} alt="Learn@Home Logo" />
        </Link>
      )}
      {isAuth === true ? (
        <div id="logout-button" onClick={logout}>
          <span>Se déconnecter</span>
          <FaPowerOff />
        </div>
      ) : (
        <></>
      )}
    </nav>
  );
}
