import React, { useEffect } from "react";
import Datatable from "../components/Datatable";
import { useNavigate } from "react-router-dom";

const header = [
  {
    id: "amt",
    name: "amount",
  },
  {
    id: "cid",
    name: "creator ID",
  },
  {
    id: "type",
    name: "type",
  },
  {
    id: "status",
    name: "status",
  },
];

const Transactions = () => {
  const navigate = useNavigate();
  const accessToken = getAccessToken();

  useEffect(() => {
    if (!accessToken) {
      navigate("/");
    }
  }, [accessToken]);
  return (
    <div>
      <h3 className="font-bold text-lg p-4">Transactions</h3>
      <div>
        <Datatable headers={header} />
      </div>
    </div>
  );
};

export default Transactions;
