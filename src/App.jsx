import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { Authnav, Content, Navbar } from "./components";
import { Dashboard, Signup } from "./pages";
import { getAccessToken } from "./utils/utilities";

const App = () => {
  // const accessToken = getAccessToken();

  // useEffect()
  return (
    <div>
      {/* <Navbar /> */}
      <Routes>
        <Route path="/" element={<Content />} />
        <Route path="/create-admin" element={<Signup />} />
        <Route path="/dash" element={<Dashboard />} />
      </Routes>
    </div>
  );
};

export default App;
