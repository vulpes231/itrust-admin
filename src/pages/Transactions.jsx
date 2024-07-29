import React, { useEffect, useState } from "react";
import Datatable from "../components/Datatable";
import { useNavigate } from "react-router-dom";
import { getAccessToken } from "../utils/utilities";
import { useDispatch, useSelector } from "react-redux";
import { getTrnxs } from "../features/trnxSlice";
import Approvemodal from "../components/trans/Approvemodal";
import Pagescontainer from "../components/Pagescontainer";
import Edittrans from "../components/trans/Edittrans";
import Rejectmodal from "../components/trans/Rejectmodal";
import Deletetrnx from "../components/trans/Deletetrnx";
import Createtransaction from "../components/trans/Createtransaction";

const header = [
  {
    id: "creator",
    name: "creator ID",
  },
  {
    id: "email",
    name: "email",
  },
  {
    id: "username",
    name: "username",
  },
  {
    id: "walletType",
    name: "Coin",
  },
  {
    id: "amount",
    name: "amount",
  },
  {
    id: "trnxType",
    name: "type",
  },
  {
    id: "date",
    name: "date",
  },
  {
    id: "status",
    name: "status",
  },
];

const Transactions = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const accessToken = getAccessToken();
  const [trnxRow, setTrnxRow] = useState(null);
  const [myTrnxs, setMyTrnxs] = useState([]);
  const [action, setAction] = useState(null);
  const [id, setId] = useState(null);

  const [createModal, setCreateModal] = useState(false);

  const { getTransactionError, getTransactionLoading, trnxs } = useSelector(
    (state) => state.trnx
  );

  const handleClick = (row, option) => {
    setId(row._id);
    setTrnxRow(row);
    setAction(option);
  };

  const closeModal = () => {
    console.log("Clicked close");
    setAction("");
    setId(null);
  };

  const handleCreateModal = () => {
    setCreateModal(true);
  };

  const closeCreateModal = () => {
    setCreateModal(false);
  };

  useEffect(() => {
    if (!accessToken) {
      navigate("/");
    } else {
      dispatch(getTrnxs());
    }
  }, [accessToken]);

  useEffect(() => {
    if (trnxs) {
      setMyTrnxs(trnxs.trnx);
    }
  }, [trnxs]);

  return (
    <Pagescontainer>
      <div className="flex justify-between items-center py-2">
        <h3 className="font-bold text-lg p-4">Transactions</h3>
        <button
          onClick={handleCreateModal}
          className="px-5 py-2.5 rounded-3xl bg-purple-500 text-white text-xs font-medium hover:bg-purple-600 capitalize"
        >
          create transaction
        </button>
      </div>
      <Datatable
        headers={header}
        data={myTrnxs}
        title={"Approve"}
        handleClick={handleClick}
        customClass={"text-white px-4 py-2 bg-green-500 text-xs rounded-sm"}
      />

      {action === "approve" ? (
        <Approvemodal trnxRow={trnxRow} closeModal={closeModal} />
      ) : action === "view" ? (
        <Edittrans close={closeModal} trnxRow={trnxRow} />
      ) : action === "reject" ? (
        <Rejectmodal trnxRow={trnxRow} closeModal={closeModal} />
      ) : action === "delete" ? (
        <Deletetrnx trnxRow={trnxRow} closeDelete={closeModal} />
      ) : null}

      {createModal && <Createtransaction close={closeCreateModal} />}
    </Pagescontainer>
  );
};

export default Transactions;
