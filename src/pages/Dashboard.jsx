import React, { useState } from "react";
import { MdMenu } from "react-icons/md";
import { Link } from "react-router-dom";
import { authLinks } from "../constants";
import Stats from "../components/dash/Stats";

const Dashboard = () => {
  const [toggle, setToggle] = useState(false);

  const handleToggle = () => {
    setToggle((prev) => !prev); // Toggle the state between true and false
  };

  return (
    <section className="min-h-screen flex">
      <aside
        className={`w-[250px] ${toggle ? "block" : "hidden"} bg-slate-200`}
      >
        <div className="h-full p-6 overflow-y-auto">
          <ul className="flex flex-col gap-4">
            {authLinks.map((lnk) => (
              <li key={lnk.id}>
                <Link
                  to={lnk.path}
                  className="block py-2 px-4 hover:bg-gray-200 rounded"
                >
                  {lnk.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </aside>
      <div
        className={`flex-1 ${
          toggle ? "w-[calc(100% - 250px)]" : "w-full"
        } bg-slate-50`}
      >
        <div className="p-6">
          <span onClick={handleToggle} className="cursor-pointer">
            <MdMenu />
          </span>
          <div className="mt-4 flex flex-col gap-4">
            <p>Welcome Admin</p>
            <div>
              <>
                <Stats />
              </>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
