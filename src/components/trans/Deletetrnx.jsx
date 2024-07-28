import React, { useEffect, useState } from "react";
import { MdWarning } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { deleteTrnx } from "../../features/trnxSlice";

const Deletetrnx = ({ closeDelete, trnxRow }) => {
  const dispatch = useDispatch();
  const [id, setId] = useState(null);

  const { deleteTrnxLoading, deleteTrnxError, deleteTrnxSuccess } = useSelector(
    (state) => state.trnx
  );

  const removeTransaction = (e) => {
    const data = {
      transactionId: id,
    };
    dispatch(deleteTrnx(data));
  };

  useEffect(() => {
    let timeout;
    if (deleteTrnxSuccess) {
      timeout = 3000;
      setTimeout(() => {
        window.location.reload();
      }, timeout);
    }
    return () => clearTimeout(timeout);
  }, [deleteTrnxSuccess]);

  useEffect(() => {
    if (trnxRow) {
      setId(trnxRow._id);
    }
  }, [trnxRow]);
  return (
    <div className="top-4 right-2 absolute bg-white p-6 shadow flex flex-col gap-3 rounded-lg">
      <p className="flex items-center gap-2">
        <span>
          <MdWarning />
        </span>
        Confirm transaction deletion
      </p>

      {deleteTrnxError && (
        <p className="text-xs font-thin text-red-500">{deleteTrnxError}</p>
      )}
      {deleteTrnxSuccess && (
        <p className="text-xs font-thin text-green-500">
          deleted successfully.
        </p>
      )}
      <div className="flex justify-between items-center">
        <button
          onClick={removeTransaction}
          className="bg-purple-500 text-white py-2 px-4 rounded-3xl text-xs font-medium"
        >
          {!deleteTrnxLoading ? "Confirm" : "Wait..."}
        </button>
        <button
          onClick={closeDelete}
          className="border border-purple-500 text-purple-500 text-xs font-medium py-2 px-4 rounded-3xl"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default Deletetrnx;
