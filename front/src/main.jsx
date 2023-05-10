/** React */
import React from "react";
import ReactDOM from "react-dom/client";

/** React Router */
import Router from "./routes/Router";

/** Store */
// import { Provider } from "react-redux";
// import store from "./store/index";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* <Provider store={store}> */}
    <Router />
    {/* </Provider> */}
  </React.StrictMode>
);
