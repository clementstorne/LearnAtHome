/** Style */
import "../main.scss";

import { Link } from "react-router-dom";

/**
 * Component for showing a link to the signup page.
 * @component
 */
export default function LinkSignup() {
  return (
    <Link
      to={`/signup`}
      className="link"
    >{`Je n'ai pas encore de compte`}</Link>
  );
}
