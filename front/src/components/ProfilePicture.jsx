/** Style */
import "../main.scss";

/** PropTypes */
import PropTypes from "prop-types";

/**
 * Component for showing the profile picture of .
 * @component
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
