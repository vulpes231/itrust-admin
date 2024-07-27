import React, { useEffect, useState } from "react";
import { Formdiv, Section } from "../components";
import Forminput from "../components/Forminput";
import { useDispatch, useSelector } from "react-redux";
import { signinAdmin } from "../features/loginSlice";
import { useNavigate } from "react-router-dom";
import { MdLockOpen } from "react-icons/md";

const initialState = {
  username: "",
  password: "",
};

const Login = ({ setToken }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { accessToken, admin, loading, error } = useSelector(
    (state) => state.signin
  );
  const [formData, setFormData] = useState(initialState);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(signinAdmin(formData));
    console.log(formData);
    // resetInput();
  };

  useEffect(() => {
    if (accessToken && admin) {
      try {
        sessionStorage.setItem("accessToken", JSON.stringify(accessToken));
        sessionStorage.setItem("admin", JSON.stringify(admin));
        setToken(accessToken);
      } catch (error) {
        console.error("Failed to save access token:", error);
      }

      setTimeout(() => {
        navigate("/dash");
      }, 1000);
    }
  }, [accessToken, admin, dispatch, navigate]);
  return (
    <Section>
      <div className="w-full h-full flex items-center justify-center">
        <form
          onSubmit={handleLogin}
          action=""
          className="bg-white rounded-xl shadow py-6 px-7 flex flex-col gap-4 w-full md:w-[380px]"
        >
          <h4 className="text-xl font-bold capitalize my-3 flex items-center gap-2 text-purple-500">
            <MdLockOpen /> Login Admin
          </h4>
          <Formdiv>
            <label htmlFor="">username</label>
            <Forminput
              type={"text"}
              placeHolder={"Enter username"}
              value={formData.username}
              name="username"
              handleChange={handleInputChange}
            />
          </Formdiv>

          <Formdiv>
            <label htmlFor="">password</label>
            <Forminput
              type={"password"}
              placeHolder={"Enter password"}
              value={formData.password}
              name="password"
              handleChange={handleInputChange}
            />
          </Formdiv>
          {error && (
            <p className="text-red-700 text-sm font-medium bg-red-100 px-4 py-2 rounded-3xl">
              {error}
            </p>
          )}
          {accessToken && (
            <p className="text-green-700 font-sm bg-green-500 bg-opacity-10 p-2 ">
              Login successful.
            </p>
          )}
          <button className="bg-purple-500 text-white font-semibold text-sm capitalize py-3 px-2 rounded-3xl mt-4 hover:bg-purple-600">
            {loading ? "logging in..." : "login"}
          </button>
        </form>
      </div>
    </Section>
  );
};

export default Login;
