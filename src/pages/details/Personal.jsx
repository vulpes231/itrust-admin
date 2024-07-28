import React, { useEffect, useState } from "react";
import Admininput from "./Admininput";
import Formcontain from "./Formcontain";
import Divcontain from "./Divcontain";

const Personal = ({ user }) => {
  // console.log(user);
  const initialState = {
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    dob: "",
    phone: "",
  };

  const [form, setForm] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const updateUser = (e) => {
    e.preventDefault();
    console.log(form);
  };

  return (
    <form className="capitalize font-medium text-xs flex flex-col gap-4">
      <h5 className="text-xl">personal information</h5>
      <Formcontain>
        <Divcontain>
          <label htmlFor="">firstname</label>
          <Admininput
            type="text"
            value={form.firstname}
            placeHolder={user?.firstname}
            handleChange={handleChange}
            name="firstname"
          />
        </Divcontain>
        <Divcontain>
          <label htmlFor="">lastname</label>
          <Admininput
            type="text"
            value={form.lastname}
            placeHolder={user?.lastname}
            handleChange={handleChange}
            name="lastname"
          />
        </Divcontain>
      </Formcontain>

      <Formcontain>
        <Divcontain>
          <label htmlFor="">email</label>
          <Admininput
            type="text"
            value={form.email}
            placeHolder={user?.email}
            handleChange={handleChange}
            name="email"
          />
        </Divcontain>
        <Divcontain>
          <label htmlFor="">username</label>
          <Admininput
            type="text"
            value={form.username}
            placeHolder={user?.username}
            handleChange={handleChange}
            name="username"
          />
        </Divcontain>
      </Formcontain>
      <Formcontain>
        <Divcontain>
          <label htmlFor="">phone</label>
          <Admininput
            type="text"
            value={form.phone}
            placeHolder={user?.phone}
            handleChange={handleChange}
            name="phone"
          />
        </Divcontain>
        <Divcontain>
          <label htmlFor="">dob</label>
          <Admininput
            type="text"
            value={form.dob}
            placeHolder={user?.dob}
            handleChange={handleChange}
            name="dob"
            readOnly={true}
          />
        </Divcontain>
      </Formcontain>
      <Formcontain>
        <div className="flex-1">
          <label htmlFor="">address</label>
          <Admininput
            type="text"
            value={form.address}
            placeHolder={user?.address}
            handleChange={handleChange}
            name="address"
          />
        </div>
      </Formcontain>
      <button
        onClick={updateUser}
        className="rounded-sm py-3 mt-4 bg-purple-500 text-white "
      >
        Update personal details
      </button>
    </form>
  );
};

export default Personal;
