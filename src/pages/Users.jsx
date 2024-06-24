import React, { useEffect } from "react";
import Datatable from "../components/Datatable";
import { getAccessToken } from "../utils/utilities";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../features/userSlice";
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
  const dispatch = useDispatch();
  const accessToken = getAccessToken();

  const { getError, getLoading, users } = useSelector((state) => state.user);

  useEffect(() => {
    if (!accessToken) {
      navigate("/");
    } else {
      dispatch(getUsers());
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
