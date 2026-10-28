/**
 * @file src/main.jsx
 * @description Application client entry point initializing React 18 root.
 * @responsibility Mount the React App component tree inside the DOM #root element.
 */

import React from "react";
import ReactDOM from "react-dom/client";
import "./i18n";
import App from "./routes/App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
