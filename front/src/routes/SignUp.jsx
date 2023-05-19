/** Style */
import "../main.scss";

/** React */
import { useState } from "react";

/** React Router */
import { useNavigate } from "react-router-dom";

/** Components */
import Header from "../components/Header";
import LinkLogin from "../components/LinkLogin";

/** Store */
import { useDispatch } from "react-redux";
// import { userLogin } from "../store/userSlice";
import { login } from "../store/authSlice.js";

/** Assets */
import {
  BsFillCheckCircleFill,
  BsFillXCircleFill,
  BsExclamationTriangleFill,
} from "react-icons/bs";

/** Helpers */
import FormValidatorHelpers from "../helpers/FormValidatorHelpers";

/**
 * Component for showing the login page.
 * @component
 */
export default function SignUp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const [nameErrorMessage, setNameErrorMessage] = useState("");
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [oneUpperCaseLetter, setOneUpperCaseLetter] = useState(false);
  const [oneLowerCaseLetter, setOneLowerCaseLetter] = useState(false);
  const [oneNumber, setOneNumber] = useState(false);
  const [oneSpecialCharacter, setOneSpecialCharacter] = useState(false);
  const [minimumLength, setMinimumLength] = useState(false);
  const [passwordFormat, setPasswordFormat] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");

  /**
   * On change in the name input, checks if the user input is correct and stores it or displays a message if not.
   * @param {Event} e
   */
  function handleNameChange(e) {
    e.preventDefault();

    setName(e.target.value);
    if (e.target.value.length >= 1) {
      if (!FormValidatorHelpers.isNameValid(e.target.value)) {
        e.target.setAttribute("aria-invalid", "true");
        setNameErrorMessage("Le format du nom est incorrect");
      } else {
        e.target.removeAttribute("aria-invalid");
        setNameErrorMessage("");
      }
    } else {
      setNameErrorMessage("Veuillez saisir votre nom");
    }
  }

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
   * Displays if a string contains one upper case letter or not.
   * @param   {String}  str  String to test
   */
  function checkOneUpperCaseLetter(str) {
    if (FormValidatorHelpers.containsOneUpperCaseLetter(str)) {
      setOneUpperCaseLetter(true);
    } else {
      setOneUpperCaseLetter(false);
    }
  }

  /**
   * Displays if a string contains one lower case letter or not.
   * @param   {String}  str  String to test
   */
  function checkOneLowerCaseLetter(str) {
    if (FormValidatorHelpers.containsOneLowerCaseLetter(str)) {
      setOneLowerCaseLetter(true);
    } else {
      setOneLowerCaseLetter(false);
    }
  }

  /**
   * Displays if a string contains one lower case letter or not.
   * @param   {String}  str  String to test
   */
  function checkOneNumber(str) {
    if (FormValidatorHelpers.containsOneNumber(str)) {
      setOneNumber(true);
    } else {
      setOneNumber(false);
    }
  }

  /**
   * Displays if a string contains one lower case letter or not.
   * @param   {String}  str  String to test
   */
  function checkOneSpecialCharacter(str) {
    if (FormValidatorHelpers.containsOneSpecialCharacter(str)) {
      setOneSpecialCharacter(true);
    } else {
      setOneSpecialCharacter(false);
    }
  }

  /**
   * Displays if a string contains one lower case letter or not.
   * @param   {String}  str  String to test
   */
  function checkMinimumLength(str) {
    if (FormValidatorHelpers.minimumLength(str)) {
      setMinimumLength(true);
    } else {
      setMinimumLength(false);
    }
  }

  /**
   * On change in the password input, stores it and checks if all the constraints are fullfiled.
   * @param {Event} e
   */
  function handlePasswordChange(e) {
    e.preventDefault();

    setPassword(e.target.value);
    if (e.target.value.length > 0) {
      checkOneUpperCaseLetter(e.target.value);
      checkOneLowerCaseLetter(e.target.value);
      checkOneNumber(e.target.value);
      checkOneSpecialCharacter(e.target.value);
      checkMinimumLength(e.target.value);
      if (!FormValidatorHelpers.isPasswordValid(e.target.value)) {
        e.target.setAttribute("aria-invalid", "true");
        setPasswordFormat(true);
      } else {
        e.target.removeAttribute("aria-invalid");
        setPasswordFormat(false);
      }
    } else {
      setOneUpperCaseLetter(false);
      setOneLowerCaseLetter(false);
      setOneNumber(false);
      setOneSpecialCharacter(false);
      setMinimumLength(false);
    }
  }

  /**
   * Checks if both passwords are identical and displays a message if not.
   * @param {Event} e
   */
  function checkBothPasswords(e) {
    e.preventDefault();

    if (e.target.value !== password) {
      e.target.setAttribute("aria-invalid", "true");
      setPasswordErrorMessage("Les deux mots de passe ne sont pas identiques");
    } else {
      e.target.removeAttribute("aria-invalid");
      setPasswordErrorMessage("");
    }
  }

  /**
   * Checks if all fields are valid, submit form et navigate to dashboard.
   * @param {Event} e
   * @returns
   */
  function handleSignup(e) {
    e.preventDefault();

    if (
      !nameErrorMessage &&
      !emailErrorMessage &&
      !passwordFormat &&
      !passwordErrorMessage
    ) {
      const credentials = {
        email,
        password,
        name,
        role,
      };

      dispatch(login(credentials));
      navigate("/profile");
    }
  }

  return (
    <>
      <Header shadow={false} />

      <div className="login-form-wrapper">
        <form id="login-form" action="" onSubmit={handleSignup}>
          <div className="login-field">
            <label htmlFor="name" id="name-label" className="login-label">
              <span
                className={`login-field-error-logo ${
                  !nameErrorMessage ? "hidden" : ""
                }`}
                aria-hidden={`${!nameErrorMessage ? "true" : "false"}`}
              >
                <BsExclamationTriangleFill />
              </span>{" "}
              Nom complet
            </label>
            <input
              type="text"
              autoComplete="name"
              id="name"
              aria-describedby="name-label"
              required
              aria-required="true"
              spellCheck="false"
              className="login-input"
              onChange={handleNameChange}
            />
            <div className="login-field-error">{nameErrorMessage}</div>
          </div>
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
              <span
                className={`login-field-error-logo ${
                  !passwordFormat ? "hidden" : ""
                }`}
                aria-hidden={`${!passwordFormat ? "true" : "false"}`}
              >
                <BsExclamationTriangleFill />
              </span>{" "}
              Mot de passe
            </label>
            <input
              type="password"
              autoComplete="new-password"
              id="password"
              aria-describedby="email-label"
              required
              aria-required="true"
              spellCheck="false"
              className="login-input"
              onChange={handlePasswordChange}
            />
            <div className="login-field-constraint-wrapper">
              <span
                className={`login-field-constraint ${
                  oneUpperCaseLetter ? "login-field-constraint-fulfilled" : ""
                }`}
                aria-label={
                  !oneUpperCaseLetter
                    ? "Le mot de passe doit contenir une majuscule"
                    : ""
                }
              >
                <span
                  className="login-field-constraint-logo"
                  aria-hidden="true"
                >
                  {oneUpperCaseLetter ? (
                    <BsFillCheckCircleFill />
                  ) : (
                    <BsFillXCircleFill />
                  )}
                </span>{" "}
                une majuscule
              </span>
              <span
                className={`login-field-constraint ${
                  oneLowerCaseLetter ? "login-field-constraint-fulfilled" : ""
                }`}
                aria-label={
                  !oneLowerCaseLetter
                    ? "Le mot de passe doit contenir une minuscule"
                    : ""
                }
              >
                <span
                  className="login-field-constraint-logo"
                  aria-hidden="true"
                >
                  {oneLowerCaseLetter ? (
                    <BsFillCheckCircleFill />
                  ) : (
                    <BsFillXCircleFill />
                  )}
                </span>{" "}
                une minuscule
              </span>
              <span
                className={`login-field-constraint ${
                  oneNumber ? "login-field-constraint-fulfilled" : ""
                }`}
                aria-label={
                  !oneNumber ? "Le mot de passe doit contenir un chiffre" : ""
                }
              >
                <span
                  className="login-field-constraint-logo"
                  aria-hidden="true"
                >
                  {oneNumber ? (
                    <BsFillCheckCircleFill />
                  ) : (
                    <BsFillXCircleFill />
                  )}
                </span>{" "}
                un chiffre
              </span>
              <span
                className={`login-field-constraint ${
                  oneSpecialCharacter ? "login-field-constraint-fulfilled" : ""
                }`}
                aria-label={
                  !oneSpecialCharacter
                    ? "Le mot de passe doit contenir un caractère spécial"
                    : ""
                }
              >
                <span
                  className="login-field-constraint-logo"
                  aria-hidden="true"
                >
                  {oneSpecialCharacter ? (
                    <BsFillCheckCircleFill />
                  ) : (
                    <BsFillXCircleFill />
                  )}
                </span>{" "}
                un caractère spécial
              </span>
              <span
                className={`login-field-constraint ${
                  minimumLength ? "login-field-constraint-fulfilled" : ""
                }`}
                aria-label={
                  !minimumLength
                    ? "Le mot de passe doit contenir un caractère spécial"
                    : ""
                }
              >
                <span
                  className="login-field-constraint-logo"
                  aria-hidden="true"
                >
                  {minimumLength ? (
                    <BsFillCheckCircleFill />
                  ) : (
                    <BsFillXCircleFill />
                  )}
                </span>{" "}
                8 caractères minimum
              </span>
            </div>
          </div>
          <div className="login-field">
            <label
              htmlFor="password"
              id="password-confirmation-label"
              className="login-label"
            >
              <span
                className={`login-field-error-logo ${
                  !passwordErrorMessage ? "hidden" : ""
                }`}
                aria-hidden={`${!passwordErrorMessage ? "true" : "false"}`}
              >
                <BsExclamationTriangleFill />
              </span>{" "}
              Confirmer le mot de passe
            </label>
            <input
              type="password"
              autoComplete="off"
              id="password-confirmation"
              aria-describedby="password-confirmation-label"
              required
              aria-required="true"
              spellCheck="false"
              className="login-input"
              onChange={checkBothPasswords}
            />
            <div className="login-field-error">{passwordErrorMessage}</div>
          </div>
          <div className="login-field signup-field">
            <input
              type="radio"
              id="student"
              name="role"
              value="student"
              checked={role === "student"}
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
              checked={role === "tutor"}
              onChange={(e) => setRole(e.target.value)}
            />
            <label htmlFor="tutor" className="login-label signup-label">
              Tuteur
            </label>
          </div>
          <input type="submit" className="login-button" value="S'inscrire" />
        </form>

        <div id="links">
          <LinkLogin />
        </div>
      </div>
    </>
  );
}
