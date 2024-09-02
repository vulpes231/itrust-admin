import React, { useEffect, useState } from "react";

import Formcontain from "./Formcontain";
import Admininput from "./Admininput";
import Divcontain from "./Divcontain";
import { resetUpdateUser, updateUserInfo } from "../../features/userSlice";
import { useDispatch, useSelector } from "react-redux";

const Investing = ({ user }) => {
  // console.log(user);
  const dispatch = useDispatch();
  const initialState = {
    currency: "",
    experience: "",
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
    <div className="capitalize ff font-medium text-xs flex flex-col gap-4 p-10 bg-white shadow-xl rounded-xl">
      <h5 className="text-xl">Investment Details</h5>
      <form action="">
        <Formcontain>
          <Divcontain>
            <label htmlFor="">currency</label>
            <Admininput
              placeHolder={user?.currency}
              value={form.currency}
              handleChange={handleChange}
              name={"currency"}
            />
          </Divcontain>
          <Divcontain>
            <label htmlFor="">experience</label>
            <Admininput
              placeHolder={user?.experience}
              value={form.experience}
              handleChange={handleChange}
              name={"experience"}
            />
          </Divcontain>
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
    </div>
  );
};

export default Investing;
