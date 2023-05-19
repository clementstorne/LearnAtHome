/** Style */
import "../main.scss";

/** React */
import { useState } from "react";

/** React Router */
import { useNavigate } from "react-router-dom";

/** Components */
import Header from "../components/Header";
import LinkLogin from "../components/LinkLogin";
import LinkSignup from "../components/LinkSignup";

/** Store */
// import { useDispatch } from "react-redux";
// import { userLogin } from "../store/userSlice";

/** Assets */
import { BsExclamationTriangleFill } from "react-icons/bs";

/** Helpers */
import FormValidatorHelpers from "../helpers/FormValidatorHelpers";

/**
 * Component for showing the login page.
 * @component
 */
export default function ForgetPassword() {
  // const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [emailErrorMessage, setEmailErrorMessage] = useState("");

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
   * Checks if the email is valid, submit form et navigate to login page.
   * @param {Event} e
   * @returns
   */
  function handleForgetPassword(e) {
    e.preventDefault();

    if (!emailErrorMessage) {
      const credentials = {
        email,
      };

      console.log(credentials);
      // dispatch(login(credentials));
      navigate("/login");
    }
  }

  return (
    <>
      <Header shadow={false} />

      <div className="login-form-wrapper">
        <form id="login-form" action="" onSubmit={handleForgetPassword}>
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
