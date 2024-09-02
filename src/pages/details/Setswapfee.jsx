import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSwapBalance } from "../../features/userSlice";

const Setswapfee = ({ user }) => {
  // console.log(user);
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    amount: "",
  });

  const { setSwapLoading, setSwapError, setSwapSuccess } = useSelector(
    (state) => state.user
  );

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

  const handleSubmit = (e) => {
    e.stopPropagation();
    e.preventDefault();
    const id = user.userId;

    console.log(form, id);
    dispatch(setSwapBalance({ id, formData: form }));
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
      <div
        onClick={handleShowSwap}
        className="capitalize cursor-pointer flex justify-between items-center"
      >
        <p>set swap fee</p>
        <small>fee: {user?.swapBalance}</small>
      </div>
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
    </div>
  );
};

export default Setswapfee;
