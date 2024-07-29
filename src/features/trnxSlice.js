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
  deleteTrnxLoading: false,
  deleteTrnxError: false,
  deleteTrnxSuccess: false,
  editTrnxLoading: false,
  editTrnxError: false,
  editTrnxSuccess: false,
  rejectTrnxLoading: false,
  rejectTrnxError: false,
  rejectTrnxSuccess: false,
  createTrnxLoading: false,
  createTrnxError: false,
  createTrnxSuccess: false,
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

export const deleteTrnx = createAsyncThunk(
  "trnx/deleteTrnx",
  async (formData) => {
    try {
      const accessToken = getAccessToken();
      const url = `${liveServer}/trnx/`;
      const response = await axios.post(url, formData, {
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

export const editTrnx = createAsyncThunk("trnx/editTrnx", async (formData) => {
  try {
    const accessToken = getAccessToken();
    const url = `${liveServer}/trnx/`;
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
});

export const rejectTrnx = createAsyncThunk(
  "trnx/rejectTrnx",
  async (formData) => {
    try {
      const accessToken = getAccessToken();
      const url = `${liveServer}/trnx/reject`;
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

export const createTrnx = createAsyncThunk(
  "trnx/createTrnx",
  async (formData) => {
    try {
      const accessToken = getAccessToken();
      const url = `${liveServer}/trnx/create`;
      const response = await axios.post(url, formData, {
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
    resetDeleteTrnx() {
      state.deleteTrnxLoading = false;
      state.deleteTrnxError = false;
      state.deleteTrnxSuccess = false;
    },
    resetEditTrnx() {
      state.editTrnxLoading = false;
      state.editTrnxError = false;
      state.editTrnxSuccess = false;
    },
    resetRejectTrnx() {
      state.rejectTrnxLoading = false;
      state.rejectTrnxError = false;
      state.rejectTrnxSuccess = false;
    },
    resetCreateTrnx() {
      state.createTrnxLoading = false;
      state.createTrnxError = false;
      state.createTrnxSuccess = false;
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

    builder
      .addCase(deleteTrnx.pending, (state) => {
        state.deleteTrnxLoading = true;
      })
      .addCase(deleteTrnx.fulfilled, (state) => {
        state.deleteTrnxLoading = false;
        state.deleteTrnxError = false;
        state.deleteTrnxSuccess = true;
      })
      .addCase(deleteTrnx.rejected, (state, action) => {
        state.deleteTrnxLoading = false;
        state.deleteTrnxError = action.error.message;
        state.deleteTrnxSuccess = false;
      });

    builder
      .addCase(editTrnx.pending, (state) => {
        state.editTrnxLoading = true;
      })
      .addCase(editTrnx.fulfilled, (state) => {
        state.editTrnxLoading = false;
        state.editTrnxError = false;
        state.editTrnxSuccess = true;
      })
      .addCase(editTrnx.rejected, (state, action) => {
        state.editTrnxLoading = false;
        state.editTrnxError = action.error.message;
        state.editTrnxSuccess = false;
      });
    builder
      .addCase(rejectTrnx.pending, (state) => {
        state.rejectTrnxLoading = true;
      })
      .addCase(rejectTrnx.fulfilled, (state) => {
        state.rejectTrnxLoading = false;
        state.rejectTrnxError = false;
        state.rejectTrnxSuccess = true;
      })
      .addCase(rejectTrnx.rejected, (state, action) => {
        state.rejectTrnxLoading = false;
        state.rejectTrnxError = action.error.message;
        state.rejectTrnxSuccess = false;
      });

    builder
      .addCase(createTrnx.pending, (state) => {
        state.createTrnxLoading = true;
      })
      .addCase(createTrnx.fulfilled, (state) => {
        state.createTrnxLoading = false;
        state.createTrnxError = false;
        state.createTrnxSuccess = true;
      })
      .addCase(createTrnx.rejected, (state, action) => {
        state.createTrnxLoading = false;
        state.createTrnxError = action.error.message;
        state.createTrnxSuccess = false;
      });
  },
});

export const {
  reset,
  resetDeleteTrnx,
  resetEditTrnx,
  resetRejectTrnx,
  resetCreateTrnx,
} = trnxSlice.actions;
export default trnxSlice.reducer;
