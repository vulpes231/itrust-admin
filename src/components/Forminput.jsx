import React from "react";

const Forminput = ({ type, placeHolder, value, handleChange, name }) => {
  return (
    <input
      type={type}
      placeholder={placeHolder}
      autoComplete="off"
      value={value}
      onChange={handleChange}
      name={name}
      className="w-full border-2 focus:border-purple-500 py-2 px-4 placeholder:text-sm placeholder:font-thin outline-none rounded-xl"
    />
  );
};

export default Forminput;
