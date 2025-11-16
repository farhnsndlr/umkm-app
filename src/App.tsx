import React from "react";
import HomePage from "./pages/home/HomePage.js";
import ScrollToTopButton from "./components/ScrollToTopButton.js";

const App: React.FC = () => {
  return (
    <div className="App">
      <HomePage />
      <ScrollToTopButton />
    </div>
  );
};

export default App;
