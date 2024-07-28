import React from "react";

const Admininput = ({
  type,
  value,
  placeHolder,
  handleChange,
  name,
  readOnly,
}) => {
  return (
    <input
      type={type}
      value={value}
      placeholder={`${placeHolder}`}
      onChange={handleChange}
      name={name}
      className="w-full px-4 py-2 border-2 focus:border-purple-500 outline-none placeholder:font-light placeholder:text-xs placeholder:text-[#333] "
      readOnly={readOnly}
    />
  );
};

export default Admininput;
