import React from "react";
import { Route, Routes } from "react-router-dom";
import { Content } from "./components";
import { Dashboard, Signup } from "./pages";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Content />} />
        <Route path="/create-admin" element={<Signup />} />
        <Route path="/dash" element={<Dashboard />} />
      </Routes>
    </div>
  );
};

export default App;
