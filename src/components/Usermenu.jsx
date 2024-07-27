import React, { useEffect, useState } from "react";
import { FaUserAlt } from "react-icons/fa";
import { FaGear } from "react-icons/fa6";
import { MdLogout } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { logoutAdmin } from "../features/logoutSlice";
import { useNavigate } from "react-router-dom";

const Usermenu = ({ setToken }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);

  const { logoutError, logoutLoading, loggedOut } = useSelector(
    (state) => state.logout
  );

  const handleShowMenu = () => {
    setShowMenu((prev) => !prev);
  };

  const handleLogout = () => {
    console.log("logging out...");
    dispatch(logoutAdmin());
  };

  useEffect(() => {
    let timeout;
    if (loggedOut) {
      sessionStorage.removeItem("accessToken");
      sessionStorage.removeItem("admin");

      timeout = 2000;
      setTimeout(() => {
        navigate("/");
        window.location.reload();
        setToken(false);
      }, timeout);
    }
    return () => clearTimeout(timeout);
  }, [loggedOut]);

  return (
    <div
      onClick={handleShowMenu}
      className="bg-purple-500 p-2.5 rounded-full cursor-pointer"
    >
      <FaUserAlt className="text-white " />
      {showMenu && (
        <div className="absolute top-[60px] right-[16px] bg-white shadow rounded-lg w-[130px] py-3 px-4 text-xs  flex flex-col gap-4">
          <button
            className="flex items-center capitalize gap-2 hover:text-purple-500"
            onClick={handleLogout}
          >
            {" "}
            <FaGear /> settings
          </button>
          <button
            className="flex items-center capitalize gap-2 hover:text-purple-500"
            onClick={handleLogout}
          >
            {" "}
            <FaUserAlt /> admin
          </button>
          <button
            className="flex items-center capitalize gap-2 hover:text-purple-500"
            onClick={handleLogout}
          >
            {" "}
            <MdLogout /> {logoutLoading ? "wait..." : "logout"}
          </button>
        </div>
      )}
    </div>
  );
};

export default Usermenu;
