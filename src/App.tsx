import React, { useState } from "react";
import "./index.css";
import Home from "./pages/Home";
import About from "./pages/About";

type Page = "home" | "about";

const App: React.FC = () => {
  const [page, setPage] = useState<Page>("home");

  const navigate = (to: Page) => setPage(to);

  return page === "home" ? <Home onNavigate={navigate} /> : <About />;
};

export default App;
