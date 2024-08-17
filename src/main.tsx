import ReactDOM from "react-dom/client";
import "../public/base-styles.scss";
import { store } from "./store/store";
import { Provider } from "react-redux";
import App from "./components/App";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <App />
  </Provider>
);
