import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "../features/loginSlice";
import signupReducer from "../features/signupSlice";

const store = configureStore({
  reducer: {
    signin: loginReducer,
    signup: signupReducer,
  },
});

export default store;
