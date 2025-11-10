import React from "react";
import HomePage from "./pages/home/HomePage";
import ScrollToTopButton from "./components/ScrollToTopButton";

const App: React.FC = () => {
  return (
    <div className="App">
      <HomePage />
      <ScrollToTopButton />
    </div>
  );
};

export default App;
