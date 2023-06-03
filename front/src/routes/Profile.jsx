/** Style */
import "../main.scss";

/** React */
import { useState, useRef } from "react";

/** Components */
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Button from "../components/Button";
import ProfilePicture from "../components/ProfilePicture";

/** Store */
import { useSelector, useDispatch } from "react-redux";
import { updateProfile } from "../store/userSlice.js";

/** Assets */
import {
  BsFillCheckCircleFill,
  BsFillXCircleFill,
  BsExclamationTriangleFill,
} from "react-icons/bs";

/** Helpers */
import FormValidatorHelpers from "../helpers/FormValidatorHelpers";

/**
 * Component for showing the profile page.
 * @component
 */
export default function Profile() {
  const dispatch = useDispatch();

  const [name, setName] = useState(useSelector((state) => state.user.name));
  const [email, setEmail] = useState(useSelector((state) => state.user.email));
  const [password, setPassword] = useState("");
  const [nameErrorMessage, setNameErrorMessage] = useState("");
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [oneUpperCaseLetter, setOneUpperCaseLetter] = useState(false);
  const [oneLowerCaseLetter, setOneLowerCaseLetter] = useState(false);
  const [oneNumber, setOneNumber] = useState(false);
  const [oneSpecialCharacter, setOneSpecialCharacter] = useState(false);
  const [minimumLength, setMinimumLength] = useState(false);
  const [passwordFormat, setPasswordFormat] = useState(false);

  const hiddenFileInput = useRef(null);

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
   * Checks if all fields are valid, submit form.
   * @param {Event} e
   * @returns
   */
  function handleUpdateProfile(e) {
    e.preventDefault();
    if (!nameErrorMessage && !emailErrorMessage && !passwordFormat) {
      const credentials = {
        name,
        email,
        password,
      };
      dispatch(updateProfile(credentials));
    }
  }

  function handleUploadButtonClick() {
    hiddenFileInput.current.click();
  }

  return (
    <>
      <Header />
      <div className="profile-wrapper">
        <div className="profile-picture-wrapper">
          <ProfilePicture source="https://api-private.atlassian.com/users/1eaf71ee9e908c83ae2d4fece3f55e77/avatar" />
          <div className="profile-picture-button-wrapper">
            <input
              type="file"
              name="image"
              id="profile-picture"
              aria-describedby="profile-picture-label"
              accept="image/png, image/jpg, image/jpeg"
              className="profile-picture-button-input"
              ref={hiddenFileInput}
            />
            <button
              className="button profile-picture-button"
              onClick={handleUploadButtonClick}
            >
              <label htmlFor="profile-picture" id="profile-picture-label">
                Modifier la photo
              </label>
            </button>
          </div>
        </div>
        <div className="profile-form-wrapper">
          <form id="profile-form" action="" onSubmit={handleUpdateProfile}>
            <div className="profile-field">
              <label htmlFor="name" id="name-label" className="profile-label">
                <span
                  className={`profile-field-error-logo ${
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
                className="profile-input"
                onChange={handleNameChange}
              />
              <div className="profile-field-error">{nameErrorMessage}</div>
            </div>
            <div className="profile-field">
              <label htmlFor="email" id="email-label" className="profile-label">
                <span
                  className={`profile-field-error-logo ${
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
                className="profile-input"
                onChange={handleEmailChange}
              />
              <div className="profile-field-error">{emailErrorMessage}</div>
            </div>
            <div className="profile-field">
              <label
                htmlFor="password"
                id="password-label"
                className="profile-label"
              >
                <span
                  className={`profile-field-error-logo ${
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
                className="profile-input"
                onChange={handlePasswordChange}
              />
              <div className="profile-field-constraint-wrapper">
                <span
                  className={`profile-field-constraint ${
                    oneUpperCaseLetter
                      ? "profile-field-constraint-fulfilled"
                      : ""
                  }`}
                  aria-label={
                    !oneUpperCaseLetter
                      ? "Le mot de passe doit contenir une majuscule"
                      : ""
                  }
                >
                  <span
                    className="profile-field-constraint-logo"
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
                  className={`profile-field-constraint ${
                    oneLowerCaseLetter
                      ? "profile-field-constraint-fulfilled"
                      : ""
                  }`}
                  aria-label={
                    !oneLowerCaseLetter
                      ? "Le mot de passe doit contenir une minuscule"
                      : ""
                  }
                >
                  <span
                    className="profile-field-constraint-logo"
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
                  className={`profile-field-constraint ${
                    oneNumber ? "profile-field-constraint-fulfilled" : ""
                  }`}
                  aria-label={
                    !oneNumber ? "Le mot de passe doit contenir un chiffre" : ""
                  }
                >
                  <span
                    className="profile-field-constraint-logo"
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
                  className={`profile-field-constraint ${
                    oneSpecialCharacter
                      ? "profile-field-constraint-fulfilled"
                      : ""
                  }`}
                  aria-label={
                    !oneSpecialCharacter
                      ? "Le mot de passe doit contenir un caractère spécial"
                      : ""
                  }
                >
                  <span
                    className="profile-field-constraint-logo"
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
                  className={`profile-field-constraint ${
                    minimumLength ? "profile-field-constraint-fulfilled" : ""
                  }`}
                  aria-label={
                    !minimumLength
                      ? "Le mot de passe doit contenir un caractère spécial"
                      : ""
                  }
                >
                  <span
                    className="profile-field-constraint-logo"
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
            <input
              type="submit"
              className="button profile-button"
              value="Mettre à jour le profil"
            />
          </form>
        </div>
        <Button alert={true} text="Supprimer le profil" />
      </div>
      <Navbar />
    </>
  );
}
