/** Style */
import "../main.scss";

/** React */
import { useState } from "react";

/** React Router */
import { Navigate } from "react-router-dom";

/** Components */
import {
  Header,
  LinkLogin,
  FieldText,
  FieldPassword,
  FieldPasswordCheck,
  Modal,
} from "../components/index";

/** Store */
import { useDispatch, useSelector } from "react-redux";
import { signup } from "../store/authSlice.js";
import { openModal } from "../store/modalSlice";

/** Helpers */
import FormValidatorHelpers from "../helpers/FormValidatorHelpers";

/**
 * Signup page component.
 * @component
 * @returns {JSX.Element} - The signup page component.
 */
export default function SignUp() {
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    passwordCheck: "",
  });
  const [passwordConstraints, setPasswordConstraints] = useState({
    oneUpperCaseLetter: false,
    oneLowerCaseLetter: false,
    oneNumber: false,
    oneSpecialCharacter: false,
    minimumLength: false,
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
      case "name":
        if (value.trim() === "") {
          errorMessage = "Veuillez saisir votre nom";
        } else if (!FormValidatorHelpers.isNameValid(value)) {
          errorMessage = "Le format du nom est incorrect";
        }
        break;
      case "email":
        if (value.trim() === "") {
          errorMessage = "Veuillez saisir votre email";
        } else if (!FormValidatorHelpers.isEmailValid(value)) {
          errorMessage = "Le format de l'email est incorrect";
        }
        break;
      case "password":
        if (value.trim() === "") {
          errorMessage = "Veuillez saisir votre mot de passe";
        } else if (!FormValidatorHelpers.isPasswordValid(value)) {
          errorMessage = "Le format du mot de passe est incorrect";
        }
        break;
      case "passwordCheck":
        if (value !== password) {
          errorMessage = "Les deux mots de passe ne sont pas identiques";
        }
        break;
      default:
        break;
    }

    return errorMessage;
  }

  /**
   * On change in the name input, checks if the value is correct and displays a message if not.
   * @param {Object} e - The event object representing the change event.
   */
  function handleNameChange(e) {
    const { value } = e.target;
    setName(value);
    const errorMessage = validateField("name", value);
    setErrors((prevErrors) => ({ ...prevErrors, name: errorMessage }));
    if (errorMessage) {
      e.target.setAttribute("aria-invalid", "true");
    } else {
      e.target.removeAttribute("aria-invalid");
    }
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
   * Checks the constraints for a given string and updates the password constraints state.
   * @param   {string} str - The string to check the constraints against.
   * @returns {void}
   */
  function checkConstraints(str) {
    const constraints = {
      oneUpperCaseLetter: FormValidatorHelpers.containsOneUpperCaseLetter(str),
      oneLowerCaseLetter: FormValidatorHelpers.containsOneLowerCaseLetter(str),
      oneNumber: FormValidatorHelpers.containsOneNumber(str),
      oneSpecialCharacter:
        FormValidatorHelpers.containsOneSpecialCharacter(str),
      minimumLength: FormValidatorHelpers.minimumLength(str),
    };
    setPasswordConstraints(constraints);
  }

  /**
   * On change in the password input, checks if all the constraints are fullfiled.
   * @param {Object} e - The event object representing the change event.
   */
  function handlePasswordChange(e) {
    const { value } = e.target;
    setPassword(value);
    checkConstraints(value);
    const errorMessage = validateField("password", value);
    setErrors((prevErrors) => ({ ...prevErrors, password: errorMessage }));
    if (errorMessage) {
      e.target.setAttribute("aria-invalid", "true");
    } else {
      e.target.removeAttribute("aria-invalid");
    }
  }

  /**
   * On change in the second password input, checks if both passwords match and displays a message if not.
   * @param {Object} e - The event object representing the change event.
   */
  function checkBothPasswords(e) {
    const { value } = e.target;
    const errorMessage = validateField("passwordCheck", value);
    setErrors((prevErrors) => ({ ...prevErrors, passwordCheck: errorMessage }));
    if (errorMessage) {
      e.target.setAttribute("aria-invalid", "true");
    } else {
      e.target.removeAttribute("aria-invalid");
    }
  }

  /**
   * Checks if all fields are valid, submits form et navigates to dashboard.
   * @param   {Event} e - The event object triggered by the signup action.
   * @returns {void}
   */
  function handleSignup(e) {
    e.preventDefault();
    if (
      !errors.name &&
      !errors.email &&
      !errors.password &&
      !errors.passwordCheck
    ) {
      const credentials = {
        name,
        email,
        password,
        role,
      };
      dispatch(signup(credentials));
      if (requestStatus === "Rejected") {
        dispatch(openModal("Cet email est déjà utilisé"));
      }
    }
  }

  return (
    <>
      {isAuth && <Navigate to="/" replace={true} />}
      <Header shadow={false} />

      <Modal />

      <div className="login-form-wrapper">
        <form id="login-form" action="" onSubmit={handleSignup}>
          <FieldText
            isRequired={true}
            className="login"
            id="name"
            label="Nom complet"
            errorMessage={errors.name}
            value={name}
            event={handleNameChange}
          />
          <FieldText
            isRequired={true}
            className="login"
            id="email"
            label="Email"
            errorMessage={errors.email}
            value={email}
            event={handleEmailChange}
          />
          <FieldPassword
            isRequired={true}
            className="login"
            id="password"
            label="Mot de passe"
            errorMessage={errors.password}
            event={handlePasswordChange}
            constraints={passwordConstraints}
          />
          <FieldPasswordCheck
            isRequired={true}
            className="login"
            id="password-confirmation"
            label="Confirmer le mot de passe"
            errorMessage={errors.passwordCheck}
            event={checkBothPasswords}
          />
          <div
            className="login-field signup-field"
            role="radiogroup"
            aria-labelledby="role-label"
          >
            <label
              htmlFor="role"
              id="role-label"
              className="login-label hidden"
              aria-hidden="true"
            >
              Rôle
            </label>
            <input
              type="radio"
              id="student"
              name="role"
              value="student"
              tabIndex="0"
              aria-checked={role === "student"}
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
              tabIndex="-1"
              aria-checked={role === "tutor"}
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
