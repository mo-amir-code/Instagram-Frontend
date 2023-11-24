import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { signin, signup, verify } from "./authAPI";
import toast from "react-hot-toast";
import { filterfollowing } from "../../../services/authServices";

const initialState = {
  loginStatus: undefined, // pending, success, error
  isLoggedIn: false,
  loggedInUserId: undefined,
  username: null,
  avatar: null,
  following: [],
};

export const signupAsync = createAsyncThunk("auth/signup", async (data) => {
  const response = await signup(data);
  return response;
});

export const verifyAsync = createAsyncThunk("auth/verify", async (data) => {
  const response = await verify(data);
  return response;
});

export const signinAsync = createAsyncThunk("auth/signin", async (data) => {
  const response = await signin(data);
  return response;
});

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateFollowing(state, action) {
      state.following.push(action.payload);
    },
    unFollowingUser(state, action) {
      state.following = filterfollowing(state.following, action.payload);
    },
    logoutUser(state, action) {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signupAsync.pending, (state) => {
        state.loginStatus = "pending";
      })
      .addCase(signupAsync.fulfilled, (state, action) => {
        state.loginStatus = "success";
        setLocalStorage("email", action.payload.email);
        toast.success(action.payload.message);
      })
      .addCase(signupAsync.rejected, (state, action) => {
        state.loginStatus = "error";
        toast.error(action.error.message);
      })
      .addCase(verifyAsync.pending, (state) => {
        state.loginStatus = "pending";
      })
      .addCase(verifyAsync.fulfilled, (state, action) => {
        const { userId, following, username, message, avatar } = action.payload;
        state.loginStatus = "success";
        state.isLoggedIn = true;
        state.loggedInUserId = userId;
        state.following = following;
        state.username = username;
        state.avatar = avatar;
        toast.success(message);
        removeLocalStorage("email");
      })
      .addCase(verifyAsync.rejected, (state, action) => {
        state.loginStatus = "error";
        toast.error(action.error.message);
      })
      .addCase(signinAsync.pending, (state) => {
        state.loginStatus = "pending";
      })
      .addCase(signinAsync.fulfilled, (state, action) => {
        const { userId, following, username, avatar, message } = action.payload;
        state.loginStatus = "success";
        state.isLoggedIn = true;
        state.loggedInUserId = userId;
        state.following = following;
        state.username = username;
        state.avatar = avatar;
        toast.success(message);
      })
      .addCase(signinAsync.rejected, (state, action) => {
        state.loginStatus = "error";
        toast.error(action.error.message);
      });
  },
});

export const { updateFollowing, unFollowingUser, logoutUser } = slice.actions;

export default slice.reducer;

const setLocalStorage = (name, item) => {
  localStorage.setItem(name, item);
};

const removeLocalStorage = (name) => {
  localStorage.removeItem(name);
};
