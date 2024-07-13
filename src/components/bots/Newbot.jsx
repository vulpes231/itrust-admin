import React, { useEffect, useState } from "react";
import { MdClose } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { createNewBot } from "../../features/botSlice";

const initialState = {
  name: "",
  info: "",
  url: "",
};

const Newbot = ({ closeModal }) => {
  const dispatch = useDispatch();
  const [form, setForm] = useState(initialState);

  const { createBotLoading, createBotError, createBotSuccess } = useSelector(
    (state) => state.bot
  );

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
    dispatch(createNewBot(form));
  };

  useEffect(() => {
    if (createBotSuccess) {
      console.log("done");
    }
  }, [createBotSuccess]);

  return (
    <div className="w-full h-screen fixed top-0 left-0 bg-slate-950 bg-opacity-20 flex items-center justify-center">
      <div className="bg-white w-full sm:w-[350px] p-6 rounded-2xl shadow flex flex-col gap-4">
        <div className="flex justify-between items-center ">
          <h3 className="font-medium">Create New Bot</h3>
          <button onClick={closeModal}>
            <MdClose />
          </button>
        </div>
        <form action="" className="flex flex-col gap-3 text-xs font-medium">
          <div>
            <label className="p-1" htmlFor="">
              Name
            </label>
            <input
              type="text"
              placeholder="Bot name"
              className="w-full border-2 rounded-md py-2 px-2 placeholder:text-xs placeholder:font-medium outline-none"
              value={form.name}
              name="name"
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="p-1" htmlFor="">
              Info
            </label>
            <input
              type="text"
              placeholder="Bot Description"
              className="w-full border-2 rounded-md py-2 px-2 placeholder:text-xs placeholder:font-medium outline-none"
              value={form.info}
              name="info"
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="p-1" htmlFor="">
              Image Url
            </label>
            <input
              type="text"
              placeholder="Example: https://catpic.png"
              className="w-full border-2 rounded-md py-2 px-2 placeholder:text-xs placeholder:font-medium outline-none"
              value={form.url}
              name="url"
              onChange={handleChange}
            />
          </div>
          {createBotSuccess && (
            <p className="text-green-500 font-medium text-xs">Bot created</p>
          )}
          <button
            onClick={handleCreate}
            className=" bg-blue-500 rounded-3xl text-white capitalize font-medium text-sm hover:bg-blue-600 text-center w-full py-2 my-5"
          >
            {createBotLoading ? "Creating..." : "Create"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Newbot;
