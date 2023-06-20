/** Style */
import "../main.scss";

/** Components */
import { Header, Navbar, ActionButton } from "../components/index";

/** Assets */

/**
 * Chat page component.
 * @component
 * @returns {JSX.Element} - The chat page component.
 */
export default function Chat() {
  return (
    <>
      <Header />
      <div className="chat-wrapper">
        <ActionButton category="chat" />
        <h1>Messagerie</h1>
      </div>
      <Navbar />
    </>
  );
}
