import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HeroesApp } from "./HeroesApp";

import "./styles.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HeroesApp />
  </StrictMode>
);
