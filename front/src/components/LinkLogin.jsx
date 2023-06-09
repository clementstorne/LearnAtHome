/** Style */
import "../main.scss";

/** React Router */
import { Link } from "react-router-dom";

/**
 * Component for rendering a link to the login page.
 * @returns {JSX.Element} The rendered link element.
 */
export default function LinkLogin() {
  return <Link to={`/login`} className="link">{`J'ai déjà un compte`}</Link>;
}
