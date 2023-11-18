import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import {
  filterPosts,
  increamentPostCommentCount,
  pullCommentLike,
  pullLike,
  pullPostPageLike,
  pullSaved,
  pushCommentLike,
  pushNewLike,
  pushNewSaved,
} from "../../../services/appServices";
import authSlice from "../Auth/authSlice";
import { commentDisLikeAsync, commentLikeAsync, fetchExplorePostsAsync, fetchMyUserPostAsync, fetchPostInfoAsync, fetchPostsAsync, fetchUserPostAsync, followUserAsync, likePostAsync, newPostAsync, newVideoPostAsync, postCommentAsync, removeLikedPostAsync, removeSavedPostAsync, savePostAsync, unFollowUserAsync } from "./appAsyncThunk"

const initialState = {
  active: 0,
  pcNavModal: null, // Search, Messages, Notifications
  newPostModal: false,
  postStatus: null, // pending, success, error
  myUserPosts: [],
  userPosts: [],
  posts: [],
  totalPost: null,
  changes: null, // This is for trigger changes
  postPageInfo: null,
  postPageInfoStatus: false,
  postPageStatus: false,
  explorePosts: [],
  exploreStatus:false
};

const slice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setNavModal(state, action) {
      state.pcNavModal = action.payload;
    },
    toggleNewPostModal(state) {
      state.newPostModal = !state.newPostModal;
    },
    resetPostStatus(state) {
      state.postStatus = null;
    },
    setActive(state, action) {
      state.active = action.payload;
    },
    postPageStatusToggle(state) {
      state.postPageStatus = !state.postPageStatus;
    },
    resetPostPageInfo(state) {
      state.postPageInfo = undefined;
      state.postPageInfoStatus = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(newPostAsync.pending, (state) => {
        state.postStatus = "pending";
      })
      .addCase(newPostAsync.fulfilled, (state, action) => {
        state.postStatus = "success";
        toast.success(action.payload.message);
      })
      .addCase(newPostAsync.rejected, (state, action) => {
        state.postStatus = "error";
        toast.error(action.error.message);
      })
      .addCase(newVideoPostAsync.pending, (state) => {
        state.postStatus = "pending";
      })
      .addCase(newVideoPostAsync.fulfilled, (state, action) => {
        state.postStatus = "success";
        toast.success(action.payload.message);
      })
      .addCase(newVideoPostAsync.rejected, (state, action) => {
        state.postStatus = "error";
        toast.error(action.error.message);
      })
      .addCase(fetchMyUserPostAsync.pending, (state) => {
        state.postStatus = "pending";
      })
      .addCase(fetchMyUserPostAsync.fulfilled, (state, action) => {
        state.postStatus = "success";
        state.myUserPosts = action.payload.data;
        // toast.success(action.payload.message);
      })
      .addCase(fetchMyUserPostAsync.rejected, (state, action) => {
        state.postStatus = "error";
        toast.error(action.error.message);
      })
      .addCase(fetchUserPostAsync.pending, (state) => {
        state.postStatus = "pending";
      })
      .addCase(fetchUserPostAsync.fulfilled, (state, action) => {
        state.postStatus = "success";
        state.userPosts = action.payload.data;
        // toast.success(action.payload.message);
      })
      .addCase(fetchUserPostAsync.rejected, (state, action) => {
        state.postStatus = "error";
        toast.error(action.error.message);
      })
      // .addCase(fetchPostsAsync.pending, (state) => {
      //   state.postStatus = "pending";
      // })
      .addCase(fetchPostsAsync.fulfilled, (state, action) => {
        // state.postStatus = "success";
        const posts = filterPosts(state.posts, action.payload.data);
        state.posts = posts;
        state.totalPost = action.payload.totalResult;
        // toast.success(action.payload.message);
      })
      .addCase(fetchPostsAsync.rejected, (state, action) => {
        // state.postStatus = "error";
        toast.error(action.error.message);
      })
      .addCase(likePostAsync.fulfilled, (state, action) => {
        const { postId, userId } = action.payload.data;
        if (state.postPageInfo) {
          state.postPageInfo.likes.push(userId);
        }
        const posts = pushNewLike(state.posts, postId, userId);
        state.posts = posts;
      })
      .addCase(likePostAsync.rejected, (state, action) => {
        toast.error(action.error.message);
      })
      .addCase(removeLikedPostAsync.fulfilled, (state, action) => {
        const { postId, userId } = action.payload.data;
        const posts = pullLike(state.posts, postId, userId);
        state.postPageInfo = pullPostPageLike(state.postPageInfo, userId);
        state.posts = posts;
      })
      .addCase(removeLikedPostAsync.rejected, (state, action) => {
        toast.error(action.error.message);
      })
      .addCase(postCommentAsync.fulfilled, (state, action) => {
        const { postId, comment } = action.payload;
        const posts = increamentPostCommentCount(postId, state.posts);
        state.posts = posts.posts;
        state.changes = posts.postId;
        if (state.postPageInfo) {
          state.postPageInfo.comments.push(comment);
        }
        toast.success(action.payload.message);
      })
      .addCase(postCommentAsync.rejected, (state, action) => {
        toast.error(action.error.message);
      })
      .addCase(savePostAsync.fulfilled, (state, action) => {
        const { postId, savedId } = action.payload.data;
        const posts = pushNewSaved(state.posts, postId, savedId);
        state.posts = posts;
        toast.success(action.payload.message);
      })
      .addCase(savePostAsync.rejected, (state, action) => {
        toast.error(action.error.message);
      })
      .addCase(removeSavedPostAsync.fulfilled, (state, action) => {
        const { postId, savedId } = action.payload.data;
        const posts = pullSaved(state.posts, postId, savedId);
        state.posts = posts;
        toast.success(action.payload.message);
      })
      .addCase(removeSavedPostAsync.rejected, (state, action) => {
        toast.error(action.error.message);
      })
      .addCase(followUserAsync.fulfilled, (state, action) => {
        handleUpdateFollowingList(action.payload.data.postUser);
        state.changes = action.payload.data.postUser;
        toast.success(action.payload.message);
      })
      .addCase(followUserAsync.rejected, (state, action) => {
        toast.error(action.error.message);
      })
      .addCase(unFollowUserAsync.fulfilled, (state, action) => {
        // handleUpdateFollowingList(action.payload.data.postUser);
        state.changes = {
          id: action.payload.data.postUser,
          type: "unfollow",
        };
        toast.success(action.payload.message);
      })
      .addCase(unFollowUserAsync.rejected, (state, action) => {
        toast.error(action.error.message);
      })
      .addCase(fetchPostInfoAsync.fulfilled, (state, action) => {
        state.postPageInfo = action.payload.data;
        state.postPageInfoStatus = true;
        toast.success(action.payload.message);
      })
      .addCase(fetchPostInfoAsync.rejected, (state, action) => {
        toast.error(action.error.message);
      })
      .addCase(fetchExplorePostsAsync.fulfilled, (state, action) => {
        state.explorePosts = action.payload.data;
        state.exploreStatus = true;
        // toast.success(action.payload.message);
      })
      .addCase(fetchExplorePostsAsync.rejected, (state, action) => {
        toast.error(action.error.message);
      })
      .addCase(commentLikeAsync.fulfilled, (state, action) => {
        const { likedCommentId, user } = action.payload.data;
        state.postPageInfo = pushCommentLike(state.postPageInfo, likedCommentId, user);
      })
      .addCase(commentLikeAsync.rejected, (state, action) => {
        toast.error(action.error.message);
      })
      .addCase(commentDisLikeAsync.fulfilled, (state, action) => {
        const { unLikedCommentId, user } = action.payload.data;
        state.postPageInfo = pullCommentLike(state.postPageInfo, unLikedCommentId, user);
      })
      .addCase(commentDisLikeAsync.rejected, (state, action) => {
        toast.error(action.error.message);
      })
  },
});

export const {
  setNavModal,
  toggleNewPostModal,
  resetPostStatus,
  setActive,
  postPageStatusToggle,
  resetPostPageInfo,
} = slice.actions;

const handleUpdateFollowingList = (postUser) => {
  return (dispatch) => {
    dispatch(authSlice.actions.updateFollowing(postUser));
  };
};

export default slice.reducer;
