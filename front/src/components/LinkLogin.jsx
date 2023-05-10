/** Style */
import "../main.scss";

import { Link } from "react-router-dom";

/**
 * Component for showing a link to the login page.
 * @component
 */
export default function LinkLogin() {
  return <Link to={`/signup`} className="link">{`J'ai déjà un compte`}</Link>;
}
