import React, { useEffect, useState } from "react";
import { MdClose } from "react-icons/md";
import Formcontain from "../../pages/details/Formcontain";
import Divcontain from "../../pages/details/Divcontain";
import Admininput from "../../pages/details/Admininput";
import { useDispatch, useSelector } from "react-redux";
import { editTrnx } from "../../features/trnxSlice";

const Edittrans = ({ close, trnxRow }) => {
  const initialState = {
    transactionId: trnxRow?._id,
    creator: trnxRow?.creator,
    coin: trnxRow?.walletType,
    amount: trnxRow?.amount || "",
    date: trnxRow?.date || "",
  };
  const dispatch = useDispatch();
  const [form, setForm] = useState(initialState);

  const { editTrnxSuccess, editTrnxError, editTrnxLoading } = useSelector(
    (state) => state.trnx
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const updateTrnx = (e) => {
    e.preventDefault();
    console.log(form);
    dispatch(editTrnx(form));
  };

  useEffect(() => {
    let timeout;
    if (editTrnxSuccess) {
      timeout = 2000;
      setTimeout(() => {
        window.location.reload();
      }, timeout);
    }
    return () => clearTimeout(timeout);
  }, [editTrnxSuccess]);

  return (
    <div className="fixed top-0 left-0 w-full h-screen flex items-center justify-center bg-black bg-opacity-25 text-sm font-medium">
      <div className="bg-white p-6 shadow rounded-sm sm:w-[350px] ">
        <div className="flex justify-between">
          <h3>Edit transaction data</h3>
          <span
            onClick={() => close()}
            className="cursor-pointer flex justify-end items-center hover:text-purple-500"
          >
            <small>close</small>
            <MdClose />
          </span>
        </div>
        <form action="" className="flex flex-col gap-2 capitalize text-xs">
          <Formcontain>
            <Divcontain>
              <label htmlFor="">creator</label>
              <Admininput
                type={"text"}
                placeHolder={trnxRow?.creator}
                readOnly={true}
              />
            </Divcontain>
          </Formcontain>
          <Formcontain>
            <Divcontain>
              <label htmlFor="">coin</label>
              <Admininput
                type={"text"}
                placeHolder={trnxRow?.walletType}
                readOnly={true}
              />
            </Divcontain>
          </Formcontain>
          <Formcontain>
            <Divcontain>
              <label htmlFor="">amount</label>
              <Admininput
                type={"text"}
                placeHolder={trnxRow?.amount}
                handleChange={handleChange}
                value={form.amount}
                name={"amount"}
              />
            </Divcontain>
          </Formcontain>
          <Formcontain>
            <Divcontain>
              <label htmlFor="">date</label>
              <Admininput
                type={"text"}
                placeHolder={trnxRow?.date}
                handleChange={handleChange}
                value={form.date}
                name={"date"}
              />
            </Divcontain>
          </Formcontain>
          <Formcontain>
            <Divcontain>
              <label htmlFor="">type</label>
              <Admininput
                type={"text"}
                placeHolder={trnxRow?.trnxType}
                readOnly={true}
              />
            </Divcontain>
          </Formcontain>
          {editTrnxError && (
            <p className="text-xs font-thin text-red-500">{editTrnxError}</p>
          )}
          {editTrnxSuccess && (
            <p className="text-xs font-thin text-green-500">
              Transaction updated.
            </p>
          )}
          <button
            onClick={updateTrnx}
            className="p-2 mt-5 bg-purple-500 text-white capitalize w-full"
          >
            {!editTrnxLoading ? "Update" : "Wait..."}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Edittrans;
