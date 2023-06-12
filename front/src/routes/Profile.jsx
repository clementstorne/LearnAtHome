/** Style */
import "../main.scss";

/** React */
import { useState, useRef, useEffect } from "react";

/** Components */
import {
  Header,
  Navbar,
  Button,
  Modal,
  ProfileField,
  PasswordField,
  ProfilePicture,
} from "../components/index";

/** Store */
import { useSelector, useDispatch } from "react-redux";
import { getData, updateProfile } from "../store/userSlice.js";

/** Assets */
import defaultProfilePicture from "../assets/default-profile-picture.png";

/** Helpers */
import FormValidatorHelpers from "../helpers/FormValidatorHelpers";

/**
 * User profile page component.
 * @component
 * @returns {JSX.Element} - The user profile page component.
 */
export default function Profile() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getData());
  }, []);

  const nameInStore = useSelector((state) => state.user.name);
  const emailInStore = useSelector((state) => state.user.email);
  const imageInStore = useSelector((state) => state.user.profilePicture);

  const [imageBase64url, setImageBase64url] = useState("");
  // const [defautlImageUrl, setDefautlImageUrl] = useState(defaultProfilePicture);
  const [imageFile, setImageFile] = useState(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [passwordConstraints, setPasswordConstraints] = useState({
    oneUpperCaseLetter: false,
    oneLowerCaseLetter: false,
    oneNumber: false,
    oneSpecialCharacter: false,
    minimumLength: false,
  });

  const hiddenFileInput = useRef(null);

  /**
   * Handles the input change event for an image input field.
   * Sets the image file and generates a base64 URL for the selected image.
   * @param   {Event} e - The input change event.
   * @returns {void}
   */
  function handleImageInput(e) {
    setImageFile(e.target.files[0]);
    const fileReader = new FileReader();
    fileReader.readAsDataURL(e.target.files[0]);
    fileReader.addEventListener("load", () => {
      setImageBase64url(fileReader.result);
    });
  }

  /**
   * Checks if an input value is correct or not and returns an error message if necessary.
   * @param   {String} fieldName Rule to check if the input is correct or not.
   * @param   {String} value     Input to check.
   * @returns {String}           Error message
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
      default:
        break;
    }

    return errorMessage;
  }

  /**
   * On change in the name input, checks if the user's input is correct and displays a message if not.
   * @param {Event} e
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
   * On change in the email input, checks if the user's input is correct and displays a message if not.
   * @param {Event} e
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
   * Checks if the password matches all constraints.
   * @param {String} str Password to test
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
   * On change in the password input, stores it and checks if all the constraints are fullfiled.
   * @param {Event} e
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
   * Checks if all fields are valid and then submits form.
   * @param {Event} e
   * @returns
   */
  function handleUpdateProfile(e) {
    e.preventDefault();
    if (!errors.name && !errors.email && !errors.password) {
      const formData = new FormData();
      if (imageFile) {
        formData.append("image", imageFile);
      }
      const user = {};
      if (name) {
        user.name = name;
      }
      if (email) {
        user.email = email;
      }
      if (password) {
        user.password = password;
      }
      formData.append("user", JSON.stringify(user));
      console.log(formData);
      dispatch(updateProfile(formData));
    }
  }

  function handleUploadButtonClick() {
    hiddenFileInput.current.click();
  }

  return (
    <>
      <Header />
      <Modal text="Votre profil a été mis à jour" />
      <div className="profile-wrapper">
        <div className="profile-picture-wrapper">
          <ProfilePicture
            source={
              imageBase64url
                ? imageBase64url
                : imageInStore
                ? imageInStore
                : defaultProfilePicture
            }
          />
          <div className="profile-picture-button-wrapper">
            <input
              type="file"
              name="image"
              id="profile-picture"
              aria-describedby="profile-picture-label"
              accept="image/png, image/jpg, image/jpeg"
              className="profile-picture-button-input"
              ref={hiddenFileInput}
              onChange={handleImageInput}
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
            <ProfileField
              className="profile"
              id="name"
              label="Nom complet"
              errorMessage={errors.name}
              value={name ? name : nameInStore}
              event={handleNameChange}
            />
            <ProfileField
              className="profile"
              id="email"
              label="Email"
              errorMessage={errors.email}
              value={email ? email : emailInStore}
              event={handleEmailChange}
            />
            <PasswordField
              className="profile"
              id="password"
              label="Mot de passe"
              errorMessage={errors.password}
              event={handlePasswordChange}
              constraints={passwordConstraints}
            />
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
