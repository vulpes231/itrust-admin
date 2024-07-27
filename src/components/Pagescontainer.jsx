import React from "react";

const Pagescontainer = ({ children }) => {
  return (
    <div className="bg-slate-50 section">
      <div className="lg:w-[1200px] mx-auto">{children}</div>
    </div>
  );
};

export default Pagescontainer;
