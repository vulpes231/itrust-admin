import React, { useEffect, useState } from "react";

import Stats from "../components/dash/Stats";
import Sidebar from "../components/Sidebar";
import Users from "./Users";
import Transactions from "./Transactions";
import { useNavigate } from "react-router-dom";
import { getAccessToken } from "../utils/utilities";
import Bots from "./Bots";

const Dashboard = ({ toggle, handleToggle }) => {
  const [activeLink, setActiveLink] = useState("dash");

  const admin = JSON.parse(sessionStorage.getItem("admin"));
  // console.log(admin.username);

  const navigate = useNavigate();
  const accessToken = getAccessToken();

  useEffect(() => {
    if (!accessToken || !admin) {
      navigate("/");
    }
  }, [accessToken]);

  return (
    <section className="min-h-screen flex">
      <Sidebar
        toggle={toggle}
        setActiveLink={setActiveLink}
        activeLink={activeLink}
      />
      <div className={`flex-1 ${toggle ? "wid" : "w-full"} bg-slate-50`}>
        <div className="p-6">
          {activeLink === "dash" ? (
            <div className="mt-4 flex flex-col gap-4">
              <p className="capitalize font-semibold text-lg">
                Welcome {admin?.username}
              </p>
              <div>
                <>
                  <Stats />
                </>
              </div>
            </div>
          ) : activeLink === "user" ? (
            <Users />
          ) : activeLink === "trnx" ? (
            <Transactions />
          ) : activeLink === "bot" ? (
            <Bots />
          ) : null}
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
