import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { Authnav, Content, Navbar } from "./components";
import { Dashboard, Signup, Transactions, Wallets, Users } from "./pages";
import { getAccessToken } from "./utils/utilities";
import Bots from "./pages/Bots";
import Userdetails from "./pages/Userdetails";
import Trades from "./pages/Trades";
import Masterwallet from "./pages/Masterwallet";
import Swap from "./pages/Swap";

const App = () => {
  const [token, setToken] = useState(false);
  const [toggle, setToggle] = useState(false);

  const handleToggle = () => {
    setToggle((prev) => !prev);
  };

  const accessToken = getAccessToken();

  useEffect(() => {
    // console.log("AT", accessToken);
    if (accessToken) {
      setToken(accessToken);
    } else {
      setToken(false);
    }
  }, [accessToken]);

  return (
    <div>
      {!token ? (
        <Navbar toggle={toggle} handleToggle={handleToggle} />
      ) : (
        <Authnav
          toggle={toggle}
          handleToggle={handleToggle}
          setToken={setToken}
        />
      )}
      <Routes>
        <Route path="/" element={<Content setToken={setToken} />} />
        <Route path="/create-admin" element={<Signup />} />
        <Route
          path="/dash"
          element={<Dashboard toggle={toggle} handleToggle={handleToggle} />}
        />
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/users" element={<Users />} />
        <Route path="/wallets" element={<Wallets />} />
        <Route path="/bots" element={<Bots />} />
        <Route path="/trades" element={<Trades />} />
        <Route path="/mastercontrol" element={<Masterwallet />} />
        <Route path="/swap" element={<Swap />} />
      </Routes>
    </div>
  );
};

export default App;
