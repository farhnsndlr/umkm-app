import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import App from "./App.js";
import ItemDetailsPage from "./pages/details/ItemDetailsPage.js";

const pageTransition = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.3, ease: "easeOut" },
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
              <ItemDetailsPage />
            </motion.div>
          }
        />
        <Route
          path="/drink/:slug"
          element={
            <motion.div
              initial="initial"
              animate="animate"
              exit="exit"
              variants={pageTransition}
            >
              <ItemDetailsPage />
            </motion.div>
          }
        />
        <Route
          path="/service/:slug"
          element={
            <motion.div
              initial="initial"
              animate="animate"
              exit="exit"
              variants={pageTransition}
            >
              <ItemDetailsPage />
            </motion.div>
          }
        />
      </Routes>
    </AnimatePresence>
  );
};

export default AnimatedRoutes;
