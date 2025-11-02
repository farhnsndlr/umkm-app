import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App.tsx";
import FoodDetailsPage from "./pages/details/FoodDetailsPage.tsx";
import "./index.css";

import "swiper/css";
import "swiper/css/navigation";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/food/:slug" element={<FoodDetailsPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
