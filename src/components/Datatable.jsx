import React, { useState, useEffect } from "react";

const Datatable = ({
  headers,
  data,
  handleClick,
  customClass,
  onChange,
  value,
}) => {
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

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

  // Calculate pagination data
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data?.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil((data?.length || 0) / itemsPerPage);

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

  const handlePageChange = (direction) => {
    setCurrentPage((prevPage) => {
      if (direction === "next" && prevPage < totalPages) {
        return prevPage + 1;
      } else if (direction === "prev" && prevPage > 1) {
        return prevPage - 1;
      }
      return prevPage;
    });
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead className="bg-slate-600 text-white">
          <tr className="text-[#fff]">
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
          {currentItems?.map((row, rowIndex) => (
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
      <div className="flex justify-between items-center py-4">
        <button
          onClick={() => handlePageChange("prev")}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md"
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange("next")}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Datatable;
