import React, { useEffect } from "react";
import Datatable from "../components/Datatable";
import { getAccessToken } from "../utils/utilities";
import { useNavigate } from "react-router-dom";
const header = [
  {
    id: "name",
    name: "name",
  },
  {
    id: "email",
    name: "email",
  },
  {
    id: "id",
    name: "id",
  },
  {
    id: "isVerified",
    name: "isVerified",
  },
];
const Users = () => {
  const navigate = useNavigate();
  const accessToken = getAccessToken();

  useEffect(() => {
    if (!accessToken) {
      navigate("/");
    }
  }, [accessToken]);

  return (
    <div>
      <h3 className="font-bold text-lg p-4">Users</h3>
      <div>
        <Datatable headers={header} />
      </div>
    </div>
  );
};

export default Users;
