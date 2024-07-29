import React, { useState, useEffect } from "react";
import { getAccessToken } from "../utils/utilities";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Pagescontainer from "../components/Pagescontainer";

const header = [
  {
    id: "creator",
    name: "creator ID",
  },
];

const Trades = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const accessToken = getAccessToken();
  const [trnxRow, setTrnxRow] = useState(null);
  const [myTrades, setMyTrades] = useState([]);
  const [action, setAction] = useState(null);
  const [id, setId] = useState(null);
  const [createTradeModal, setCreateTradeModal] = useState(false);

  const handleClick = (row, option) => {
    setId(row._id);
    setTrnxRow(row);
    setAction(option);
  };

  const handleCreateModal = () => {
    setCreateTradeModal(true);
  };
  const closeCreateModal = () => {
    setCreateTradeModal(false);
  };

  const closeModal = () => {
    console.log("Clicked close");
    setAction("");
    setId(null);
  };

  useEffect(() => {
    if (!accessToken) {
      navigate("/");
    } else {
      //   dispatch(getTrnxs());
    }
  }, [accessToken]);

  //   useEffect(() => {
  //     if (trades) {
  //       setMyTrades(trades.trades);
  //     }
  //   }, [trades]);
  return (
    <Pagescontainer>
      <div className="flex justify-between items-center py-2">
        <h3 className="font-bold text-lg p-4">Trades</h3>
        <button
          onClick={handleCreateModal}
          className="px-5 py-2.5 rounded-3xl bg-purple-500 text-white text-xs font-medium hover:bg-purple-600 capitalize"
        >
          create trade
        </button>
      </div>
      {/* <Datatable
    headers={header}
    data={myTrnxs}
    title={"Approve"}
    handleClick={handleClick}
    customClass={"text-white px-4 py-2 bg-green-500 text-xs rounded-sm"}
  /> */}

      {/* {action === "approve" ? (
    <Approvemodal trnxRow={trnxRow} closeModal={closeModal} />
  ) : action === "view" ? (
    <Edittrans close={closeModal} trnxRow={trnxRow} />
  ) : action === "reject" ? (
    <Rejectmodal trnxRow={trnxRow} closeModal={closeModal} />
  ) : action === "delete" ? (
    <Deletetrnx trnxRow={trnxRow} closeDelete={closeModal} />
  ) : null} */}
    </Pagescontainer>
  );
};

export default Trades;
