import React, { useEffect, useState } from "react";
import { MdToggleOff, MdToggleOn } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { setSwapBalance } from "../../features/userSlice";

const Setswapfee = ({ user }) => {
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    amount: "",
  });

  const [showSwap, setShowSwap] = useState(false);

  const handleShowSwap = () => {
    setShowSwap((prev) => !prev);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const { setSwapLoading, setSwapError, setSwapSuccess } = useSelector(
    (state) => state.user
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const id = user.userId;

    // console.log(form, id);
    dispatch(setSwapBalance(id, data));
  };

  useEffect(() => {
    if (setSwapSuccess) {
      window.location.reload();
    }
  }, [setSwapSuccess]);

  return (
    <div
      className={" border border-slate-200 p-4 rounded-md hover:bg-purple-50"}
    >
      <p onClick={handleShowSwap} className="capitalize cursor-pointer">
        set swap fee
      </p>
      <div
        className={!showSwap ? "hidden" : " flex flex-col gap-6 p-4 rounded-md"}
      >
        <input
          type="text"
          className="w-full border-2 focus:border-purple-500 py-2 px-4 placeholder:text-sm placeholder:font-thin outline-none rounded-xl"
          value={form.amount}
          onChange={handleChange}
          name="amount"
          autoComplete="off"
        />
        {setSwapError && <p className="text-red-500 text-sm">{setSwapError}</p>}
        <button
          onClick={handleSubmit}
          disabled={setSwapLoading}
          className="rounded-sm py-3 mt-4 bg-purple-500 text-white w-[150px] text-sm font-semibold"
        >
          {!setSwapLoading ? " Set fee" : "wait..."}
        </button>
      </div>

      {setSwapError && <p className="text-red-500 text-sm">{setSwapError}</p>}
    </div>
  );
};

export default Setswapfee;
