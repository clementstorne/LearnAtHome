/** Style */
import "../main.scss";

/** React Router */
import { Link } from "react-router-dom";

/**
 * Component for rendering a link to the "Forget Password" page.
 * @returns {JSX.Element} The rendered link element.
 */
export default function LinkForgetPassword() {
  return (
    <Link
      to={`/forget-password`}
      className="link"
    >{`J’ai oublié mon mot de passe`}</Link>
  );
}
