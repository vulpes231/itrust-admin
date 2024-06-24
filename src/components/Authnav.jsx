import React, { useState } from "react";
import { authLinks } from "../constants";
import { Link } from "react-router-dom";
import { MdClose, MdMenu } from "react-icons/md";

const Authnav = () => {
  const [toggle, setToggle] = useState(false);

  const handleToggle = () => {
    setToggle((prev) => !prev);
  };

  return (
    <header className="w-full isolate top-0 bg-slate-200">
      <nav className="p-6 flex justify-between items-center">
        <h1>iTrust Admin</h1>
        <div className="flex items-center gap-6">
          <ul className="hidden lg:flex items-center gap-4">
            {authLinks.map((lnk) => {
              return (
                <li key={lnk.id}>
                  <Link to={lnk.path}>{lnk.title}</Link>
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

export default Authnav;
