/** Style */
import "../main.scss";

/** Components */
import { Header, Navbar, ActionButton } from "../components/index";

/** Assets */

/**
 * Calendar page component.
 * @component
 * @returns {JSX.Element} - The calendar page component.
 */
export default function Calendar() {
  return (
    <>
      <Header />
      <div className="calendar-wrapper">
        <ActionButton category="calendar" />
        <h1>Calendrier</h1>
      </div>
      <Navbar />
    </>
  );
}
