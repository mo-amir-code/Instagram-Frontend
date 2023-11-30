import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchFeatureUsers,
  fetchMyUser,
  fetchUser,
  updateMyUser,
} from "./userAPI";
import toast from "react-hot-toast";

const initialState = {
  status: null, // pending, sucess, error
  userInfo: null,
  userAvatar: null,
  unknownUserInfo: null,
  unknownUserAvatar: null,
  unknownUserStatus: null,
  featureUsers: [],
};

export const fetchMyUserAsync = createAsyncThunk(
  "user/fetchmyuser",
  async (id) => {
    const response = await fetchMyUser(id);
    return response;
  }
);

export const updateMyUserAsync = createAsyncThunk(
  "user/updatemyuser",
  async (data) => {
    const response = await updateMyUser(data);
    return response;
  }
);

export const fetchUserAsync = createAsyncThunk(
  "user/fetchUser",
  async (username) => {
    const response = await fetchUser(username);
    return response;
  }
);

export const fetchFeatureUsersAsync = createAsyncThunk(
  "user/fetchFeatureUsers",
  async () => {
    const response = await fetchFeatureUsers();
    return response;
  }
);

const slice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMyUserAsync.pending, (state) => {
        state.status = "pending";
      })
      .addCase(fetchMyUserAsync.fulfilled, (state, action) => {
        state.status = "success";
        state.userInfo = action.payload.data;
        state.userAvatar = action.payload.data.avatar;
      })
      .addCase(fetchMyUserAsync.rejected, (state, action) => {
        state.status = "error";
        toast.error(action.error.message);
      })
      .addCase(updateMyUserAsync.pending, (state) => {
        state.status = "pending";
      })
      .addCase(updateMyUserAsync.fulfilled, (state, action) => {
        state.status = "success";
        const posts = state.userInfo.posts;
        state.userInfo = { ...action.payload.data, posts };
        state.userAvatar = action.payload.data.avatar;
        toast.success(action.payload.message);
      })
      .addCase(updateMyUserAsync.rejected, (state, action) => {
        state.status = "error";
        toast.error(action.error.message);
      })
      .addCase(fetchUserAsync.pending, (state) => {
        state.unknownUserStatus = "pending";
      })
      .addCase(fetchUserAsync.fulfilled, (state, action) => {
        state.unknownUserStatus = "success";
        state.unknownUserInfo = action.payload.data;
        state.unknownUserAvatar = action.payload.data.avatar;
      })
      .addCase(fetchUserAsync.rejected, (state, action) => {
        state.unknownUserStatus = action.error.status;
        toast.error(action.error.message);
      })
      .addCase(fetchFeatureUsersAsync.fulfilled, (state, action) => {
        state.featureUsers = action.payload.data;
      })
      .addCase(fetchFeatureUsersAsync.rejected, (state, action) => {
        toast.error(action.error.message);
      });
  },
});

export default slice.reducer;
