import React from "react";

const Datatable = ({
  headers,
  data,
  handleClick, // Assume handleClick is defined in the parent component
  title,
  customClass,
  name,
  onChange,
  value,
}) => {
  const renderCellContent = (row, hdr) => {
    if (typeof row[hdr.id] === "object") {
      const myAssets = row[hdr.id].map((cn) => {
        return (
          <option key={cn._id} value={cn.shortName}>
            {cn.shortName.toUpperCase()}: {cn.address || "None"}
          </option>
        );
      });
      return (
        <select
          value={value}
          onChange={onChange}
          className="p-2 rounded-md bg-transparent border text-xs"
        >
          {myAssets}
        </select>
      );
    } else {
      return <span>{row[hdr.id]}</span>;
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border-gray-200 shadow-md rounded">
        <thead className="bg-gray-100">
          <tr>
            {headers?.map((hdr, index) => (
              <th
                key={index}
                className="px-6 py-3 whitespace-nowrap text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {hdr.name}
              </th>
            ))}
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {data?.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {headers.map((hdr, colIndex) => (
                <td
                  key={colIndex}
                  className=" capitalize px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                >
                  {renderCellContent(row, hdr)}
                </td>
              ))}
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button
                  onClick={() => handleClick(row)}
                  className={customClass}
                >
                  {title}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Datatable;
