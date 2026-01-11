import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { ThemeProvider } from "@/contexts/ThemeContext";
import "./index.css";
import "./i18n";
import App from "./App.tsx";
import { initAnalytics } from "@/lib/analytics";

initAnalytics();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter basename="/CeroCloud-website">
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>
);
