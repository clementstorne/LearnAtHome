/** Style */
import "../main.scss";

/** React */
import { useState } from "react";

/** React Router */
import { useNavigate } from "react-router-dom";

/** Components */
import Navbar from "../components/Navbar";
import LinkForgetPassword from "../components/LinkSignup";
import LinkSignup from "../components/LinkSignup";

/** Store */
// import { useDispatch } from "react-redux";
// import { userLogin } from "../store/userSlice";

/**
 * Component for showing the login page.
 * @component
 */
export default function Login() {
  // const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function login(e) {
    e.preventDefault();

    const credentials = {
      email,
      password,
    };

    console.log(credentials);

    // dispatch(userLogin(credentials));
    navigate("/profile");
  }

  return (
    <>
      <Navbar />

      <div className="login-form-wrapper">
        <form id="login-form" action="" onSubmit={login}>
          <div className="login-field">
            <label htmlFor="email" className="login-label">
              Email
            </label>
            <input
              type="email"
              id="email"
              required
              aria-required="true"
              className="login-input"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="login-field">
            <label htmlFor="password" className="login-label">
              Password
            </label>
            <input
              type="password"
              id="password"
              required
              aria-required="true"
              className="login-input"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <input type="submit" className="login-button" value="Se connecter" />
          {/* <button id="login-button" type="submit">
            Se connecter
          </button> */}
        </form>

        <div id="links">
          <LinkForgetPassword />
          <LinkSignup />
        </div>
      </div>
    </>
  );
}
