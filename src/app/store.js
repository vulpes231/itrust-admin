import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "../features/loginSlice";
import signupReducer from "../features/signupSlice";
import userReducer from "../features/userSlice";
import walletReducer from "../features/walletSlice";
import trnxReducer from "../features/trnxSlice";
import botReducer from "../features/botSlice";
import logoutReducer from "../features/logoutSlice";
import tradeReducer from "../features/tradeSlice";

const store = configureStore({
  reducer: {
    signin: loginReducer,
    signup: signupReducer,
    user: userReducer,
    wallet: walletReducer,
    trnx: trnxReducer,
    bot: botReducer,
    logout: logoutReducer,
    trade: tradeReducer,
  },
});

export default store;
