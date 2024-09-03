import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { devServer, liveServer } from "../constants";
import axios from "axios";
import { getAccessToken } from "../utils/utilities";

const initialState = {
  getReqLoading: false,
  getReqError: false,
  verifyRequest: false,
  approveError: false,
  approveSuccess: false,
  approveLoading: false,
  rejectError: false,
  rejectSuccess: false,
  rejectLoading: false,
};

export const getVerification = createAsyncThunk(
  "verify/getVerification",
  async (id) => {
    const url = `${liveServer}/verification/${id}`;
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
export const approveVerification = createAsyncThunk(
  "verify/approveVerification",
  async (id) => {
    const url = `${liveServer}/verification/${id}`;
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
export const rejectVerification = createAsyncThunk(
  "verify/rejectVerification",
  async (id) => {
    const url = `${liveServer}/verification/reject/${id}`;
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
    resetGetRequest(state) {
      state.getReqError = false;
      state.getReqLoading = false;
      state.verifyRequest = false;
    },
    resetApprove(state) {
      state.approveError = false;
      state.approveLoading = false;
      state.approveSuccess = false;
    },
    resetReject(state) {
      state.rejectError = false;
      state.rejectLoading = false;
      state.rejectSuccess = false;
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
    builder
      .addCase(approveVerification.pending, (state) => {
        state.approveLoading = true;
      })
      .addCase(approveVerification.fulfilled, (state) => {
        state.approveError = false;
        state.approveLoading = false;
        state.approveSuccess = true;
      })
      .addCase(approveVerification.rejected, (state, action) => {
        state.approveError = action.error.message;
        state.approveLoading = false;
        state.approveSuccess = false;
      });
    builder
      .addCase(rejectVerification.pending, (state) => {
        state.rejectLoading = true;
      })
      .addCase(rejectVerification.fulfilled, (state) => {
        state.rejectError = false;
        state.rejectLoading = false;
        state.rejectSuccess = true;
      })
      .addCase(rejectVerification.rejected, (state, action) => {
        state.rejectError = action.error.message;
        state.rejectLoading = false;
        state.rejectSuccess = false;
      });
  },
});
export const { resetGetRequest, resetApprove, resetReject } =
  verifySlice.actions;
export default verifySlice.reducer;
