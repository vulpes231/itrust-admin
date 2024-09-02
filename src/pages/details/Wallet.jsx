import React, { useEffect, useState } from "react";
import Formcontain from "./Formcontain";
import Divcontain from "./Divcontain";
import Admininput from "./Admininput";
import { useDispatch, useSelector } from "react-redux";
import { setWallet } from "../../features/walletSlice";

const Wallet = ({ user, userId }) => {
  // console.log(user);

  const bitcoin = user?.assets?.find((ast) => ast.coinName === "bitcoin");
  const ethereum = user?.assets?.find((ast) => ast.coinName === "ethereum");
  const tether = user?.assets?.find((ast) => ast.coinName === "tether");

  const initialState = {
    newAddress: "",
    coinName: "",
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

  return (
    <form className="capitalize font-medium text-xs flex flex-col gap-4 bg-white p-10 shadow-xl rounded-xl">
      <h5 className="text-xl capitalize">wallet information</h5>
      <div className="flex flex-col gap-4">
        {user?.assets?.map((asset, index) => {
          return (
            <div
              key={index}
              className="flex justify-between items-center gap-4"
            >
              <label
                className="w-[15%]"
                htmlFor=""
              >{`${asset.coinName} address:`}</label>
              <input
                type="text"
                value={form.coinName}
                onChange={handleChange}
                placeholder={asset.address}
                className="border w-[70%] py-2.5 px-4 outline-none focus:border-none focus:outline-purple-500 rounded-xl"
                name={asset.coinName}
              />
              <button
                onClick={updateUserAsset}
                className="rounded-sm py-2.5 bg-purple-500 text-white w-[15%]"
              >
                {!setWalletLoading ? "save" : "Wait.."}
              </button>
            </div>
          );
        })}
      </div>
      {setWalletError && (
        <p className="text-xs font-thin text-red-500">{setWalletError}</p>
      )}
      {setWalletSuccess && (
        <p className="text-xs font-thin text-green-500">
          Wallet updated successfully.
        </p>
      )}
    </form>
  );
};

export default Wallet;
