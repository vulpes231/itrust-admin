import React, { useState } from "react";
import { authLinks } from "../constants";
import { Link } from "react-router-dom";
import { MdClose, MdMenu } from "react-icons/md";
import { light } from "../assets";
import Usermenu from "./Usermenu";

const Authnav = ({ toggle, handleToggle, setToken, logout, logoutLoad }) => {
  return (
    <header className="w-full fixed top-0 bg-white border-b border-slate-200">
      <nav className="p-4 flex justify-between items-center lg:w-[990px] mx-auto">
        <figure className="">
          <img src={light} alt="" className="w-[35px]" />
        </figure>
        <div className="flex items-center gap-6">
          <ul className="hidden lg:flex items-center gap-2">
            {authLinks.map((lnk) => {
              return (
                <li key={lnk.id}>
                  <Link
                    className="inline-flex px-4 py-3 font-medium text-xs rounded-3xl hover:text-purple-600"
                    to={lnk.path}
                  >
                    {lnk.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="flex">
          <Usermenu logout={logout} load={logoutLoad} />
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

export default Authnav;
