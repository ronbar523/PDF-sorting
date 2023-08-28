import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import "./Css/ApplyResume.css";
import "./Css/ContainerResume.css";

import HomePage from "./Pages/HomePage";

function App() {
  return (
    <>
      <Suspense fallback={<div> loading </div>}>
        <header></header>
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
          </Routes>
        </main>
        <ToastContainer />
      </Suspense>
    </>
  );
}

export default App;
