/** Style */
import "../main.scss";

/** React Router */
import { Link, useNavigate } from "react-router-dom";

/** Store */
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/authSlice.js";

/** PropTypes */
import PropTypes from "prop-types";

/** Assets */
import logo from "../assets/Logo.svg";
import { FaPowerOff } from "react-icons/fa";

/**
 * Header component that displays the header section of the application.
 * @param   {boolean}     shadow - Determines whether to show a shadow effect on the header.
 * @returns {JSX.Element}        - The rendered header component.
 */
export default function Header({ shadow }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  let isAuth = useSelector((state) => state.auth.isAuth);

  function handleLogout() {
    dispatch(logout());
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
        <div id="logout-button" onClick={handleLogout}>
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
