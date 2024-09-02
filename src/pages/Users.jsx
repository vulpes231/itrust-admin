import React, { useEffect, useState } from "react";
import Datatable from "../components/Datatable";
import { getAccessToken } from "../utils/utilities";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUsers, removeUser } from "../features/userSlice";
import Pagescontainer from "../components/Pagescontainer";
import DeleteModal from "./delete/deleteModal";

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
  const [action, setAction] = useState(null);
  const [id, setId] = useState(null);
  const [deleteModal, setDeleteModal] = useState(false);

  const [user, setUser] = useState(null);

  const { getError, getLoading, users } = useSelector((state) => state.user);

  const editUser = (row, option) => {
    setId(row._id);
    setAction(option);
  };

  const closeEdit = () => {
    setId(null);
    setAction("");
    setUser(null);
  };

  const closeDelete = () => {
    setDeleteModal(false);
    setAction("");
  };

  const deleteUser = (e) => {
    e.preventDefault();
    dispatch(removeUser(id));
  };

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

  useEffect(() => {
    if (action === "view" && id) {
      console.log("yes");
      navigate(`/user/?userId=${id}`);
    }
    if (action === "delete") {
      setDeleteModal(true);
    }
  }, [action, id, dispatch]);

  if (getLoading) {
    return (
      <div className="lg:w-[1200px] mx-auto mt-[80px]">
        <h3 className="font-bold text-lg p-4">Users</h3>
        <p>Fetching users...</p>
      </div>
    );
  }

  return (
    <Pagescontainer>
      <h3 className="font-bold text-lg p-4">Users</h3>
      <Datatable
        headers={header}
        data={myUsers}
        title={"Edit"}
        handleClick={editUser}
        customClass={
          "text-white px-4 py-2 bg-blue-500 text-xs rounded-sm capitalize"
        }
      />

      {deleteModal && (
        <DeleteModal close={closeDelete} deleteUser={deleteUser} />
      )}
    </Pagescontainer>
  );
};

export default Users;
