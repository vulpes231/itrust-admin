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
      className="w-full border-2 focus:border-purple-500 py-2 px-4 placeholder:text-sm placeholder:font-thin outline-none rounded-xl"
      readOnly={readOnly}
    />
  );
};

export default Admininput;
