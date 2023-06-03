/** Style */
import "../main.scss";

/** Components */
import Header from "../components/Header";
import Navbar from "../components/Navbar";

/** Assets */

/**
 * Component for showing the calendar page.
 * @component
 */
export default function Calendar() {
  return (
    <>
      <Header />
      <Navbar />
      <h1>Calendrier</h1>
    </>
  );
}
