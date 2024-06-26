import React, { useEffect, useState } from "react";
import Datatable from "../components/Datatable";
import { useNavigate } from "react-router-dom";
import { getAccessToken } from "../utils/utilities";
import { useDispatch, useSelector } from "react-redux";
import { getTrnxs } from "../features/trnxSlice";
import Approvemodal from "../components/trans/Approvemodal";

const header = [
  {
    id: "creator",
    name: "creator ID",
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
  const [approveModal, setApproveModal] = useState(null);
  const [myTrnxs, setMyTrnxs] = useState([]);
  const { getTransactionError, getTransactionLoading, trnxs } = useSelector(
    (state) => state.trnx
  );

  const handleClick = (row) => {
    console.log("Clicked row data:", row);
    setTrnxRow(row);
    setApproveModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
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
    <div>
      <h3 className="font-bold text-lg p-4">Transactions</h3>
      <div>
        <Datatable
          headers={header}
          data={myTrnxs}
          title={"Approve"}
          handleClick={handleClick}
          customClass={"text-white px-4 py-2 bg-green-500 text-xs rounded-sm"}
        />
      </div>
      {approveModal && (
        <Approvemodal trnxRow={trnxRow} closeModal={closeModal} />
      )}
    </div>
  );
};

export default Transactions;
