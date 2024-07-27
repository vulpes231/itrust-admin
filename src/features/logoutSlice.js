import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { devServer, liveServer } from "../constants";
import axios from "axios";
import { getAccessToken } from "../utils/utilities";

const initialState = {
  logoutError: false,
  logoutLoading: false,
  loggedOut: false,
};

export const logoutAdmin = createAsyncThunk("logout/logoutAdmin", async () => {
  const url = `${devServer}/signout`;
  const accessToken = getAccessToken();
  try {
    const response = await axios.post(
      url,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    if (response.data) {
      sessionStorage.clear();
    }
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

const logoutSlice = createSlice({
  name: "logout",
  initialState,
  reducers: {
    resetLogout(state) {
      state.loggedOut = false;
      state.logoutError = false;
      state.logoutLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(logoutAdmin.pending, (state) => {
        state.logoutLoading = true;
      })
      .addCase(logoutAdmin.fulfilled, (state) => {
        state.logoutLoading = false;
        state.logoutError = false;
        state.loggedOut = true;
      })
      .addCase(logoutAdmin.rejected, (state, action) => {
        state.logoutLoading = false;
        state.logoutError = action.error.message;
        state.loggedOut = false;
      });
  },
});

export default logoutSlice.reducer;

export const { resetLogout } = logoutSlice.actions;
