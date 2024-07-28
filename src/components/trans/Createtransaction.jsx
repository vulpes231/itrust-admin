import React, { useEffect, useState } from "react";
import { MdClose } from "react-icons/md";
import Formcontain from "../../pages/details/Formcontain";
import Select from "./Select";
import Divcontain from "../../pages/details/Divcontain";
import { useDispatch, useSelector } from "react-redux";
import { getAccessToken } from "../../utils/utilities";
import { getUsers } from "../../features/userSlice";
import Admininput from "../../pages/details/Admininput";
import { createTrnx } from "../../features/trnxSlice";

const initialState = {
  creator: "",
  amount: "",
  trnxType: "",
  walletType: "",
  date: "",
};

const Createtransaction = ({ close }) => {
  const dispatch = useDispatch();
  const [form, setForm] = useState(initialState);
  const { users } = useSelector((state) => state.user);
  const { createTrnxError, createTrnxSuccess, createTrnxLoading } = useSelector(
    (state) => state.trnx
  );

  const accessToken = getAccessToken();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCreate = (e) => {
    e.preventDefault();
    console.log(form);
    dispatch(createTrnx(form));
  };

  useEffect(() => {
    if (accessToken) {
      dispatch(getUsers());
    }
  }, [accessToken]);

  useEffect(() => {
    let timeout;
    if (createTrnxSuccess) {
      timeout = 3000;
      setTimeout(() => {
        window.location.reload();
      }, timeout);
    }
    return () => clearTimeout(timeout);
  }, [createTrnxSuccess]);
  return (
    <div className="absolute top-0 left-0 w-full h-screen flex items-center justify-center">
      <div className="bg-white flex flex-col gap-4 p-6 rounded-lg shadow-sm sm:w-[350px]">
        <div className="flex justify-between items-center">
          <h3>Create transaction</h3>
          <span onClick={close}>
            <MdClose />
          </span>
        </div>
        <form className="flex flex-col gap-2 text-xs font-medium">
          <Formcontain>
            <Divcontain>
              <label htmlFor="">for</label>
              <Select
                onChange={handleChange}
                value={form.creator}
                name={"creator"}
              >
                <option value="">choose user</option>
                {users?.users?.map((usr) => {
                  return (
                    <option key={usr._id} value={usr._id}>
                      {usr.email}
                    </option>
                  );
                })}
              </Select>
            </Divcontain>
          </Formcontain>
          <Formcontain>
            <Divcontain>
              <label htmlFor="">coin</label>
              <Select
                onChange={handleChange}
                value={form.walletType}
                name={"walletType"}
              >
                <option value="">choose coin</option>
                <option value="bitcoin">BTC</option>
                <option value="ethereum">ETH</option>
                <option value="tether">USDT</option>
              </Select>
            </Divcontain>
          </Formcontain>
          <Formcontain>
            <Divcontain>
              <label htmlFor="">amount</label>
              <Admininput
                handleChange={handleChange}
                value={form.amount}
                name={"amount"}
                placeHolder={"Enter amount"}
              />
            </Divcontain>
          </Formcontain>
          <Formcontain>
            <Divcontain>
              <label htmlFor="">type</label>
              <Select
                onChange={handleChange}
                value={form.trnxType}
                name={"trnxType"}
              >
                <option value="">choose type</option>
                <option value="deposit">deposit</option>
                <option value="withdrawal">withdrawal</option>
              </Select>
            </Divcontain>
          </Formcontain>
          <Formcontain>
            <Divcontain>
              <label htmlFor="">date</label>
              <Admininput
                handleChange={handleChange}
                value={form.date}
                name={"date"}
                type={"date"}
              />
            </Divcontain>
          </Formcontain>
          {createTrnxError && (
            <p className="text-xs font-thin text-red-500">{createTrnxError}</p>
          )}
          {createTrnxSuccess && (
            <p className="text-xs font-thin text-green-500">
              {`transaction created successfully.`}
            </p>
          )}
          <button
            onClick={handleCreate}
            className="py-2.5 w-full bg-purple-500 hover:bg-purple-600 border-none mt-5 text-white rounded-3xl"
          >
            {!createTrnxLoading ? "Create" : "Wait..."}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Createtransaction;
