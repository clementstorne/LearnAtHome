/** Style */
import "../main.scss";

/** React */
import { useState, useEffect } from "react";

/** Components */
import {
  Header,
  Navbar,
  ButtonAction,
  ProfilePicture,
} from "../components/index";

/** Store */
import { useSelector, useDispatch } from "react-redux";
import { getData } from "../store/userSlice.js";

/** Assets */
import defaultProfilePicture from "../assets/default-profile-picture.png";

/**
 * Chat page component.
 * @component
 * @returns {JSX.Element} - The chat page component.
 */
export default function Chat() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getData());

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const userName = useSelector((state) => state.user.name);
  const userPicture = useSelector((state) => state.user.profilePicture);

  return (
    <>
      <Header />
      <div className="chat-wrapper">
        <div className="chat-menu">
          <ButtonAction category="chat" />
        </div>
        <div className="chat-section">
          <div className="chat-header">
            <ProfilePicture
              source={userPicture ? userPicture : defaultProfilePicture}
              size={windowWidth >= 768 ? "80" : "40"}
            />
            <div className="chat-title">
              <div className="chat-recipient">{userName}</div>
              <div className="chat-last-online">En ligne…</div>
            </div>
          </div>

          <div className="chat-conversation"></div>
        </div>
      </div>
      <Navbar />
    </>
  );
}
