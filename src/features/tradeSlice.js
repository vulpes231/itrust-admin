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
  editTradeLoading: false,
  editTradeError: false,
  editTradeSuccess: false,
  deleteTradeLoading: false,
  deleteTradeError: false,
  deleteTradeSuccess: false,
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
      const errMsg = error.response.data.message;
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
      // console.log(response.data);
      return response.data;
    } catch (error) {
      if (error.response) {
        const errMsg = error.response.data.message;
        throw new Error(errMsg);
      } else {
        throw error;
      }
    }
  }
);

export const editTrade = createAsyncThunk(
  "trade/editTrade",
  async (formData) => {
    const url = `${liveServer}/managetrade`;
    const accessToken = getAccessToken();
    try {
      const response = await axios.put(url, formData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      // console.log(response.data);
      return response.data;
    } catch (error) {
      if (error.response) {
        const errMsg = error.response.data.message;
        throw new Error(errMsg);
      } else {
        throw error;
      }
    }
  }
);

export const deleteTrade = createAsyncThunk("trade/deleteTrade", async (id) => {
  const url = `${liveServer}/managetrade/${id}`;
  const accessToken = getAccessToken();
  try {
    const response = await axios.put(
      url,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    // console.log(response.data);
    return response.data;
  } catch (error) {
    if (error.response) {
      const errMsg = error.response.data.message;
      throw new Error(errMsg);
    } else {
      throw error;
    }
  }
});

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
        state.trades = action.payload;
      })
      .addCase(getAllTrades.rejected, (state, action) => {
        state.getTradeLoading = false;
        state.getTradeError = action.error.message;
        state.trades = [];
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
    builder
      .addCase(editTrade.pending, (state) => {
        state.editTradeLoading = true;
      })
      .addCase(editTrade.fulfilled, (state) => {
        state.editTradeLoading = false;
        state.editTradeError = false;
        state.editTradeSuccess = true;
      })
      .addCase(editTrade.rejected, (state, action) => {
        state.editTradeLoading = false;
        state.editTradeError = action.error.message;
        state.editTradeSuccess = false;
      });
    builder
      .addCase(deleteTrade.pending, (state) => {
        state.deleteTradeLoading = true;
      })
      .addCase(deleteTrade.fulfilled, (state) => {
        state.deleteTradeLoading = false;
        state.deleteTradeError = false;
        state.deleteTradeSuccess = true;
      })
      .addCase(deleteTrade.rejected, (state, action) => {
        state.deleteTradeLoading = false;
        state.deleteTradeError = action.error.message;
        state.deleteTradeSuccess = false;
      });
  },
});

export const { resetAllTrade, resetCreateTrade } = tradeSlice.actions;
export default tradeSlice.reducer;
