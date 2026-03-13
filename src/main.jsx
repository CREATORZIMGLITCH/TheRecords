import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import EpsteinRecord from "./EpsteinRecord.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <EpsteinRecord />
  </StrictMode>
);
