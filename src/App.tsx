import React, { useState } from "react";
import LoaderScene from "./components/LoaderScene";
import Home from "./pages/Home";
import type { Page, Section } from "./types";

const App: React.FC = () => {
  const [page, setPage] = useState<Page>("loader");
  const [section, setSection] = useState<Section | null>(null);

  const handleNavigate = (to: Page) => {
    if (to === "work" || to === "tech" || to === "about") {
      setPage("home");
      setSection(to);
    } else {
      setPage(to);
      setSection(null);
    }
  };

  return (
    <div className="w-full h-full bg-black text-white">
      {page === "loader" && <LoaderScene onNavigate={handleNavigate} />}
      {page === "home" && <Home section={section} />}
    </div>
  );
};

export default App;
