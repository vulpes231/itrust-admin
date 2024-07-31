import React, { useEffect, useState } from "react";
import { MdClose } from "react-icons/md";
import Select from "../trans/Select";
import Formcontain from "../../pages/details/Formcontain";
import Divcontain from "../../pages/details/Divcontain";
import Admininput from "../../pages/details/Admininput";
import { useDispatch, useSelector } from "react-redux";
import { editTrade } from "../../features/tradeSlice";

const initialState = {
  status: "",
  profit: "",
};

const Edittrade = ({ close, trnxRow }) => {
  const [form, setForm] = useState(initialState);
  const [id, setId] = useState(null);

  const dispatch = useDispatch();

  const { editTradeLoading, editTradeError, editTradeSuccess } = useSelector(
    (state) => state.trade
  );

  const handleInput = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const updateTrade = (e) => {
    e.preventDefault();
    const data = {
      newStatus: form.status,
      profit: form.profit,
      id: id,
    };
    dispatch(editTrade(data));
    console.log(data);
  };

  useEffect(() => {
    if (trnxRow) {
      setId(trnxRow._id);
    }
  }, [trnxRow]);

  useEffect(() => {
    let timeout;
    if (editTradeSuccess) {
      timeout = 3000;
      setTimeout(() => {
        window.location.reload();
      }, timeout);
    }
    return () => clearTimeout(timeout);
  }, [editTradeSuccess]);

  return (
    <div className="absolute top-0 left-0 w-full h-screen flex items-center justify-center">
      <div className="bg-white p-6 shadow-sm rounded-sm flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <h5>Edit trade</h5>
          <span onClick={close}>
            <MdClose />
          </span>
        </div>
        <form action="" className="flex flex-col gap-4">
          <Formcontain>
            <Divcontain>
              <label htmlFor="">status</label>
              <Select
                onChange={handleInput}
                value={form.status}
                name={"status"}
              >
                <option value="">select status</option>
                <option value="open">open</option>
                <option value="close">close</option>
              </Select>
            </Divcontain>
          </Formcontain>
          <Formcontain>
            <Divcontain>
              <label htmlFor="">floating P/L (USD)</label>
              <Admininput
                placeHolder={"Enter amount"}
                handleChange={handleInput}
                value={form.profit}
                name={"profit"}
              />
            </Divcontain>
          </Formcontain>
          {editTradeError && (
            <p className="text-red-500 font-medium text-xs">{editTradeError}</p>
          )}
          {editTradeSuccess && (
            <p className="text-green-500 font-medium text-xs">
              trade updated successfully
            </p>
          )}
          <button
            onClick={updateTrade}
            className="rounded-3xl p-2 bg-purple-500 hover:bg-purple-600 text-white w-full"
          >
            {!editTradeLoading ? "Update" : "Wait..."}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Edittrade;
