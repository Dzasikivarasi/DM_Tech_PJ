import React from "react";
import ReactDOM from "react-dom/client";
import "../public/base-styles.scss";
import App from "./components/app";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
