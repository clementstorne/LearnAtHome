/** Style */
import "../main.scss";

/** React Router */
import { Link, useNavigate } from "react-router-dom";

/** Store */
import { useSelector, useDispatch } from "react-redux";
import { userLogout } from "../store/userSlice";

/** PropTypes */
import PropTypes from "prop-types";

/** Assets */
import logo from "../assets/Logo.svg";
import { FaPowerOff } from "react-icons/fa";

/**
 * Component for showing the navbar.
 * @component
 */
export default function Header({ shadow }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  let isAuth = useSelector((state) => state.auth.isAuth);

  function logout(e) {
    e.preventDefault();
    dispatch(userLogout());
    navigate("/");
  }

  return (
    <header className={`header ${!shadow ? "no-shadow" : ""}`}>
      {isAuth === true ? (
        <Link to={`/`}>
          <img className="header-logo" src={logo} alt="Learn@Home Logo" />
        </Link>
      ) : (
        <Link to={`/login`}>
          <img className="header-logo" src={logo} alt="Learn@Home Logo" />
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
    </header>
  );
}

Header.propTypes = {
  shadow: PropTypes.bool,
};

Header.defaultProps = {
  shadow: true,
};
