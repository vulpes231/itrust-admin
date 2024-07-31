import React, { useState, useEffect } from "react";

const Datatable = ({
  headers,
  data,
  handleClick,
  customClass,
  onChange,
  value,
}) => {
  // Initialize options state with empty array
  const [options, setOptions] = useState([]);

  // Handle option selection for a specific row
  const handleOption = (rowIndex, e) => {
    const { name, value } = e.target;
    setOptions((prevOptions) => {
      const updatedOptions = [...prevOptions];
      updatedOptions[rowIndex] = {
        ...updatedOptions[rowIndex],
        [name]: value,
      };
      return updatedOptions;
    });
  };

  // Update options when data changes
  useEffect(() => {
    if (data) {
      setOptions(new Array(data.length).fill({ action: "" }));
    }
  }, [data]);

  const renderCellContent = (row, hdr) => {
    if (typeof row[hdr.id] === "object") {
      const myAssets = row[hdr.id].map((cn) => (
        <option key={cn._id} value={cn.shortName}>
          {cn.shortName.toUpperCase()}: {cn.address || "None"}
        </option>
      ));
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
      <table className="min-w-full bg-white border border-slate-200 shadow-md rounded">
        <thead className="bg-slate-200 ">
          <tr>
            {headers?.map((hdr, index) => (
              <th
                key={index}
                className="px-6 py-3 whitespace-nowrap text-left text-xs font-normal capitalize tracking-wider"
              >
                {hdr.name}
              </th>
            ))}
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 capitalize tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {data?.map((row, rowIndex) => (
            <tr
              className={`font-thin text-xs ${
                rowIndex % 2 === 0 ? "bg-gray-100" : "bg-transparent"
              }`}
              key={rowIndex}
            >
              {headers.map((hdr, colIndex) => (
                <td
                  key={colIndex}
                  className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                >
                  {renderCellContent(row, hdr)}
                </td>
              ))}
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <select
                  value={options[rowIndex]?.action || ""}
                  name="action"
                  onChange={(e) => {
                    e.stopPropagation();
                    handleOption(rowIndex, e);
                    handleClick(row, e.target.value);
                  }}
                  className={`text-center ${customClass}`}
                >
                  <option value="">Actions</option>
                  <option value="view">Edit</option>
                  <option value="delete">Delete</option>
                  {row.trnxType && <option value="approve">Approve</option>}
                  {row.currency && <option value="suspend">Suspend</option>}
                  {row.trnxType && <option value="reject">Reject</option>}
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Datatable;
