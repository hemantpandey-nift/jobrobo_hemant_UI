import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { setAccessToken } from "../utils/token";
import http from "../utils/http";
import END_POINTS from "../constants/endPoints";

export const userLogin = createAsyncThunk(
  "user/login",
  async (postData: any, { rejectWithValue }) => {
    try {
      const { data } = await http.post(END_POINTS.LOGIN_URL, postData);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response ? error.response.data : error);
    }
  }
);

interface authSliceProps {
  user: any;
  accessToken: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: any;
  success: boolean;
}

const initialState: authSliceProps = {
  user: null,
  accessToken: null,
  isAuthenticated: false,
  loading: false,
  error: null,
  success: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(userLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userLogin.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true;
        state.accessToken = payload.token.accessToken;
        state.error = null;
        state.isAuthenticated = true;
        setAccessToken(payload.token.accessToken);
      })
      .addCase(userLogin.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
        state.user = null;
        state.success = false;
        state.isAuthenticated = false;
        state.accessToken = null;
      });
  },
});

// Action creators are generated for each case reducer function

export default authSlice.reducer;
