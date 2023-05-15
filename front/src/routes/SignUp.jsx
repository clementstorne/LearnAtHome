/** Style */
import "../main.scss";

/** React */
import { useState } from "react";

/** React Router */
import { useNavigate } from "react-router-dom";

/** Components */
import Navbar from "../components/Navbar";
import LinkLogin from "../components/LinkLogin";

/** Store */
import { useDispatch } from "react-redux";
// import { userLogin } from "../store/userSlice";
import { login } from "../store/authSlice.js";

/**
 * Component for showing the login page.
 * @component
 */
export default function SignUp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("");

  function handleLogin(e) {
    e.preventDefault();

    const credentials = {
      email,
      password,
      name,
      role,
    };

    dispatch(login(credentials));
    navigate("/profile");
  }

  return (
    <>
      <Navbar />

      <div className="login-form-wrapper">
        <form id="login-form" action="" onSubmit={handleLogin}>
          <div className="login-field">
            <label htmlFor="name" className="login-label">
              Nom complet
            </label>
            <input
              type="text"
              id="name"
              required
              aria-required="true"
              className="login-input"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
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
          <div className="login-field">
            <label htmlFor="password" className="login-label">
              Confirmer le mot de passe
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
          <div className="login-field signup-field">
            <input
              type="radio"
              id="student"
              name="role"
              value="student"
              checked
              onChange={(e) => setRole(e.target.value)}
            />
            <label htmlFor="student" className="login-label signup-label">
              Élève
            </label>
            <input
              type="radio"
              id="tutor"
              name="role"
              value="tutor"
              onChange={(e) => setRole(e.target.value)}
            />
            <label htmlFor="tutor" className="login-label signup-label">
              Tuteur
            </label>
          </div>
          <input type="submit" className="login-button" value="Se connecter" />
        </form>

        <div id="links">
          <LinkLogin />
        </div>
      </div>
    </>
  );
}
