import React from "react";
import Index from "./All components/Index";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Edit from "./All components/Edit";
import Add from "./All components/Add";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />}></Route>
          <Route path="/edit/:id" element={<Edit />}></Route>
          <Route path="/add" element={<Add />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
