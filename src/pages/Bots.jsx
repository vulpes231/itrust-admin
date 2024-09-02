import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAccessToken } from "../utils/utilities";
import { getAllBots } from "../features/botSlice";
import Datatable from "../components/Datatable";
import { Newbot } from "../components";
import Pagescontainer from "../components/Pagescontainer";

const header = [
  // {
  //   id: "_id",
  //   name: "botId",
  // },
  {
    id: "name",
    name: "name",
  },
  {
    id: "amountTraded",
    name: "amountTraded",
  },
  {
    id: "yield",
    name: "yield",
  },
  {
    id: "winRate",
    name: "winRate",
  },
  {
    id: "aum",
    name: "aum",
  },
  // {
  //   id: "usersPurchased",
  //   name: "Owned",
  // },
  {
    id: "status",
    name: "status",
  },
];

const Bots = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [myBots, setMyBots] = useState([]);
  const [createBotModal, setCreateBotModal] = useState(false);
  const accessToken = getAccessToken();

  const { getBotsLoading, bots } = useSelector((state) => state.bot);

  const showCreateModal = () => {
    setCreateBotModal(true);
  };

  const closeCreateModal = () => {
    setCreateBotModal(false);
  };

  useEffect(() => {
    if (!accessToken) {
      navigate("/signin");
    } else {
      dispatch(getAllBots());
    }
  }, [dispatch, accessToken]);

  useEffect(() => {
    if (bots) {
      setMyBots(bots);
    }
  }, [bots]);

  if (getBotsLoading) {
    return (
      <div className="lg:w-[1200px] mx-auto mt-[80px]">
        <h3 className="font-bold text-lg p-4">Bots</h3>
        <p>Fetching bots...</p>
      </div>
    );
  }
  return (
    <Pagescontainer>
      <div className="flex justify-between items-center">
        <h3 className="font-bold text-lg p-4">Bots</h3>
        <button
          onClick={showCreateModal}
          className="inline-flex bg-purple-500 px-5 py-2 rounded-3xl text-white capitalize font-medium text-sm hover:bg-purple-600"
        >
          create bot
        </button>
      </div>
      <Datatable
        data={myBots}
        headers={header}
        title={"Edit bot"}
        customClass={"text-white px-4 py-2 bg-purple-700 text-xs rounded-sm"}
      />
      {createBotModal && <Newbot closeModal={closeCreateModal} />}
    </Pagescontainer>
  );
};

export default Bots;
