import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "../features/loginSlice";
import signupReducer from "../features/signupSlice";
import userReducer from "../features/userSlice";
import walletReducer from "../features/walletSlice";
import trnxReducer from "../features/trnxSlice";
import botReducer from "../features/botSlice";

const store = configureStore({
  reducer: {
    signin: loginReducer,
    signup: signupReducer,
    user: userReducer,
    wallet: walletReducer,
    trnx: trnxReducer,
    bot: botReducer,
  },
});

export default store;
