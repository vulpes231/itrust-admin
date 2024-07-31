import React from "react";

const Select = ({ children, name, value, onChange }) => {
  return (
    <select
      className="outline-none border-2 focus:border-purple-500 bg-transparent p-2 text-xs font-normal"
      name={name}
      value={value}
      onChange={onChange}
    >
      {children}
    </select>
  );
};

export default Select;
