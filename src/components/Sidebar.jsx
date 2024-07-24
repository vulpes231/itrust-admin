import React from "react";
import { authLinks } from "../constants";
import { MdAdminPanelSettings, MdHome, MdWallet } from "react-icons/md";
import { FaBots, FaUserGroup } from "react-icons/fa6";
import { FaExchangeAlt } from "react-icons/fa";
import { light } from "../assets";

const Sidebar = ({ toggle, setActiveLink, activeLink }) => {
  return (
    <aside className={`w-[250px] ${toggle ? "block" : "hidden"} bg-white ff`}>
      <div className="h-full p-6 overflow-y-auto">
        <div className="flex items-center gap-2 mb-4">
          <img src={light} alt="" className="w-[25px]" />
          <h3 className=" text-sm sm:text-lg capitalize font-medium ">
            quadx admin
          </h3>
        </div>

        <ul className="flex flex-col gap-2 ">
          {authLinks.map((lnk) => (
            <li key={lnk.id} className="">
              <button
                onClick={() => setActiveLink(lnk.id)}
                className={
                  lnk.id === activeLink
                    ? "flex items-center gap-2 py-2 px-4 hover:bg-purple-200 rounded text-purple-400 text-sm font-normal w-full"
                    : "flex items-center gap-2 py-2 px-4 hover:bg-purple-200 rounded text-sm font-normal w-full"
                }
              >
                {lnk.id === "dash" ? (
                  <MdHome />
                ) : lnk.id === "user" ? (
                  <FaUserGroup />
                ) : lnk.id === "trnx" ? (
                  <FaExchangeAlt />
                ) : lnk.id === "wallet" ? (
                  <MdWallet />
                ) : lnk.id === "bot" ? (
                  <FaBots />
                ) : null}
                {lnk.title}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
