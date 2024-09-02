import React, { useEffect, useState } from "react";
import Admininput from "./Admininput";
import Formcontain from "./Formcontain";
import Divcontain from "./Divcontain";
import { useDispatch, useSelector } from "react-redux";
import { resetUpdateUser, updateUserInfo } from "../../features/userSlice";

const Personal = ({ user }) => {
  const dispatch = useDispatch();
  const initialState = {
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    dob: "",
    phone: "",
    ssn: "",
  };

  const [form, setForm] = useState(initialState);

  const { userUpdated, updateUserError, updateUserLoading } = useSelector(
    (state) => state.user
  );

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
    dispatch(updateUserInfo({ id: user.userId, formData: form }));
  };

  useEffect(() => {
    let timeout;
    if (userUpdated) {
      console.log("updated");
      timeout = 2000;
      setTimeout(() => {
        dispatch(resetUpdateUser());
        window.location.reload();
      }, timeout);
    }
    return () => clearTimeout(timeout);
  }, [userUpdated]);

  return (
    <form className="capitalize font-medium text-xs flex flex-col gap-4 p-10 bg-white shadow-xl rounded-xl">
      <h5 className="text-xl">personal information</h5>
      <Formcontain>
        <Divcontain>
          <label htmlFor="">firstname</label>
          <Admininput
            type="text"
            value={form.firstname}
            placeHolder={user?.firstname || "Not set"}
            handleChange={handleChange}
            name="firstname"
          />
        </Divcontain>
        <Divcontain>
          <label htmlFor="">lastname</label>
          <Admininput
            type="text"
            value={form.lastname}
            placeHolder={user?.lastname || "Not set"}
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
            placeHolder={user?.email || "Not set"}
            handleChange={handleChange}
            name="email"
          />
        </Divcontain>
        <Divcontain>
          <label htmlFor="">username</label>
          <Admininput
            type="text"
            value={form.username}
            placeHolder={user?.username || "Not set"}
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
            placeHolder={user?.phone || "Not set"}
            handleChange={handleChange}
            name="phone"
          />
        </Divcontain>
        <Divcontain>
          <label htmlFor="">dob</label>
          <Admininput
            type="text"
            value={form.dob}
            placeHolder={user?.dob || "Not set"}
            handleChange={handleChange}
            name="dob"
            readOnly={true}
          />
        </Divcontain>
      </Formcontain>
      <Formcontain>
        <div className="flex-1">
          <label htmlFor="">social security number</label>
          <Admininput
            type="text"
            value={form.ssn}
            placeHolder={user?.ssn || "Not set"}
            handleChange={handleChange}
            name="ssn"
          />
        </div>
      </Formcontain>
      {userUpdated && <p className="text-green-500">{userUpdated}</p>}
      {updateUserError && <p className="text-red-500">{updateUserError}</p>}
      <button
        onClick={updateUser}
        className="rounded-sm py-3 mt-4 bg-purple-500 text-white w-[150px] text-sm font-semibold"
      >
        {!updateUserLoading ? "Update" : "wait..."}
      </button>
    </form>
  );
};

export default Personal;
