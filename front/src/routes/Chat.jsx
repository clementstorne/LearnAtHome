/** Style */
import "../main.scss";

/** Components */
import Header from "../components/Header";
import Navbar from "../components/Navbar";

/** Assets */

/**
 * Component for showing the chat page.
 * @component
 */
export default function Chat() {
  return (
    <>
      <Header />
      <Navbar />
      <h1>Messagerie</h1>
    </>
  );
}
