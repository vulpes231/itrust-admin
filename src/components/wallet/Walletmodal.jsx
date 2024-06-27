import React, { useEffect, useState } from "react";
import { MdClose } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { setWallet } from "../../features/walletSlice";

const Walletmodal = ({ closeModal, rowData }) => {
  const dispatch = useDispatch();
  const initialState = {
    userId: rowData?.user,
    shortName: "",
    newAddress: "",
  };
  const [form, setForm] = useState(initialState);

  const { setWalletError, setWalletLoading, setWalletSuccess } = useSelector(
    (state) => state.wallet
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSetAddress = (e) => {
    e.preventDefault();
    console.log(form);
    dispatch(setWallet(form));
  };

  const resetInput = () => {
    setForm(initialState);
  };

  useEffect(() => {
    if (setWalletSuccess) {
      resetInput();
    }
  }, [setWalletSuccess]);

  return (
    <div className="fixed top-0 left-0 w-full h-screen flex items-center justify-center bg-black bg-opacity-25 text-sm font-medium">
      <div className="bg-white p-6 shadow rounded-sm">
        <div
          onClick={closeModal}
          className="cursor-pointer flex justify-end items-center hover:text-blue-500"
        >
          <small>close</small>
          <MdClose />
        </div>
        <form className="flex flex-col gap-4">
          <div>
            <label htmlFor="ownerId">Owner ID:</label>
            <input
              type="text"
              id="ownerId"
              value={rowData.user}
              readOnly
              className="border p-2 w-full text-xs font-normal"
            />
          </div>

          <div>
            <label htmlFor="wallets">Wallets:</label>
            <select
              id="wallets"
              value={form.shortName}
              onChange={handleChange}
              name="shortName"
              className="border p-2 bg-transparent w-full text-xs font-normal"
            >
              <option value="">choose wallet</option>
              {rowData?.assets?.map((dt, index) => (
                <option key={index} value={dt.shortName}>
                  {dt.shortName}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="currentAddress">Current Address:</label>
            <div className="border p-2 w-full text-xs font-medium">
              {rowData?.assets?.map((dt, index) => (
                <span key={index}>
                  {form.shortName === dt.shortName && dt.address}
                </span>
              ))}
            </div>
          </div>

          <div>
            <label htmlFor="newAddress">New Address:</label>
            <input
              type="text"
              id="newAddress"
              name="newAddress"
              placeholder="Enter Address"
              value={form.newAddress}
              onChange={handleChange}
              className="border p-2 w-full"
            />
          </div>

          {setWalletSuccess && (
            <p className="text-green-500 font-medium text-xs">
              Wallet address updated successfully.
            </p>
          )}

          <button
            onClick={handleSetAddress}
            className="p-2 bg-blue-500 text-white capitalize"
          >
            {setWalletLoading ? "Updating address..." : "Set Address"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Walletmodal;
