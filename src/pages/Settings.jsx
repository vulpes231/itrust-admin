import React from "react";
import Masterwallet from "./Masterwallet";
import Pagescontainer from "../components/Pagescontainer";

const Settings = () => {
  return (
    <div className="bg-opacity-50 w-full h-full overflow-auto mt-20">
      <h3 className="font-bold text-lg p-4 lg:max-w-[900px] mx-auto">
        Admin Settings
      </h3>
      <div className="p-6 flex flex-col gap-6 mb-10 lg:max-w-[900px] lg:mx-auto">
        <Masterwallet />
        <hr />
      </div>
    </div>
  );
};

export default Settings;
