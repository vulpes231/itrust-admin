import React from "react";
import Botaccess from "./Botaccess";
import Setswapfee from "./Setswapfee";

const Usersettings = ({ user }) => {
  //   console.log(user);
  return (
    <div className="p-10 bg-white shadow-xl rounded-xl flex flex-col gap-6">
      <h5 className="text-xl">User settings</h5>
      <Botaccess user={user} />
      <hr />
      <Setswapfee user={user} />
    </div>
  );
};

export default Usersettings;