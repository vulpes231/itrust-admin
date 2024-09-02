import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { devServer, liveServer } from "../constants";
import axios from "axios";
import { getAccessToken } from "../utils/utilities";

const initialState = {
  getBotsLoading: false,
  getBotsError: false,
  bots: [],
  createBotLoading: false,
  createBotError: false,
  createBotSuccess: false,
};

export const getAllBots = createAsyncThunk("bot/getAllBots", async () => {
  const url = `${liveServer}/bot`;
  const accessToken = getAccessToken();
  try {
    const response = await axios.get(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

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

export const createNewBot = createAsyncThunk(
  "bot/createNewBot",
  async (formData) => {
    const url = `${liveServer}/managebot`;
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

const botSlice = createSlice({
  name: "bot",
  initialState,
  reducers: {
    resetAllBots(state) {
      state.bots = [];
      state.getBotsError = false;
      state.getBotsLoading = false;
    },
    resetCreateBot(state) {
      state.createBotError = false;
      state.createBotLoading = false;
      state.createBotSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllBots.pending, (state) => {
        state.getBotsLoading = true;
      })
      .addCase(getAllBots.fulfilled, (state, action) => {
        state.getBotsLoading = false;
        state.getBotsError = false;
        state.bots = action.payload;
      })
      .addCase(getAllBots.rejected, (state, action) => {
        state.getBotsLoading = false;
        state.getBotsError = action.error.message;
        state.bots = [];
      });

    builder
      .addCase(createNewBot.pending, (state) => {
        state.createBotLoading = true;
      })
      .addCase(createNewBot.fulfilled, (state) => {
        state.createBotLoading = false;
        state.createBotError = false;
        state.createBotSuccess = true;
      })
      .addCase(createNewBot.rejected, (state, action) => {
        state.createBotLoading = false;
        state.createBotError = action.error.message;
        state.createBotSuccess = false;
      });
  },
});

const { resetAllBots, resetCreateBot } = botSlice.actions;
export default botSlice.reducer;
