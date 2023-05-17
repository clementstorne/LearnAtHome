/** Style */
import "../main.scss";

/** React */
import { useState } from "react";

/** React Router */
import { useNavigate } from "react-router-dom";

/** Components */
import Header from "../components/Header";
import LinkForgetPassword from "../components/LinkForgetPassword";
import LinkSignup from "../components/LinkSignup";

/** Store */
import { useDispatch } from "react-redux";
// import { userLogin } from "../store/userSlice";
import { login } from "../store/authSlice.js";

/**
 * Component for showing the login page.
 * @component
 */
export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin(e) {
    e.preventDefault();

    const credentials = {
      email,
      password,
    };

    dispatch(login(credentials));
    navigate("/profile");
  }

  return (
    <>
      <Header shadow={false} />

      <div className="login-form-wrapper">
        <form id="login-form" action="" onSubmit={handleLogin}>
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
          <div className="login-field">
            <label htmlFor="password" className="login-label">
              Mot de passe
            </label>
            <input
              type="password"
              id="password"
              required
              aria-required="true"
              className="login-input"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <input type="submit" className="login-button" value="S'inscrire" />
        </form>

        <div id="links">
          <LinkForgetPassword />
          <LinkSignup />
        </div>
      </div>
    </>
  );
}
