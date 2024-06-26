import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { devServer, liveServer } from "../constants";
import { getAccessToken } from "../utils/utilities";

const initialState = {
  getTrnxLoading: false,
  getTrnxError: false,
  getTrnxSuccess: false,
  trnxs: [],
  approveTrnxLoading: false,
  approveTrnxError: false,
  approveTrnxSuccess: false,
};

export const getTrnxs = createAsyncThunk("trnx/getTrnxs", async (formData) => {
  try {
    const accessToken = getAccessToken();
    const url = `${liveServer}/trnx`;
    const response = await axios.get(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    // console.log("Trnx", response.data);
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

export const approveTrnxs = createAsyncThunk(
  "trnx/approveTrnxs",
  async (formData) => {
    try {
      const accessToken = getAccessToken();
      const url = `${liveServer}/trnx/approve`;
      const response = await axios.put(url, formData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      // console.log("Trnx", response.data);
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

const trnxSlice = createSlice({
  name: "trnx",
  initialState,
  reducers: {
    reset(state) {
      state.getTrnxLoading = false;
      state.getTrnxError = false;
      state.getTrnxSuccess = false;
      state.approveTrnxLoading = false;
      state.approveTrnxError = false;
      state.approveTrnxSuccess = false;
      state.trnxs = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTrnxs.pending, (state) => {
        state.getTrnxLoading = true;
      })
      .addCase(getTrnxs.fulfilled, (state, action) => {
        state.getTrnxLoading = false;
        state.getTrnxError = false;
        state.getTrnxSuccess = true;
        state.trnxs = action.payload;
      })
      .addCase(getTrnxs.rejected, (state, action) => {
        state.getTrnxLoading = false;
        state.getTrnxError = action.error.message;
        state.getTrnxSuccess = false;
        state.trnxs = [];
      });

    builder
      .addCase(approveTrnxs.pending, (state) => {
        state.approveTrnxLoading = true;
      })
      .addCase(approveTrnxs.fulfilled, (state) => {
        state.approveTrnxLoading = false;
        state.approveTrnxError = false;
        state.approveTrnxSuccess = true;
      })
      .addCase(approveTrnxs.rejected, (state, action) => {
        state.approveTrnxLoading = false;
        state.approveTrnxError = action.error.message;
        state.approveTrnxSuccess = false;
      });
  },
});

export const { reset } = trnxSlice.actions;
export default trnxSlice.reducer;
