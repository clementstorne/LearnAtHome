/** Style */
import "../main.scss";

/** React */
import { useState } from "react";

/** React Router */
import { useNavigate } from "react-router-dom";

/** Components */
import { Header, LinkLogin, LinkSignup, FieldText } from "../components/index";

/** Helpers */
import FormValidatorHelpers from "../helpers/FormValidatorHelpers";

/**
 * Forget password page component.
 * @component
 * @returns {JSX.Element} - The forget password page component.
 */
export default function ForgetPassword() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({
    email: "",
  });

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
   * Handles the forget password process.
   * @async
   * @param   {Event}         e - The event object representing the form submission.
   * @returns {Promise<void>}
   */
  async function handleForgetPassword(e) {
    e.preventDefault();
    if (!errors.email) {
      const credentials = {
        email,
      };
      console.log(credentials);
      navigate("/login");
    }
  }

  return (
    <>
      <Header shadow={false} />

      <div className="login-form-wrapper">
        <form id="login-form" action="" onSubmit={handleForgetPassword}>
          <FieldText
            isRequired={true}
            className="login"
            id="email"
            label="Email"
            errorMessage={errors.email}
            value={email}
            event={handleEmailChange}
          />
          <input
            type="submit"
            className="login-button"
            value="Réinitialiser"
            disabled={errors.email}
          />
        </form>

        <div id="links">
          <LinkLogin />
          <LinkSignup />
        </div>
      </div>
    </>
  );
}
