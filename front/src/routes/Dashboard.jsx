/** Style */
import "../main.scss";

/** Components */
import Header from "../components/Header";
import Navbar from "../components/Navbar";

/** Assets */

/**
 * Component for showing the dashboard page.
 * @component
 */
export default function Dashboard() {
  return (
    <>
      <Header />
      <Navbar />
      <h1>Welcome</h1>
    </>
  );
}
