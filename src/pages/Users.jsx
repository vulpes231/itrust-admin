import React, { useEffect, useState } from "react";
import Datatable from "../components/Datatable";
import { getAccessToken } from "../utils/utilities";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../features/userSlice";

const header = [
  {
    id: "username",
    name: "username",
  },
  {
    id: "email",
    name: "email",
  },
  {
    id: "phone",
    name: "phone",
  },
  {
    id: "occupation",
    name: "occupation",
  },
  {
    id: "currency",
    name: "currency",
  },
];

const Users = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const accessToken = getAccessToken();

  const [myUsers, setMyUsers] = useState([]);

  const { getError, getLoading, users } = useSelector((state) => state.user);

  const editUser = () => {};

  useEffect(() => {
    if (!accessToken) {
      navigate("/");
    } else {
      dispatch(getUsers());
    }
  }, [accessToken]);

  useEffect(() => {
    if (users) {
      setMyUsers(users.users);
    }
  }, [users]);

  // console.log(myUsers);

  return (
    <div>
      <h3 className="font-bold text-lg p-4">Users</h3>
      <div>
        <Datatable
          headers={header}
          data={myUsers}
          title={"Edit"}
          handleClick={editUser}
          customClass={"text-white px-4 py-2 bg-blue-500 text-xs rounded-sm"}
        />
      </div>
    </div>
  );
};

export default Users;
