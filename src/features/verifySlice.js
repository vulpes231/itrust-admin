import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { devServer } from "../constants";
import axios from "axios";
import { getAccessToken } from "../utils/utilities";

const initialState = {
  getReqLoading: false,
  getReqError: false,
  verifyRequest: false,
};

export const getVerification = createAsyncThunk(
  "verify/getVerification",
  async (id) => {
    const url = `${devServer}/verification/${id}`;
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
        const errMsg = error.response.data.message;
        throw new Error(errMsg);
      } else {
        throw error;
      }
    }
  }
);

const verifySlice = createSlice({
  name: "verify",
  initialState,
  reducers: {
    resetApprove(state) {
      state.getReqError = false;
      state.getReqLoading = false;
      state.verifyRequest = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getVerification.pending, (state) => {
        state.getReqLoading = true;
      })
      .addCase(getVerification.fulfilled, (state, action) => {
        state.getReqError = false;
        state.getReqLoading = false;
        state.verifyRequest = action.payload;
      })
      .addCase(getVerification.rejected, (state, action) => {
        state.getReqError = action.error.message;
        state.getReqLoading = false;
        state.verifyRequest = false;
      });
  },
});
export const { resetApprove } = verifySlice.actions;
export default verifySlice.reducer;
