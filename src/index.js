import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import PeraWalletProvider from "./context/PeraWalletContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <PeraWalletProvider>
      <App />
    </PeraWalletProvider>
  </React.StrictMode>
);
