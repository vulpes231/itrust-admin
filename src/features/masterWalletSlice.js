import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { devServer, liveServer } from "../constants";
import { getAccessToken } from "../utils/utilities";
import axios from "axios";

const initialState = {
  getCoinsLoad: false,
  getCoinsError: false,
  coins: [],
  createCoinLoad: false,
  createCoinError: false,
  coinCreated: false,
  updateCoinLoad: false,
  updateCoinError: false,
  coinUpdated: false,
};

export const getAllCoins = createAsyncThunk("master/getAllCoins", async () => {
  const url = `${liveServer}/walletaddress`;
  const accessToken = getAccessToken();
  try {
    const response = await axios.get(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    // console.log(response.data);
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

export const createCoin = createAsyncThunk(
  "master/createCoin",
  async (formData) => {
    const url = `${liveServer}/walletaddress`;
    const accessToken = getAccessToken();
    try {
      const response = await axios.post(url, formData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log(response.data);
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

export const updateMasterWallet = createAsyncThunk(
  "master/updateMasterWallet",
  async (formData) => {
    const url = `${liveServer}/walletaddress`;
    const accessToken = getAccessToken();
    try {
      const response = await axios.put(url, formData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log(response.data);
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

const masterWalletSchema = createSlice({
  name: "master",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getAllCoins.pending, (state) => {
        state.getCoinsLoad = true;
      })
      .addCase(getAllCoins.fulfilled, (state, action) => {
        state.getCoinsLoad = false;
        state.getCoinsError = false;
        state.coins = action.payload.walletAddresses;
      })
      .addCase(getAllCoins.rejected, (state, action) => {
        state.getCoinsLoad = false;
        state.coins = [];
        state.getCoinsError = action.error.message;
      });

    builder
      .addCase(createCoin.pending, (state) => {
        state.createCoinLoad = true;
      })
      .addCase(createCoin.fulfilled, (state) => {
        state.createCoinLoad = false;
        state.createCoinError = false;
        state.coinCreated = true;
      })
      .addCase(createCoin.rejected, (state, action) => {
        state.createCoinLoad = false;
        state.coinCreated = false;
        state.createCoinError = action.message.error;
      });

    builder
      .addCase(updateMasterWallet.pending, (state) => {
        state.updateCoinLoad = true;
      })
      .addCase(updateMasterWallet.fulfilled, (state) => {
        state.updateCoinLoad = false;
        state.updateCoinError = false;
        state.coinUpdated = true;
      })
      .addCase(updateMasterWallet.rejected, (state, action) => {
        state.updateCoinLoad = false;
        state.coinUpdated = false;
        state.updateCoinError = action.error.message;
      });
  },
});

export default masterWalletSchema.reducer;
