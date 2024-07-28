import React from "react";

const Formcontain = ({ children }) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between w-full gap-2 ">
      {children}
    </div>
  );
};

export default Formcontain;
