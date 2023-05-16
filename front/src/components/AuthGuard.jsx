/** React Router */
import { Navigate } from "react-router-dom";

/** Store */
import { useSelector } from "react-redux";

/** PropTypes */
import PropTypes from "prop-types";

/**
 * Component for limiting access to pages when the user is not logged in.
 * @component
 * @param   {HTMLElement}  children  The content to limit the access to.
 */
export default function AuthGuard({ children }) {
  const isAuth = useSelector((state) => state.auth.isAuth);
  if (!isAuth) {
    return <Navigate to="/login" />;
  }
  return children;
}

AuthGuard.propTypes = {
  children: PropTypes.node.isRequired,
};
