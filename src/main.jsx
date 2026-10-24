import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { SongsProvider } from "./context/SongsContext.jsx";
import VotePage from "./components/VotePage.jsx";

// Reset styles
const style = document.createElement("style");
style.textContent = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Poppins:wght@700;800;900&display=swap');
  :root { color-scheme: dark; }
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html, body, #root { height: 100%; width: 100%; overflow: hidden; }
  body { background: #1a1a2e; color: #f7f7f7; font-family: 'Inter', system-ui, sans-serif; }
  button, input, select, textarea { font: inherit; }
  button { transition: background-color 160ms ease, border-color 160ms ease, color 160ms ease, transform 160ms ease; }
  button:focus-visible, input:focus-visible, select:focus-visible, textarea:focus-visible { outline: 2px solid #4ecdc4; outline-offset: 2px; }
  .chart-editor-panes { grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); }
  .bulk-import-panes { grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); }
  @media (min-width: 900px) and (max-width: 1199px) {
    .tablet-layout .meta-actions { width: 100%; margin-left: 0 !important; justify-content: flex-start; }
    .tablet-layout .meta-bar { align-items: flex-start !important; }
  }
  @media (max-width: 899px) {
    .chart-editor-panes { grid-template-columns: minmax(0, 1fr) !important; grid-template-rows: minmax(260px, 1fr) minmax(260px, 1fr); overflow-y: auto !important; }
    .chart-editor-panes > div { min-height: 260px !important; border-right: 0 !important; border-bottom: 1px solid rgba(247,247,247,0.08); }
    .bulk-import-panes { grid-template-columns: minmax(0, 1fr) !important; grid-template-rows: minmax(220px, 1fr) minmax(220px, 1fr); overflow-y: auto !important; }
    .bulk-import-panes > div { min-height: 220px !important; border-right: 0 !important; border-bottom: 1px solid rgba(247,247,247,0.08); }
  }
  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: #45455e; border-radius: 3px; }
  input[type="date"]::-webkit-calendar-picker-indicator { filter: invert(1); opacity: 0.7; }
  select option { background: #202039; color: #f7f7f7; }
`;
document.head.appendChild(style);

const voteId = new URLSearchParams(window.location.search).get("vote");

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {voteId ? (
      <VotePage showId={voteId} />
    ) : (
      <SongsProvider>
        <App />
      </SongsProvider>
    )}
  </React.StrictMode>
);
