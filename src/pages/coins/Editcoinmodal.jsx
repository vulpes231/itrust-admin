import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateMasterWallet } from "../../features/masterWalletSlice";

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

const Editcoinmodal = () => {
  const [form, setForm] = useState({
    coin: "",
    newAddress: "",
  });

  const dispatch = useDispatch();

  const { coinUpdated, updateCoinLoad, updateCoinError } = useSelector(
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
    dispatch(updateMasterWallet(form));
  };

  useEffect(() => {
    if (coinUpdated) {
      console.log("updated.");
      window.location.reload();
    }
  }, [coinUpdated]);
  return (
    <div className="w-full h-full absolute top-0 left-0 flex items-center justify-center">
      <form
        action=""
        className="flex flex-col gap-3 bg-white p-6 rounded-lg shadow-lg"
      >
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
          <Label labelFor={"New address"} />
          <Input
            placeholder={"New wallet address"}
            name={"newAddress"}
            value={form.newAddress}
            handleChange={handleInput}
          />
        </Holder>
        {updateCoinError && (
          <p className="text-red-500 font-medium text-xs">
            error setting address. Try again
          </p>
        )}
        <button
          onClick={handleSubmit}
          className="text-xs font-medium bg-purple-500 py-2.5 px-5 rounded-3xl text-white capitalize w-full"
        >
          {!updateCoinLoad ? "update coin" : "updating..."}
        </button>
      </form>
    </div>
  );
};

export default Editcoinmodal;
