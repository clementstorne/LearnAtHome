/** Style */
import "../main.scss";

/** React */
import { useState } from "react";

/** React Router */
import { Navigate } from "react-router-dom";

/** Components */
import Header from "../components/Header";
import LinkForgetPassword from "../components/LinkForgetPassword";
import LinkSignup from "../components/LinkSignup";

/** Store */
import { useDispatch, useSelector } from "react-redux";
import { login } from "../store/authSlice.js";

/** Assets */
import { BsExclamationTriangleFill } from "react-icons/bs";

/** Helpers */
import FormValidatorHelpers from "../helpers/FormValidatorHelpers";

/**
 * Component for showing the login page.
 * @component
 */
export default function Login() {
  const dispatch = useDispatch();
  // const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailErrorMessage, setEmailErrorMessage] = useState("");

  const isAuth = useSelector((state) => state.auth.isAuth);

  /**
   * On change in the email input, checks if the user input is correct and stores it or displays a message if not.
   * @param {Event} e
   */
  function handleEmailChange(e) {
    e.preventDefault();

    setEmail(e.target.value);
    if (e.target.value.length >= 1) {
      if (!FormValidatorHelpers.isEmailValid(e.target.value)) {
        e.target.setAttribute("aria-invalid", "true");
        setEmailErrorMessage("Le format de l'email est incorrect");
      } else {
        e.target.removeAttribute("aria-invalid");
        setEmailErrorMessage("");
      }
    } else {
      setEmailErrorMessage("Veuillez saisir votre email");
    }
  }

  /**
   * Checks if the email is valid, submit form et navigate to dashboard.
   * @param {Event} e
   * @returns
   */
  async function handleLogin(e) {
    e.preventDefault();
    if (!emailErrorMessage) {
      const credentials = {
        email,
        password,
      };
      dispatch(login(credentials));
    }
  }

  return (
    <>
      {isAuth && <Navigate to="/" replace={true} />}
      <Header shadow={false} />

      <div className="login-form-wrapper">
        <form id="login-form" action="" onSubmit={handleLogin}>
          <div className="login-field">
            <label htmlFor="email" id="email-label" className="login-label">
              <span
                className={`login-field-error-logo ${
                  !emailErrorMessage ? "hidden" : ""
                }`}
                aria-hidden={`${!emailErrorMessage ? "true" : "false"}`}
              >
                <BsExclamationTriangleFill />
              </span>{" "}
              Email
            </label>
            <input
              type="email"
              autoComplete="email"
              id="email"
              aria-describedby="email-label"
              required
              aria-required="true"
              spellCheck="false"
              className="login-input"
              onChange={handleEmailChange}
            />
            <div className="login-field-error">{emailErrorMessage}</div>
          </div>
          <div className="login-field">
            <label
              htmlFor="password"
              id="password-label"
              className="login-label"
            >
              Mot de passe
            </label>
            <input
              type="password"
              autoComplete="current-password"
              id="password"
              aria-describedby="password-label"
              aria-required="true"
              spellCheck="false"
              className="login-input"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <input type="submit" className="login-button" value="Se connecter" />
        </form>

        <div id="links">
          <LinkForgetPassword />
          <LinkSignup />
        </div>
      </div>
    </>
  );
}
