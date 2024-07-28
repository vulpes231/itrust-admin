import React, { useEffect, useState } from "react";
import { MdClose } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { approveTrnxs } from "../../features/trnxSlice";

const Rejectmodal = ({ closeModal, trnxRow }) => {
  const dispatch = useDispatch();
  const initialState = {
    transactionId: trnxRow?._id,
    newStatus: "",
  };
  const [form, setForm] = useState(initialState);

  //   const { approveTrnxLoading, approveTrnxError, approveTrnxSuccess } =
  //     useSelector((state) => state.trnx);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleApproval = (e) => {
    e.preventDefault();
    console.log(form);
    dispatch(approveTrnxs(form));
  };

  const resetInput = () => {
    setForm(initialState);
  };

  //   useEffect(() => {
  //     if (approveTrnxSuccess) {
  //       resetInput();
  //       setTimeout(() => {
  //         window.location.reload();
  //       }, [3000]);
  //     }
  //   }, [approveTrnxSuccess]);

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
              value={trnxRow._id}
              readOnly
              className="border p-2 w-full text-xs font-normal focus:outline-purple-500"
            />
          </div>
          <div>
            <label htmlFor="ownerId">Owner ID:</label>
            <input
              type="text"
              id="creator"
              value={trnxRow.creator}
              readOnly
              className="border p-2 w-full text-xs font-normal focus:outline-purple-500"
            />
          </div>

          <div>
            <label htmlFor="newStatus">New Status:</label>
            <select
              type="text"
              id="newStatus"
              name="newStatus"
              placeholder="Enter Address"
              value={form.newStatus}
              onChange={handleChange}
              className="border p-2 w-full bg-transparent focus:outline-purple-500"
            >
              <option value="pending">pending</option>
              <option value="failed">failed</option>
            </select>
          </div>

          {/* {approveTrnxSuccess && (
            <p className="text-green-500 font-medium text-xs">
              Transaction approved successfully.
            </p>
          )} */}
          {/* {approveTrnxError && (
            <p className="text-red-500 font-medium text-xs">
              {approveTrnxError}
            </p>
          )} */}

          <button
            onClick={handleApproval}
            className="p-2 bg-purple-500 text-white capitalize"
          >
            Reject
          </button>
        </form>
      </div>
    </div>
  );
};

export default Rejectmodal;
