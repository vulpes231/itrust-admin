import React, { useEffect, useState } from "react";
import Datatable from "../components/Datatable";
import { Link, useNavigate } from "react-router-dom";
import { getAccessToken } from "../utils/utilities";
import { getWallet } from "../features/walletSlice";
import { useDispatch, useSelector } from "react-redux";
import Walletmodal from "../components/wallet/Walletmodal";
import Pagescontainer from "../components/Pagescontainer";

const header = [
  {
    id: "user",
    name: "owner",
  },
  {
    id: "tradingBalance",
    name: "trading balance",
  },
  {
    id: "assets",
    name: "Assets",
  },
];

const Wallets = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const accessToken = getAccessToken();

  const [myWallets, setMyWallets] = useState([]);
  const [rowData, setRowData] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const { getWalletError, getWalletLoading, wallet } = useSelector(
    (state) => state.wallet
  );

  const handleClick = (row) => {
    console.log("Clicked row data:", row);
    setRowData(row);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    if (!accessToken) {
      navigate("/");
    } else {
      dispatch(getWallet());
    }
  }, [accessToken]);

  useEffect(() => {
    if (wallet) {
      setMyWallets(wallet.wallets);
    }
  }, [wallet]);

  return (
    <Pagescontainer>
      <div className="flex justify-between items-center">
        <h3 className="font-bold text-lg p-4">Wallets</h3>
        <Link
          className="text-xs font-medium bg-purple-500 py-2.5 px-5 rounded-3xl text-white"
          to={"/mastercontrol"}
        >
          Master wallet
        </Link>
      </div>
      <Datatable
        headers={header}
        data={myWallets}
        title={"Set Address"}
        handleClick={handleClick}
        customClass={"text-white px-4 py-2 bg-yellow-500 text-xs rounded-sm "}
      />
      {showModal && <Walletmodal closeModal={closeModal} rowData={rowData} />}
    </Pagescontainer>
  );
};

export default Wallets;
