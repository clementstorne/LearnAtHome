/** Style */
import "../main.scss";

/** React Router */
import { Link } from "react-router-dom";

/**
 * Component for rendering a link to the signup page.
 * @returns {JSX.Element} The rendered link element.
 */
export default function LinkSignup() {
  return (
    <Link
      to={`/signup`}
      className="link"
    >{`Je n'ai pas encore de compte`}</Link>
  );
}
