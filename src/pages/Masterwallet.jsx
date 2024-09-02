import React, { useEffect, useState } from "react";
import Pagescontainer from "../components/Pagescontainer";
import Addcoinmodal from "./coins/Addcoinmodal";
import { useDispatch, useSelector } from "react-redux";
import { getAccessToken } from "../utils/utilities";
import { getAllCoins } from "../features/masterWalletSlice";
import Editcoinmodal from "./coins/Editcoinmodal";
import { useNavigate } from "react-router-dom";

const Masterwallet = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showCoinModal, setShowCoinModal] = useState(false);
  const [edit, setEdit] = useState(false);

  const { coins } = useSelector((state) => state.master);

  const showEditModal = (coin) => {
    console.log(coin);
    setEdit(true);
  };

  const myWallets = coins?.map((coin, index) => {
    return (
      <div
        key={coin._id}
        // className={index % 2 !== 0 ? "bg-gray-200" : "bg-transparent"}
        className="flex justify-between items-center"
      >
        <span className="px-4 py-2.5 capitalize w-[15%]">{coin.coin}</span>
        <input
          className=" border-2 focus:border-purple-500 py-2 px-4 placeholder:text-sm placeholder:font-thin outline-none rounded-xl w-[70%]"
          placeholder={coin.address}
        />
        <span className="px-4 py-2.5 w-[15%]">
          <button
            onClick={() => showEditModal(coin)}
            className="text-xs font-medium bg-purple-500 py-2.5 px-5 text-white capitalize"
          >
            save
          </button>
        </span>
      </div>
    );
  });

  const accessToken = getAccessToken();

  // const handleCoinModal = () => {
  //   setShowCoinModal((prev) => !prev);
  // };

  // useEffect(() => {
  //   if (!accessToken) {
  //     na;
  //   }
  // });

  useEffect(() => {
    if (accessToken) {
      dispatch(getAllCoins());
    }
  }, [accessToken]);
  return (
    <div className="p-10 bg-white shadow-xl rounded-xl">
      <div className="flex justify-between p-2">
        <h3 className="font-medium text-sm lg:text-lg capitalize mb-5 ">
          Set global address
        </h3>
        {/* <button
          className="text-xs font-medium bg-purple-500 py-2.5 px-5 rounded-3xl text-white capitalize"
          onClick={handleCoinModal}
        >
          add coin
        </button> */}
      </div>
      <div>{myWallets}</div>
      {showCoinModal && <Addcoinmodal />}
      {edit && <Editcoinmodal />}
    </div>
  );
};

export default Masterwallet;
