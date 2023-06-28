/** Style */
import "../main.scss";

/** React */
import { useState, useEffect } from "react";

/** PropTypes */
import PropTypes from "prop-types";

/** Components */
import { ProfilePicture } from "../components/index";

/** Store */
import { useSelector } from "react-redux";

/** Assets */
import defaultProfilePicture from "../assets/default-profile-picture.png";

export default function TodoCard({ name, picture, taskList }) {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const userName = useSelector((state) => state.user.name);

  return (
    <div className="todo-card">
      <ProfilePicture
        source={picture ? picture : defaultProfilePicture}
        size={windowWidth >= 768 ? "80" : "40"}
      />
      <div className="todo-card-content">
        <h1 className="todo-card-owner">
          {name === userName ? "Ma todo list" : { name }}
        </h1>
        <p className="todo-card-message">
          {taskList.length === 0
            ? "Aucune tâche à compléter"
            : taskList.length === 1
            ? "1 tâche à compléter"
            : `${taskList.length} tâches à compléter`}
        </p>
      </div>
    </div>
  );
}

TodoCard.propTypes = {
  name: PropTypes.string,
  picture: PropTypes.string,
  taskList: PropTypes.array,
};
