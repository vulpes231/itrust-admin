import React from "react";
import { Login } from "../pages";

const Content = ({ setToken }) => {
  return (
    <div>
      <Login setToken={setToken} />
    </div>
  );
};

export default Content;
