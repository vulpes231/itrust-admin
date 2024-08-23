import React, { useEffect, useState } from "react";
import Pagescontainer from "../components/Pagescontainer";
import Addcoinmodal from "./coins/Addcoinmodal";
import { useDispatch, useSelector } from "react-redux";
import { getAccessToken } from "../utils/utilities";
import { getAllCoins } from "../features/masterWalletSlice";
import Editcoinmodal from "./coins/Editcoinmodal";

const Masterwallet = () => {
  const dispatch = useDispatch();

  const [showCoinModal, setShowCoinModal] = useState(false);
  const [edit, setEdit] = useState(false);

  const { coins } = useSelector((state) => state.master);

  const showEditModal = (coin) => {
    console.log(coin);
    setEdit(true);
  };

  const myWallets = coins?.map((coin, index) => {
    return (
      <tr
        key={coin._id}
        className={index % 2 !== 0 ? "bg-gray-200" : "bg-transparent"}
      >
        <td className="px-4 py-2.5 capitalize">{coin.coin}</td>
        <td className="px-4 py-2.5">{coin.address}</td>
        <td className="px-4 py-2.5">
          <button
            onClick={() => showEditModal(coin)}
            className="text-xs font-medium bg-purple-500 py-2.5 px-5 rounded-3xl text-white capitalize"
          >
            update
          </button>
        </td>
      </tr>
    );
  });

  const accessToken = getAccessToken();

  // const handleCoinModal = () => {
  //   setShowCoinModal((prev) => !prev);
  // };

  useEffect(() => {
    if (accessToken) {
      dispatch(getAllCoins());
    }
  }, [accessToken]);
  return (
    <Pagescontainer>
      <div className="flex justify-between p-2">
        <h3 className="font-medium text-lg lg:text-xl my-10">
          Manage master wallet
        </h3>
        {/* <button
          className="text-xs font-medium bg-purple-500 py-2.5 px-5 rounded-3xl text-white capitalize"
          onClick={handleCoinModal}
        >
          add coin
        </button> */}
      </div>
      <div>
        <table className="min-w-full bg-white">
          <thead className="text-left bg-slate-300 capitalize">
            <tr>
              <th className="px-4 py-2.5">coinname</th>
              <th className="px-4 py-2.5">address</th>
              <th className="px-4 py-2.5">actions</th>
            </tr>
          </thead>
          <tbody>{myWallets}</tbody>
        </table>
      </div>
      {showCoinModal && <Addcoinmodal />}
      {edit && <Editcoinmodal />}
    </Pagescontainer>
  );
};

export default Masterwallet;
