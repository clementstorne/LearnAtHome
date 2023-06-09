/** React Router */
import { Navigate } from "react-router-dom";

/** Store */
import { useSelector } from "react-redux";

/** PropTypes */
import PropTypes from "prop-types";

/**
 * Component for guarding routes and ensuring authentication.
 * If the user is not authenticated, it redirects to the login page.
 * @param   {ReactNode} children - The child components to render if the user is authenticated.
 * @returns {ReactNode}          - The rendered child components or a redirect to the login page.
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
