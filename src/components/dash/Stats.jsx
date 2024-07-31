import React, { useEffect } from "react";
import Box from "./Box";
import { FaArchive } from "react-icons/fa";
import { FaUserGroup, FaBots } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { getAccessToken } from "../../utils/utilities";
import { getTrnxs } from "../../features/trnxSlice";
import { getUsers } from "../../features/userSlice";
import { getWallet } from "../../features/walletSlice";
import { getAllBots } from "../../features/botSlice";
import { FaWallet } from "react-icons/fa6";
import { SiMarketo } from "react-icons/si";
import { getAllTrades } from "../../features/tradeSlice";

const Stats = () => {
  const dispatch = useDispatch();
  const accessToken = getAccessToken();
  const { users } = useSelector((state) => state.user);
  const { trnxs } = useSelector((state) => state.trnx);
  const { wallet } = useSelector((state) => state.wallet);
  const { bots } = useSelector((state) => state.bot);
  const { trades } = useSelector((state) => state.trade);

  useEffect(() => {
    if (accessToken) {
      dispatch(getTrnxs());
      dispatch(getUsers());
      dispatch(getWallet());
      dispatch(getAllBots());
      dispatch(getAllTrades());
    }
  }, [accessToken, dispatch]);
  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <Box
        icon={<FaUserGroup />}
        title={"users"}
        value={users?.users?.length ? users.users.length : 0}
      />
      <Box
        icon={<SiMarketo />}
        title={"transactions"}
        value={trnxs?.trnx?.length ? trnxs.trnx.length : 0}
      />
      <Box
        icon={<FaWallet />}
        title={"wallets"}
        value={wallet?.wallets?.length ? wallet.wallets.length : 0}
      />
      <Box
        icon={<FaBots />}
        title={"bots"}
        value={bots?.length ? bots.length : 0}
      />
      <Box
        icon={<FaArchive />}
        title={"trades"}
        value={trades?.trades?.length ? trades.trades.length : 0}
      />
    </div>
  );
};

export default Stats;
