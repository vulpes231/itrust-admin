import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteTrade } from "../../features/tradeSlice";

const Deletetrade = ({ close, trnxRow }) => {
  const dispatch = useDispatch();

  const [id, setId] = useState(null);

  const { deleteTradeLoading, deleteTradeError, deleteTradeSuccess } =
    useSelector((state) => state.trade);

  const deleteTradeNow = (e) => {
    e.preventDefault();
    dispatch(deleteTrade(id));
    console.log(id);
  };

  useEffect(() => {
    if (trnxRow) {
      setId(trnxRow._id);
    }
  }, [trnxRow]);

  useEffect(() => {
    let timeout;
    if (deleteTradeSuccess) {
      timeout = 3000;
      setTimeout(() => {
        window.location.reload();
      }, timeout);
    }
    return () => clearTimeout(timeout);
  }, [deleteTradeSuccess]);

  return (
    <div className="bg-white absolute top-0 right-0 w-[250px] flex flex-col gap-2 font-medium text-xs p-6 shadow-lg">
      <p className="">Are you sure you want to delete trade?</p>
      {deleteTradeError && (
        <p className="text-red-500 font-medium text-xs">{deleteTradeError}</p>
      )}
      <div className="flex items-center gap-2 justify-between ">
        <button
          className="text-white bg-purple-500 p-2 rounded-3xl text-xs capitalize px-4"
          onClick={deleteTradeNow}
        >
          {!deleteTradeLoading ? "confirm" : "Wait..."}
        </button>
        <button
          className="border-2 border-purple-500 p-2 rounded-3xl text-xs capitalize px-4"
          onClick={close}
        >
          cancel
        </button>
      </div>
    </div>
  );
};

export default Deletetrade;
