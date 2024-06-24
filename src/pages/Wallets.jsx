import React, { useEffect } from "react";
import Datatable from "../components/Datatable";
import { useNavigate } from "react-router-dom";
import { getAccessToken } from "../utils/utilities";

const header = [
  {
    id: "owner",
    name: "owner",
  },
  {
    id: "trade",
    name: "trading balance",
  },
  {
    id: "total",
    name: "overall balance",
  },
];

const Wallets = () => {
  const navigate = useNavigate();

  const accessToken = getAccessToken();

  useEffect(() => {
    if (!accessToken) {
      navigate("/");
    }
  }, [accessToken]);

  return (
    <div>
      <h3 className="font-bold text-lg p-4">Wallets</h3>
      <div>
        <Datatable headers={header} />
      </div>
    </div>
  );
};

export default Wallets;
