import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { devServer, liveServer } from "../constants";
import { getAccessToken } from "../utils/utilities";

const initialState = {
  getWalletLoading: false,
  getWalletError: false,
  getWalletSuccess: false,
  wallet: [],
  setWalletLoading: false,
  setWalletError: false,
  setWalletSuccess: false,
  swapLoading: false,
  swapError: false,
  fundSwapped: false,
};

export const getWallet = createAsyncThunk("wallet/getWallet", async () => {
  try {
    const accessToken = getAccessToken();
    const url = `${liveServer}/wallet`;
    const response = await axios.get(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    // console.log("Wallets", response.data);
    return response.data;
  } catch (error) {
    if (error.response) {
      const errorMsg = error.response.data.message;
      throw new Error(errorMsg);
    } else {
      throw error;
    }
  }
});

export const setWallet = createAsyncThunk(
  "wallet/setWallet",
  async (FormData) => {
    try {
      const accessToken = getAccessToken();
      const url = `${liveServer}/wallet`;
      const response = await axios.put(url, FormData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log("Address", response.data);
      return response.data;
    } catch (error) {
      if (error.response) {
        const errorMsg = error.response.data.message;
        throw new Error(errorMsg);
      } else {
        throw error;
      }
    }
  }
);

export const swapUserFunds = createAsyncThunk(
  "wallet/swapUserFunds",
  async (FormData) => {
    try {
      const accessToken = getAccessToken();
      const url = `${liveServer}/wallet`;
      const response = await axios.post(url, FormData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      // console.log("Address", response.data);
      return response.data;
    } catch (error) {
      if (error.response) {
        const errorMsg = error.response.data.message;
        throw new Error(errorMsg);
      } else {
        throw error;
      }
    }
  }
);

const walletSlice = createSlice({
  name: "wallet",
  initialState,
  reducers: {
    reset(state) {
      state.getWalletLoading = false;
      state.getWalletError = false;
      state.getWalletSuccess = false;
      state.setWalletLoading = false;
      state.setWalletError = false;
      state.setWalletSuccess = false;
      state.wallet = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getWallet.pending, (state) => {
        state.getWalletLoading = true;
      })
      .addCase(getWallet.fulfilled, (state, action) => {
        state.getWalletLoading = false;
        state.getWalletError = false;
        state.getWalletSuccess = true;
        state.wallet = action.payload;
      })
      .addCase(getWallet.rejected, (state, action) => {
        state.getWalletLoading = false;
        state.getWalletError = action.error.message;
        state.getWalletSuccess = false;
        state.wallet = [];
      });

    builder
      .addCase(setWallet.pending, (state) => {
        state.setWalletLoading = true;
      })
      .addCase(setWallet.fulfilled, (state) => {
        state.setWalletLoading = false;
        state.setWalletError = false;
        state.setWalletSuccess = true;
      })
      .addCase(setWallet.rejected, (state, action) => {
        state.setWalletLoading = false;
        state.setWalletError = action.error.message;
        state.setWalletSuccess = false;
      });
    builder
      .addCase(swapUserFunds.pending, (state) => {
        state.swapLoading = true;
      })
      .addCase(swapUserFunds.fulfilled, (state) => {
        state.swapLoading = false;
        state.swapError = false;
        state.fundSwapped = true;
      })
      .addCase(swapUserFunds.rejected, (state, action) => {
        state.swapLoading = false;
        state.swapError = action.error.message;
        state.fundSwapped = false;
      });
  },
});

export const { reset } = walletSlice.actions;
export default walletSlice.reducer;
