import { StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/sw.js");
  });
}

function StartupApp() {
  useEffect(() => {
    const delay = Math.max(0, 3100 - performance.now());
    const timer = window.setTimeout(() => {
      document.getElementById("startup-screen")?.remove();
    }, delay);
    return () => window.clearTimeout(timer);
  }, []);

  return <App />;
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <StartupApp />
  </StrictMode>,
);
