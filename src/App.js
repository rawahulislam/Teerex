import React from "react";
import { render } from "react-dom";
import { Routes, Route } from "react-router-dom";

import MediaCard from "./components/Grid";
import AddToCart from "./components/Cart";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MediaCard />} />
      <Route path="/cart" element={<AddToCart />} />
    </Routes>
  );
}

export default App;
