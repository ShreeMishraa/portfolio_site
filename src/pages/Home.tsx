import React from "react";
import "../index.css";
import LoaderScene from "../components/LoaderScene";

type Page = "home" | "about";

const Home: React.FC<{ onNavigate?: (to: Page) => void }> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white overflow-x-hidden">
  <LoaderScene onNavigate={onNavigate} />
      {/* Spacer so the page becomes scrollable while the loader is visible.
          This creates a native scrollbar so users can 'scroll to enter' which
          triggers the loader's scroll logic. Remove or reduce height if you
          prefer a different scroll length. */}
      <div style={{ height: '160vh' }} aria-hidden />
    </div>
  );
};

export default Home;
