/** Style */
import "../main.scss";

import { Link } from "react-router-dom";

/**
 * Component for showing a link to the forget password page.
 * @component
 */
export default function LinkForgetPassword() {
  return (
    <Link
      to={`/forget-password`}
      className="link"
    >{`J’ai oublié mon mot de passe`}</Link>
  );
}
