import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { devServer, liveServer } from "../constants";
import axios from "axios";
import { getAccessToken } from "../utils/utilities";

const initialState = {
  getTradeLoading: false,
  getTradeError: false,
  trades: [],
  createTradeLoading: false,
  createTradeError: false,
  createTradeSuccess: false,
};

export const getAllTrades = createAsyncThunk("trade/getAllTrades", async () => {
  const url = `${liveServer}/trade`;
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
      const errMsg = error.response.message.data;
      throw new Error(errMsg);
    } else {
      throw error;
    }
  }
});

export const createNewTrade = createAsyncThunk(
  "trade/createNewTrade",
  async (formData) => {
    const url = `${liveServer}/managetrade`;
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
        const errMsg = error.response.message.data;
        throw new Error(errMsg);
      } else {
        throw error;
      }
    }
  }
);

const tradeSlice = createSlice({
  name: "trade",
  initialState,
  reducers: {
    resetAllTrade(state) {
      state.trades = [];
      state.getTradeError = false;
      state.getTradeLoading = false;
    },
    resetCreateTrade(state) {
      state.createTradeError = false;
      state.createTradeLoading = false;
      state.createTradeSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllTrades.pending, (state) => {
        state.getTradeLoading = true;
      })
      .addCase(getAllTrades.fulfilled, (state, action) => {
        state.getTradeLoading = false;
        state.getTradeError = false;
        state.bots = action.payload;
      })
      .addCase(getAllTrades.rejected, (state, action) => {
        state.getTradeLoading = false;
        state.getTradeError = action.error.message;
        state.bots = [];
      });

    builder
      .addCase(createNewTrade.pending, (state) => {
        state.createTradeLoading = true;
      })
      .addCase(createNewTrade.fulfilled, (state) => {
        state.createTradeLoading = false;
        state.createTradeError = false;
        state.createTradeSuccess = true;
      })
      .addCase(createNewTrade.rejected, (state, action) => {
        state.createTradeLoading = false;
        state.createTradeError = action.error.message;
        state.createTradeSuccess = false;
      });
  },
});

export const { resetAllTrade, resetCreateTrade } = tradeSlice.actions;
export default tradeSlice.reducer;
