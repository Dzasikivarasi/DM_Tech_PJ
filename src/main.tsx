import React from "react";
import ReactDOM from "react-dom/client";
import "../public/base-styles.scss";
import App from "./components/app";
import { store } from "./store/store";
import { Provider } from "react-redux";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
