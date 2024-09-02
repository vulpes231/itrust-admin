import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setWallet } from "../../features/walletSlice";

const Wallet = ({ user, userId }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState({});

  const [form, setForm] = useState(() => {
    if (user?.assets) {
      return user.assets.reduce((acc, asset) => {
        acc[asset.coinName] = asset.address;
        return acc;
      }, {});
    }
    return {};
  });

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

  const updateUserAsset = (e, coinName) => {
    e.preventDefault();

    // Set loading for the specific coinName
    setLoading((prev) => ({
      ...prev,
      [coinName]: true,
    }));

    // Create an object to send to backend
    const updatedAssets = {
      userId,
      coinName,
      newAddress: form[coinName] || "", // Ensure default empty string
    };
    console.log(updatedAssets);

    dispatch(setWallet(updatedAssets)).finally(() => {
      // Reset loading state for the specific coinName
      setLoading((prev) => ({
        ...prev,
        [coinName]: false,
      }));
    });
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
        {user?.assets?.map((asset) => (
          <div
            key={asset.coinName}
            className="flex justify-between items-center gap-4"
          >
            <label className="w-[15%]">{`${asset.coinName} address:`}</label>
            <input
              type="text"
              value={form[asset.coinName] || ""}
              onChange={handleChange}
              placeholder={asset.address}
              className="border w-[70%] py-2.5 px-4 outline-none focus:border-none focus:outline-purple-500 rounded-xl"
              name={asset.coinName}
            />
            <button
              onClick={(e) => updateUserAsset(e, asset.coinName)}
              className="rounded-sm py-2.5 bg-purple-500 text-white w-[15%]"
              disabled={loading[asset.coinName]} // Disable button if loading
            >
              {loading[asset.coinName] ? "Wait.." : "Save"}{" "}
              {/* Change button text based on loading state */}
            </button>
          </div>
        ))}
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
