/** Style */
import "../main.scss";

/** Components */
import { Header, Navbar, ButtonAction } from "../components/index";

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
        <ButtonAction category="calendar" />
      </div>
      <Navbar />
    </>
  );
}
