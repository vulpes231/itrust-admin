import React from "react";

const Pagescontainer = ({ children }) => {
  return (
    <div className="mt-[80px]">
      <div className="lg:w-[1100px] mx-auto bg-white p-6 shadow-xl rounded-xl mb-10">
        {children}
      </div>
    </div>
  );
};

export default Pagescontainer;
