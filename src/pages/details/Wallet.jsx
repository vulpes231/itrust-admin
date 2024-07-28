import React, { useEffect, useState } from "react";
import Formcontain from "./Formcontain";
import Divcontain from "./Divcontain";
import Admininput from "./Admininput";
import { useDispatch, useSelector } from "react-redux";
import { setWallet } from "../../features/walletSlice";

const Wallet = ({ user }) => {
  // console.log(user);

  const bitcoin = user?.assets?.find((ast) => ast.coinName === "bitcoin");
  const ethereum = user?.assets?.find((ast) => ast.coinName === "ethereum");
  const tether = user?.assets?.find((ast) => ast.coinName === "tether");

  const initialState = {
    newAddress: "",
    coinName: "",
    userId: "",
  };

  const dispatch = useDispatch();

  const [form, setForm] = useState(initialState);

  const { setWalletLoading, setWalletError, setWalletSuccess } = useSelector(
    (state) => state.wallet
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const updateUserAsset = (e) => {
    e.preventDefault();
    console.log(form);

    dispatch(setWallet(form));
  };

  useEffect(() => {
    if (setWalletSuccess) {
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    }
  }, [setWalletSuccess]);

  useEffect(() => {
    if (user) {
      form.userId = user.userId;
    }
  }, [user]);
  return (
    <form className="capitalize font-medium text-xs flex flex-col gap-4">
      <h5 className="text-xl capitalize">wallet information</h5>
      <select
        value={form.coinName}
        onChange={handleChange}
        name="coinName"
        className="w-full px-4 py-2 border-2 focus:border-purple-500 outline-none placeholder:font-light placeholder:text-xs placeholder:text-[#333] bg-transparent "
      >
        <option value="">select coin</option>
        <option value="bitcoin">bitcoin</option>
        <option value="ethereum">ethereum</option>
        <option value="tether">tether</option>
      </select>

      {form.coinName === "bitcoin" ? (
        <Formcontain>
          <div className="flex-1">
            <label htmlFor="">BTC address</label>
            <Admininput
              type="text"
              placeHolder={bitcoin?.address || "Not set"}
              value={form.newAddress}
              name={"newAddress"}
              handleChange={handleChange}
            />
          </div>
        </Formcontain>
      ) : form.coinName === "ethereum" ? (
        <Formcontain>
          <div className="flex-1">
            <label htmlFor="">ETH address</label>
            <Admininput
              type="text"
              placeHolder={ethereum?.address || "Not set"}
              value={form.newAddress}
              name={"newAddress"}
              handleChange={handleChange}
            />
          </div>
        </Formcontain>
      ) : form.coinName === "tether" ? (
        <Formcontain>
          <div className="flex-1">
            <label htmlFor="">USDT address</label>
            <Admininput
              type="text"
              placeHolder={tether?.address || "Not set"}
              value={form.newAddress}
              name={"newAddress"}
              handleChange={handleChange}
            />
          </div>
        </Formcontain>
      ) : null}
      {setWalletError && (
        <p className="text-xs font-thin text-red-500">{setWalletError}</p>
      )}
      {setWalletSuccess && (
        <p className="text-xs font-thin text-green-500">
          Wallet updated successfully.
        </p>
      )}
      <button
        onClick={updateUserAsset}
        className="rounded-sm py-3 mt-4 bg-purple-500 text-white "
      >
        {!setWalletLoading ? "Set address" : "Wait.."}
      </button>
    </form>
  );
};

export default Wallet;
