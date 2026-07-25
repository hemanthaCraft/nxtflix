import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App.jsx";
import WatchLaterProvider from "./context/WatchLaterContext";

import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <WatchLaterProvider>
      <App />
    </WatchLaterProvider>
  </StrictMode>
);