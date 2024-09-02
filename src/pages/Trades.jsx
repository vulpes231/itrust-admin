import React, { useState, useEffect } from "react";
import { getAccessToken } from "../utils/utilities";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Pagescontainer from "../components/Pagescontainer";
import { getAllTrades } from "../features/tradeSlice";
import Trademodal from "../components/trades/Trademodal";
import { getUsers } from "../features/userSlice";
import Datatable from "../components/Datatable";
import Edittrade from "../components/trades/Edittrade";
import Deletetrade from "../components/trades/Deletetrade";

const header = [
  {
    id: "botName",
    name: "botname",
  },
  {
    id: "email",
    name: "user",
  },
  {
    id: "date",
    name: "date",
  },
  {
    id: "amountTraded",
    name: "amountTraded",
  },
  {
    id: "pair",
    name: "pair",
  },
  // {
  //   id: "profit",
  //   name: "profit",
  // },
  {
    id: "roi",
    name: "ROI (%)",
  },
  {
    id: "status",
    name: "status",
  },
];

const Trades = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const accessToken = getAccessToken();
  const [rowData, setRowData] = useState(null);
  const [myTrades, setMyTrades] = useState([]);
  const [action, setAction] = useState(null);
  const [id, setId] = useState(null);
  const [showCreateTrade, setshowCreateTrade] = useState(false);

  const { trades, getTradeLoading, getTradeError } = useSelector(
    (state) => state.trade
  );
  const { users } = useSelector((state) => state.user);

  // console.log(trades);

  const handleClick = (row, option) => {
    setId(row._id);
    setRowData(row);
    setAction(option);

    // console.log(row, option);
  };

  const handleTradeModal = () => {
    setshowCreateTrade(true);
  };

  const closeTradeModal = () => {
    setshowCreateTrade(false);
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
      dispatch(getAllTrades());
      dispatch(getUsers());
    }
  }, [accessToken]);

  useEffect(() => {
    if (trades) {
      setMyTrades(trades.trades);
    }
  }, [trades]);

  if (getTradeLoading) {
    return (
      <div className="lg:w-[1200px] mx-auto mt-[80px]">
        <h3 className="font-bold text-lg p-4">Trades</h3>
        <p>Fetching trades...</p>
      </div>
    );
  }
  return (
    <Pagescontainer>
      <div className="flex justify-between items-center py-2 ">
        <h3 className="font-bold text-lg p-4">Trades</h3>
        <button
          onClick={handleTradeModal}
          className="px-5 py-2.5 rounded-3xl bg-purple-500 text-white text-xs font-medium hover:bg-purple-600 capitalize"
        >
          create trade
        </button>
      </div>
      <Datatable
        headers={header}
        data={myTrades}
        title={"Edit"}
        handleClick={handleClick}
        customClass={
          "text-white px-4 py-2 bg-purple-700 text-xs rounded-sm capitalize"
        }
      />
      {showCreateTrade && (
        <Trademodal close={closeTradeModal} myUsers={users?.users} />
      )}

      {action === "view" ? (
        <Edittrade close={closeModal} trnxRow={rowData} />
      ) : action === "delete" ? (
        <Deletetrade close={closeModal} trnxRow={rowData} />
      ) : null}
    </Pagescontainer>
  );
};

export default Trades;
