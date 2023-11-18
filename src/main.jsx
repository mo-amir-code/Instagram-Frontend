import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Router from "./routes";
import { Provider } from "react-redux";
import store from "./redux/store";
import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <Router />
      <Toaster position="bottom-center" reverseOrder={false} />
    </Provider>
  </React.StrictMode>
);
