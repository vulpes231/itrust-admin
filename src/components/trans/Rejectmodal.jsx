import React, { useEffect, useState } from "react";
import { MdClose } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { rejectTrnx, resetRejectTrnx } from "../../features/trnxSlice";

const Rejectmodal = ({ closeModal, trnxRow }) => {
  const dispatch = useDispatch();
  const initialState = {
    transactionId: trnxRow?._id,
  };
  const [form, setForm] = useState(initialState);

  const { rejectTrnxLoading, rejectTrnxError, rejectTrnxSuccess } = useSelector(
    (state) => state.trnx
  );

  const handleRejection = (e) => {
    e.preventDefault();
    console.log(form);
    dispatch(rejectTrnx(form));
  };

  const resetInput = () => {
    setForm(initialState);
  };

  useEffect(() => {
    let timeout;
    if (rejectTrnxSuccess) {
      timeout = 3000;
      setTimeout(() => {
        dispatch(resetRejectTrnx());
        window.location.reload();
      }, timeout);
    }
    return () => clearTimeout(timeout);
  }, [rejectTrnxSuccess, dispatch]);

  return (
    <div className="fixed top-0 left-0 w-full h-screen flex items-center justify-center bg-black bg-opacity-25 text-sm font-medium">
      <div className="bg-white p-6 shadow rounded-sm">
        <div
          onClick={() => closeModal()}
          className="cursor-pointer flex justify-end items-center hover:text-purple-500"
        >
          <small>close</small>
          <MdClose />
        </div>
        <form className="flex flex-col gap-4">
          <div>
            <label htmlFor="transactionId">Transaction ID:</label>
            <input
              type="text"
              id="transactionId"
              value={trnxRow?._id}
              readOnly
              className="border p-2 w-full text-xs font-normal focus:outline-purple-500"
            />
          </div>
          <div>
            <label htmlFor="ownerId">Owner ID:</label>
            <input
              type="text"
              id="creator"
              value={trnxRow?.creator}
              readOnly
              className="border p-2 w-full text-xs font-normal focus:outline-purple-500"
            />
          </div>

          <div>
            <label htmlFor="status">status</label>
            <input
              type="text"
              name="newStatus"
              placeholder={trnxRow?.status}
              readOnly
              className="border p-2 w-full bg-transparent focus:outline-purple-500"
            />
          </div>

          {rejectTrnxSuccess && (
            <p className="text-green-500 font-medium text-xs">
              Transaction rejected successfully.
            </p>
          )}
          {rejectTrnxError && (
            <p className="text-red-500 font-medium text-xs">
              {rejectTrnxError}
            </p>
          )}

          <button
            onClick={handleRejection}
            className="p-2 bg-purple-500 text-white capitalize"
          >
            {!rejectTrnxLoading ? "Reject" : "Wait..."}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Rejectmodal;
