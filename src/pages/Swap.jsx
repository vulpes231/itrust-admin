import React, { useEffect, useState } from "react";
import Pagescontainer from "../components/Pagescontainer";
import { useDispatch, useSelector } from "react-redux";
import { getAccessToken } from "../utils/utilities";
import { getUsers } from "../features/userSlice";
import { getWallet, swapUserFunds } from "../features/walletSlice";
// import { updateMasterWallet } from "../features/masterWalletSlice";

const Input = ({ placeholder, handleChange, name, value }) => {
  return (
    <input
      type="text"
      placeholder={placeholder}
      className="w-full border-2 focus:border-purple-500 py-2 px-4 placeholder:text-sm placeholder:font-thin outline-none"
      onChange={handleChange}
      name={name}
      value={value}
    />
  );
};

const Label = ({ labelFor }) => {
  return <label htmlFor="">{labelFor}</label>;
};

const Holder = ({ children }) => {
  return <div className="flex flex-col gap-2">{children}</div>;
};

const initialState = {
  userId: "",
  from: "",
  to: "",
  amount: "",
};

const Swap = () => {
  const dispatch = useDispatch();
  const accessToken = getAccessToken();

  const [form, setForm] = useState(initialState);
  const [selectedUserId, setSelectedUserId] = useState(null);

  const { swapLoading, swapError, fundSwapped } = useSelector(
    (state) => state.wallet
  );

  const { users } = useSelector((state) => state.user);
  const { wallet } = useSelector((state) => state.wallet);

  // Transform users to options
  const myUsers = users?.users?.map((user) => (
    <option key={user._id} value={user._id}>
      {user.email}
    </option>
  ));

  // Handle input change
  const handleInput = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle user selection
  const handleUserChange = (e) => {
    const { value } = e.target;
    setForm((prev) => ({
      ...prev,
      userId: value,
    }));
    setSelectedUserId(value); // Update selected user ID
  };

  // Find the user wallet based on the selected user ID
  const userWallet = wallet?.wallets?.find(
    (wallet) => wallet.user === selectedUserId
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
    dispatch(swapUserFunds(form));
  };

  useEffect(() => {
    if (accessToken) {
      dispatch(getUsers());
      dispatch(getWallet());
    }
  }, [accessToken, dispatch]);

  return (
    <Pagescontainer>
      <div className="flex justify-center p-2">
        <h3 className="font-medium text-lg lg:text-xl my-10 capitalize">
          swap funds
        </h3>
      </div>
      <div className="w-full lg:max-w-[500px] lg:mx-auto bg-white p-6">
        <form className="flex flex-col gap-4">
          <Holder>
            <Label labelFor={"select user"} />
            <select
              onChange={handleUserChange}
              value={form.userId}
              name="userId"
              className="bg-transparent p-2 border"
            >
              <option value="">select user</option>
              {myUsers}
            </select>
          </Holder>
          <Holder>
            <Label labelFor={"from"} />
            <select
              name="from"
              value={form.from}
              onChange={handleInput}
              className="bg-transparent p-2 border"
            >
              <option value="">select account</option>
              {userWallet?.assets?.map((asset, index) => {
                return (
                  <option key={index} value={asset.coinName}>
                    {asset.coinName} - {asset.balance}
                  </option>
                );
              })}
            </select>
          </Holder>
          <Holder>
            <Label labelFor={"to"} />
            <select
              name="to"
              value={form.to}
              onChange={handleInput}
              className="bg-transparent p-2 border"
            >
              <option value="">select account</option>
              <option value={"trading"}>
                {` trading balance - $${userWallet?.tradingBalance.toFixed(2)}`}
              </option>
            </select>
          </Holder>
          <Holder>
            <Label labelFor={"amount"} />
            <Input
              placeholder="0.00"
              handleChange={handleInput}
              name="amount"
              value={form.amount}
            />
          </Holder>
          {swapError && <p className="text-red-500 p-2">{swapError}</p>}
          <button
            onClick={handleSubmit}
            className="text-xs font-medium bg-purple-500 py-2.5 px-5 rounded-3xl text-white capitalize"
          >
            {!swapLoading ? "swap" : "swapping"}
          </button>
        </form>
      </div>
    </Pagescontainer>
  );
};

export default Swap;
