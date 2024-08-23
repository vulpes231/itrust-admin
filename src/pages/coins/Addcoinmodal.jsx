import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createCoin } from "../../features/masterWalletSlice";

const Input = ({ placeholder, handleChange, name, value }) => {
  return (
    <input
      type="text"
      placeholder={placeholder}
      className="w-full border-2 focus:border-purple-500 py-2 px-4 placeholder:text-sm placeholder:font-thin outline-none rounded-xl"
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

const Addcoinmodal = () => {
  const [form, setForm] = useState({
    coin: "",
    address: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { coinCreated, createCoinLoad, createCoinError } = useSelector(
    (state) => state.master
  );

  const handleInput = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
    dispatch(createCoin(form));
  };

  useEffect(() => {
    if (coinCreated) {
      console.log("created.");
    }
  }, [coinCreated]);
  return (
    <div>
      <form action="" className="flex flex-col gap-3">
        <Holder>
          <Label labelFor={"Name"} />
          <Input
            placeholder={"Coin name"}
            name={"coin"}
            value={form.coin}
            handleChange={handleInput}
          />
        </Holder>
        <Holder>
          <Label labelFor={"Address"} />
          <Input
            placeholder={"Wallet address"}
            name={"address"}
            value={form.address}
            handleChange={handleInput}
          />
        </Holder>
        {createCoinError && (
          <p className="text-red-500 font-medium text-xs">
            coin creation failed. Try again
          </p>
        )}
        <button
          onClick={handleSubmit}
          className="text-xs font-medium bg-purple-500 py-2.5 px-5 rounded-3xl text-white capitalize w-full"
        >
          {!createCoinLoad ? "create coin" : "creating..."}
        </button>
      </form>
    </div>
  );
};

export default Addcoinmodal;
