/** Style */
import "../main.scss";

/** PropTypes */
import PropTypes from "prop-types";

/**
 * A component for displaying the user's profile picture.
 * @param   {string}      source - The source URL of the profile picture.
 * @returns {JSX.Element}        - The rendered ProfilePicture component.
 */
export default function ProfilePicture({ source }) {
  return (
    <img
      src={source}
      alt="Photo de profil de l'utilisateur"
      className="profile-picture"
    />
  );
}

ProfilePicture.propTypes = {
  source: PropTypes.string.isRequired,
};
