import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import App from "./App.tsx";
import FoodDetailsPage from "./pages/details/FoodDetailsPage.tsx";

const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.4, ease: "easeInOut" },
};

const AnimatedRoutes: React.FC = () => {
  const location = useLocation();
  const [isAppLoading, setIsAppLoading] = useState(true);

  useEffect(() => {
    const splashElement = document.getElementById("splash-screen");

    if (!splashElement) {
      setIsAppLoading(false);
      return;
    }

    const timer = setTimeout(() => {
      splashElement.classList.add("fade-out");
      setTimeout(() => {
        splashElement.remove();
      }, 1000);
      setIsAppLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (isAppLoading) {
    return null;
  }

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <motion.div
              initial={false}
              animate="animate"
              exit="exit"
              variants={pageTransition}
            >
              <App />
            </motion.div>
          }
        />
        <Route
          path="/food/:slug"
          element={
            <motion.div
              initial="initial"
              animate="animate"
              exit="exit"
              variants={pageTransition}
            >
              <FoodDetailsPage />
            </motion.div>
          }
        />
      </Routes>
    </AnimatePresence>
  );
};

export default AnimatedRoutes;
