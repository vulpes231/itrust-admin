import React, { useEffect, useState } from "react";
import { MdClose } from "react-icons/md";
import Formcontain from "../../pages/details/Formcontain";
import Divcontain from "../../pages/details/Divcontain";
import Select from "../trans/Select";
import Admininput from "../../pages/details/Admininput";
import { useDispatch, useSelector } from "react-redux";
import { createNewTrade } from "../../features/tradeSlice";

const pair = [
  "XAU/USD",
  "BTC/USDT",
  "ETH/USDT",
  "EUR/USD",
  "GBP/USD",
  "DOGE/USDT",
];

const Trademodal = ({ close, myUsers }) => {
  const dispatch = useDispatch();

  const initialState = {
    userId: "",
    amountTraded: "",
    botId: "",
    pair: "",
  };

  const [form, setForm] = useState(initialState);
  const [currentUser, setCurrentUser] = useState(null);

  const { createTradeError, createTradeLoading, createTradeSuccess } =
    useSelector((state) => state.trade);

  const userOptions = myUsers?.map((user) => {
    return (
      <option key={user._id} value={user._id}>
        {user.email}
      </option>
    );
  });

  const userBotOptions = currentUser?.bots?.map((bot) => {
    // console.log(bot.botId);
    return (
      <option key={bot._id} value={bot.botId}>
        {bot.name}
      </option>
    );
  });

  const pairOptions = pair.map((pr, index) => {
    return (
      <option value={pr} key={index}>
        {pr}
      </option>
    );
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleTradeExecute = (e) => {
    e.preventDefault();
    console.log(form);
    dispatch(createNewTrade(form));
  };

  useEffect(() => {
    if (form.userId) {
      console.log("gettinguser bots");
      const current = myUsers?.find((user) => user._id === form.userId);
      setCurrentUser(current);
    }
  }, [form.userId]);

  useEffect(() => {
    let timeout;
    if (createTradeSuccess) {
      timeout = 3000;
      setTimeout(() => {
        window.location.reload();
      }, timeout);
    }
    return () => clearTimeout(timeout);
  }, [createTradeSuccess]);
  return (
    <div className="w-full h-screen flex items-center justify-center absolute top-0 left-0 ">
      <div className="bg-white p-6 sm:w-[350px] gap-4 flex flex-col ">
        <div className="flex justify-between">
          <h5>create trade</h5>
          <span className="cursor-pointer" onClick={close}>
            <MdClose />
          </span>
        </div>
        <form
          action=""
          className="flex flex-col gap-3 capitalize text-xs font-medium"
        >
          <Formcontain>
            <Divcontain>
              <label htmlFor="">user</label>
              <Select
                onChange={handleChange}
                value={form.userId}
                name={"userId"}
              >
                <option value="">select user</option>
                {userOptions}
              </Select>
            </Divcontain>
          </Formcontain>
          <Formcontain>
            <Divcontain>
              <label htmlFor="">bot</label>
              <Select onChange={handleChange} value={form.botId} name={"botId"}>
                <option value="">select bot</option>
                {userBotOptions}
              </Select>
            </Divcontain>
          </Formcontain>
          <Formcontain>
            <Divcontain>
              <label htmlFor="">margin</label>
              <Admininput
                type={"text"}
                handleChange={handleChange}
                value={form.amountTraded}
                name={"amountTraded"}
                placeHolder={"Enter amount (USD)"}
              />
            </Divcontain>
          </Formcontain>
          <Formcontain>
            <Divcontain>
              <label htmlFor="">pair</label>
              <Select onChange={handleChange} value={form.pair} name={"pair"}>
                <option value="">select pair</option>
                {pairOptions}
              </Select>
            </Divcontain>
          </Formcontain>
          {createTradeError && (
            <p className="text-xs font-thin text-red-500">{createTradeError}</p>
          )}
          {createTradeSuccess && (
            <p className="text-xs font-thin text-green-500">
              {`trade created successfully.`}
            </p>
          )}
          <button
            className="bg-purple-500 hover:bg-purple-600 py-3 rounded-3xl mt-5 text-white capitalize"
            onClick={handleTradeExecute}
          >
            {!createTradeLoading ? "  Execute trade" : "Wait..."}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Trademodal;
