import React, { useState, useEffect } from "react";
import HomePage from "./pages/home/HomePage";
import SplashScreen from "./components/layout/SplashScreen";
import ScrollToTopButton from "./components/ScrollToTopButton";

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isPageVisible, setIsPageVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      const transitionTimer = setTimeout(() => {
        setIsPageVisible(true);
      }, 50);
      return () => clearTimeout(transitionTimer);
    }
  }, [isLoading]);

  return (
    <div className="App">
      <SplashScreen isLoading={isLoading} />

      {!isLoading && (
        <div
          className={`
            transition-all duration-1000 ease-out
            ${
              isPageVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-5"
            }
          `}
        >
          <HomePage />
        </div>
      )}

      <ScrollToTopButton />
    </div>
  );
};

export default App;
