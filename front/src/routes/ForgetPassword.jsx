/** Style */
import "../main.scss";

/** React */
import { useState } from "react";

/** React Router */
import { useNavigate } from "react-router-dom";

/** Components */
import Navbar from "../components/Navbar";
import LinkLogin from "../components/LinkLogin";
import LinkSignup from "../components/LinkSignup";

/** Store */
import { useDispatch } from "react-redux";
// import { userLogin } from "../store/userSlice";
import { login } from "../store/authSlice.js";

/**
 * Component for showing the login page.
 * @component
 */
export default function ForgetPassword() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  function handleForgetPassword(e) {
    e.preventDefault();

    const credentials = {
      email,
    };

    dispatch(login(credentials));
    navigate("/login");
  }

  return (
    <>
      <Navbar />

      <div className="login-form-wrapper">
        <form id="login-form" action="" onSubmit={handleForgetPassword}>
          <div className="login-field">
            <label htmlFor="email" className="login-label">
              Email
            </label>
            <input
              type="email"
              id="email"
              required
              aria-required="true"
              className="login-input"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <input type="submit" className="login-button" value="Réinitialiser" />
        </form>

        <div id="links">
          <LinkLogin />
          <LinkSignup />
        </div>
      </div>
    </>
  );
}
