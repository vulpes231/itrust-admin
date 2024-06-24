import React from "react";
import { Route, Routes } from "react-router-dom";
import { Content, Navbar } from "./components";
import { Dashboard, Signup, Transactions, Wallets, Users } from "./pages";
import { getAccessToken } from "./utils/utilities";

const App = () => {
  // const accessToken = getAccessToken();

  return (
    <div>
      {/* <Navbar /> */}
      <Routes>
        <Route path="/" element={<Content />} />
        <Route path="/create-admin" element={<Signup />} />
        <Route path="/dash" element={<Dashboard />} />
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/users" element={<Users />} />
        <Route path="/wallets" element={<Wallets />} />
      </Routes>
    </div>
  );
};

export default App;
