import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { devServer, liveServer } from "../constants";
import { getAccessToken } from "../utils/utilities";

const initialState = {
  getLoading: false,
  getError: false,
  getSuccess: false,
  users: [],
  detailsLoading: false,
  detailsError: false,
  userDetails: null,
  deleteLoading: false,
  deleteError: false,
  deleted: false,
};

const accessToken = getAccessToken();

export const getUsers = createAsyncThunk("user/getUsers", async (formData) => {
  try {
    const url = `${liveServer}/users`;
    const response = await axios.get(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    // console.log("Users", response.data);
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

export const getUserDetails = createAsyncThunk(
  "user/getUserDetails",
  async (id) => {
    const url = `${devServer}/users/${id}`;
    try {
      const response = await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      // console.log("Users", response.data);
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

export const removeUser = createAsyncThunk("user/removeUser", async (id) => {
  // console.log(userId);
  try {
    const url = `${devServer}/users/delete/${id}`;
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
    console.log("Users", response.data);
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

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    reset(state) {
      state.getLoading = false;
      state.getError = false;
      state.getSuccess = false;
      state.users = [];
    },
    resetUserDetails(state) {
      state.detailsLoading = false;
      state.detailsError = false;
      state.userDetails = null;
    },
    resetDeleteUser(state) {
      state.deleteError = false;
      state.deleteLoading = false;
      state.deleted = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.getLoading = true;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.getLoading = false;
        state.getError = false;
        state.getSuccess = true;
        state.users = action.payload;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.getLoading = false;
        state.getError = action.error.message;
        state.getSuccess = false;
        state.users = [];
      });
    builder
      .addCase(getUserDetails.pending, (state) => {
        state.detailsLoading = true;
      })
      .addCase(getUserDetails.fulfilled, (state, action) => {
        state.detailsLoading = false;
        state.detailsError = false;
        state.userDetails = action.payload;
      })
      .addCase(getUserDetails.rejected, (state, action) => {
        state.detailsLoading = false;
        state.detailsError = action.error.message;
        state.userDetails = null;
      });

    builder
      .addCase(removeUser.pending, (state) => {
        state.deleteLoading = true;
      })
      .addCase(removeUser.fulfilled, (state) => {
        state.deleteLoading = false;
        state.deleteError = false;
        state.deleted = true;
      })
      .addCase(removeUser.rejected, (state, action) => {
        state.deleteLoading = false;
        state.deleteError = action.error.message;
        state.deleted = false;
      });
  },
});

export const { reset, resetUserDetails, resetDeleteUser } = userSlice.actions;
export default userSlice.reducer;
