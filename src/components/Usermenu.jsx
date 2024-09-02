import React, { useState } from "react";
import { FaUserAlt } from "react-icons/fa";
import { FaGear } from "react-icons/fa6";
import { MdLogout } from "react-icons/md";
import { Link } from "react-router-dom";

const Usermenu = ({ logout, load }) => {
  const [showMenu, setShowMenu] = useState(false);

  const handleShowMenu = () => {
    setShowMenu((prev) => !prev);
  };

  return (
    <div
      onClick={handleShowMenu}
      className="bg-purple-500 p-2.5 rounded-full cursor-pointer"
    >
      <FaUserAlt className="text-white " />
      {showMenu && (
        <div className="absolute top-[60px] right-[8%] md:right-[220px] bg-white shadow rounded-lg w-[130px] py-3 px-4 text-xs  flex flex-col gap-4">
          <Link
            to={"/settings"}
            className="flex items-center capitalize gap-2 hover:text-purple-500"
            // onClick={logout}
          >
            {" "}
            <FaGear /> settings
          </Link>
          <Link
            className="flex items-center capitalize gap-2 hover:text-purple-500"
            // onClick={logout}
          >
            {" "}
            <FaUserAlt /> admin
          </Link>
          <button
            className=" hover:text-purple-500 cursor-pointer"
            onClick={logout}
          >
            <span className="flex items-center capitalize gap-2">
              <MdLogout />
              {!load ? "logout" : "wait..."}
            </span>
          </button>
        </div>
      )}
    </div>
  );
};

export default Usermenu;
