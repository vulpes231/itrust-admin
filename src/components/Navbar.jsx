import React, { useState } from "react";
import { links } from "../constants";
import { Link } from "react-router-dom";
import { MdClose, MdMenu } from "react-icons/md";
import { light } from "../assets";

const Navbar = ({ toggle, handleToggle }) => {
  return (
    <header className="w-full isolate top-0 bg-white">
      <nav className="p-4 flex justify-between items-center">
        <figure className="">
          <img src={light} alt="" className="w-[35px]" />
        </figure>
        <div className="flex items-center gap-6">
          <ul className="hidden lg:flex items-center gap-4">
            {links.map((lnk) => {
              return (
                <li key={lnk.id}>
                  <Link
                    className="inline-flex px-4 py-3 bg-purple-500 text-white font-medium text-xs rounded-3xl hover:bg-purple-600"
                    to={lnk.path}
                  >
                    {lnk.title}
                  </Link>
                </li>
              );
            })}
          </ul>
          <button
            className="text-xl font-semibold p-1 sm:hidden"
            onClick={handleToggle}
          >
            {!toggle ? <MdMenu /> : <MdClose />}
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
