import React from "react";

const Box = ({ icon, title, value }) => {
  return (
    <div className="bg-white cursor-pointer rounded-lg shadow h-30 flex flex-col items-center justify-center gap-4 p-6">
      <span className="text-purple-500 text-2xl">{icon}</span>
      <span className="capitalize font-bold">{title}</span>
      <span>{value}</span>
    </div>
  );
};

export default Box;
