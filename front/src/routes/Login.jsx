/** Style */
import "../main.scss";

/** React */
import { useState } from "react";

/** React Router */
import { Navigate } from "react-router-dom";

/** Components */
import {
  Header,
  LinkForgetPassword,
  LinkSignup,
  ProfileField,
  SimplePasswordField,
  Modal,
} from "../components/index";

/** Store */
import { useDispatch, useSelector } from "react-redux";
import { login } from "../store/authSlice.js";
import { openModal } from "../store/modalSlice";

/** Helpers */
import FormValidatorHelpers from "../helpers/FormValidatorHelpers";

/**
 * Login page component.
 * @component
 * @returns {JSX.Element} - The login page component.
 */
export default function Login() {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    email: "",
  });

  const isAuth = useSelector((state) => state.auth.isAuth);
  const requestStatus = useSelector((state) => state.auth.status);

  /**
   * Validates a specific field value based on the field name.
   * @param   {string} fieldName - The name of the field to validate.
   * @param   {string} value     - The value of the field to validate.
   * @returns {string}           - The error message, if any.
   */
  function validateField(fieldName, value) {
    let errorMessage = "";

    switch (fieldName) {
      case "email":
        if (value.trim() === "") {
          errorMessage = "Veuillez saisir votre email";
        } else if (!FormValidatorHelpers.isEmailValid(value)) {
          errorMessage = "Le format de l'email est incorrect";
        }
        break;
      default:
        break;
    }

    return errorMessage;
  }

  /**
   * On change in the email input, checks if the value is correct and displays a message if not.
   * @param {Object} e - The event object representing the change event.
   */
  function handleEmailChange(e) {
    const { value } = e.target;
    setEmail(value);
    const errorMessage = validateField("email", value);
    setErrors((prevErrors) => ({ ...prevErrors, email: errorMessage }));
    if (errorMessage) {
      e.target.setAttribute("aria-invalid", "true");
    } else {
      e.target.removeAttribute("aria-invalid");
    }
  }

  /**
   * Handles the login process.
   * @async
   * @param   {Event}         e - The event object representing the form submission.
   * @returns {Promise<void>}
   */
  async function handleLogin(e) {
    e.preventDefault();
    if (!errors.email) {
      const credentials = {
        email,
        password,
      };
      dispatch(login(credentials));
      if (requestStatus === "Rejected") {
        dispatch(openModal("L'email et/ou le mot de passe sont incorrects"));
      }
    }
  }

  return (
    <>
      {isAuth && <Navigate to="/" replace={true} />}
      <Header shadow={false} />

      <Modal />

      <div className="login-form-wrapper">
        <form id="login-form" action="" onSubmit={handleLogin}>
          <ProfileField
            isRequired={true}
            className="login"
            id="email"
            label="Email"
            errorMessage={errors.email}
            value={email}
            event={handleEmailChange}
          />
          <SimplePasswordField
            isRequired={true}
            className="login"
            id="password"
            label="Mot de passe"
            event={(e) => setPassword(e.target.value)}
          />
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
