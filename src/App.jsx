import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { Authnav, Content, Navbar } from "./components";
import { Dashboard, Signup, Transactions, Users, Settings } from "./pages";
import { getAccessToken } from "./utils/utilities";
import Bots from "./pages/Bots";
import Trades from "./pages/Trades";
import Swap from "./pages/Swap";
import { logoutAdmin } from "./features/logoutSlice";
import { useDispatch, useSelector } from "react-redux";
import { resetLogin } from "./features/loginSlice";
import Userdetails from "./pages/Userdetails";

const App = () => {
  const dispatch = useDispatch();
  const [token, setToken] = useState(false);
  const [toggle, setToggle] = useState(false);

  const handleToggle = () => {
    setToggle((prev) => !prev);
  };

  const accessToken = getAccessToken();

  const { logoutError, logoutLoading, loggedOut } = useSelector(
    (state) => state.logout
  );

  const handleLogout = () => {
    console.log("startung");
    dispatch(logoutAdmin());
  };

  useEffect(() => {
    if (loggedOut) {
      sessionStorage.clear();
      setToken(false);
      dispatch(resetLogin());
      // window.location.href = "/";
    }
  }, [loggedOut]);

  useEffect(() => {
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
          logout={handleLogout}
          logoutLoad={logoutLoading}
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
        <Route path="/bots" element={<Bots />} />
        <Route path="/trades" element={<Trades />} />
        <Route path="/swap" element={<Swap />} />
        <Route path="/user" element={<Userdetails />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </div>
  );
};

export default App;
