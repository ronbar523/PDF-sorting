import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";

import "./App.css";
import HomePage from "./Pages/HomePage";

function App() {
  return (
    <>
      <Suspense fallback={<div> loading </div>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
