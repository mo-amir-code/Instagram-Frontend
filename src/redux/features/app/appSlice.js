import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import {
  checkConversation,
  filterPosts,
  increamentPostCommentCount,
  pullCommentLike,
  pullLike,
  pullPostPageLike,
  pullSaved,
  pushCommentLike,
  pushNewLike,
  pushNewSaved,
  resetUnreadConversation,
  setConversations,
} from "../../../services/appServices";
import authSlice from "../Auth/authSlice";
import {
  commentDisLikeAsync,
  commentLikeAsync,
  fetchExplorePostsAsync,
  fetchMyUserPostAsync,
  fetchNotificationsAsync,
  fetchNotificationsCountAsync,
  fetchPostInfoAsync,
  fetchPostsAsync,
  fetchReelsAsync,
  fetchSearchResultsAsync,
  fetchUserPostAsync,
  followUserAsync,
  likePostAsync,
  newPostAsync,
  newVideoPostAsync,
  postCommentAsync,
  removeLikedPostAsync,
  removeSavedPostAsync,
  savePostAsync,
  unFollowUserAsync,
} from "./appAsyncThunk";

const initialState = {
  directChat: {
    conversations: [],
    primaryConversations: [],
    generalConversations: [],
    conversationsStatus: null, // pending, success, error
    currentConversationUser: null,
    currentConversation: [],
    currentConversationStatus: null, // pending, success, error
    sendingMessageStatus: null, // pending, success, error
  },
  stories: {
    yourStories: [],
    yourStoriesStatus: null, // pending, success, error
    stories: [],
    storiesStatus: null, // pending, success, error
    selected: null,
  },
  notification: {
    likesCount: 0,
    commentsCount: 0,
    notifications: [],
    isNewNotification: false,
    notificationStatus: null, // pending, success, error
  },
  active: 0,
  pcNavModal: null, // Search, Messages, Notifications
  newPostModal: false,
  postStatus: null, // pending, success, error
  myUserPosts: [],
  myUserSaved: [],
  userPosts: [],
  posts: [],
  totalPost: null,
  changes: null, // This is for trigger changes
  postPageInfo: null,
  postPageInfoStatus: false,
  postPageStatus: false,
  explorePosts: [],
  explorePostsTotal: 0,
  exploreStatus: false,
  reels: [],
  totalReels: 0,
  reelsStatus: null, // pending, success, reject
  searchResults: [],
  searchStatus: null, // pending, success
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
    currentConversationStatusUpdate(state, action) {
      state.directChat.currentConversationStatus = action.payload;
    },
    updateCurrentConversation(state, action) {
      const data = setConversations(
        state.directChat.conversations,
        action.payload
      );
      state.directChat.conversations = data.conversations;
      state.directChat.currentConversation = data.currMessages;
      state.directChat.currentConversationUser = data.currConv;
      state.directChat.currentConversationStatus = "success";
    },
    recievedNewMessage(state, action) {
      const currConv = JSON.parse(
        JSON.stringify(state.directChat.currentConversationUser)
      );
      const convs = JSON.parse(JSON.stringify(state.directChat.conversations));
      const { message, conversationId, user } = action.payload;
      // console.log(action.payload, convs);
      if (conversationId.toString() === currConv?.conversationId.toString()) {
        state.directChat.currentConversation.push(message);
        if (!checkConversation(convs, currConv.conversationId)) {
          const data = {
            conversationId,
            user,
            unread: 0,
          };
          state.directChat.conversations.push(data);
        }
      } else {
        const conv = convs.find(
          (el) => el.conversationId.toString() === conversationId.toString()
        );
        const convIndex = convs.findIndex(
          (el) => el.conversationId.toString() === conversationId.toString()
        );
        if (convIndex === -1) {
          const data = {
            conversationId,
            user,
            unread: 1,
          };
          state.directChat.conversations.push(data);
        } else {
          conv.unread += 1;
          state.directChat.conversations[convIndex] = conv;
        }
      }
      state.directChat.sendingMessageStatus = "success";
    },
    fetchConversations(state, action) {
      state.directChat.conversations = action.payload;
    },
    selectExistingConversation(state, action) {
      const { messages, conversation } = action.payload;
      state.directChat.conversations = resetUnreadConversation(
        state.directChat.conversations,
        conversation.conversationId
      );
      state.directChat.currentConversation = messages;
      state.directChat.currentConversationUser = conversation;
      state.directChat.currentConversationStatus = "success";
    },
    sendingMessageStatusUpdate(state, action) {
      state.directChat.sendingMessageStatus = action.payload;
    },
    setPrimaryGeneralConvs(state, action) {
      // console.log(action.payload);
      state.directChat.primaryConversations = action.payload.primaryConvs;
      state.directChat.generalConversations = action.payload.generalConvs;
    },
    selectStoryFile(state, action) {
      const { file } = action.payload;
      state.stories.selected = file;
    },
    newNotificationRecieved(state, action) {
      const { type } = action.payload;
      if (type === "like") {
        state.notification.likesCount += 1;
      } else {
        state.notification.commentsCount += 1;
      }
      state.notification.isNewNotification = true;
    },
    toggleIsNewNotification(state) {
      state.notification.isNewNotification = false;
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
        state.myUserSaved = action.payload.saved;
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
        const { postId, userId, type } = action.payload.data;
        if (state.postPageInfo) {
          state.postPageInfo.likes.push(userId);
        }
        const posts = pushNewLike(state.posts, postId, userId);
        state.posts = posts;
        const reels = pushNewLike(state.reels, postId, userId);
        state.reels = reels;
      })
      .addCase(likePostAsync.rejected, (state, action) => {
        toast.error(action.error.message);
      })
      .addCase(removeLikedPostAsync.fulfilled, (state, action) => {
        const { postId, userId, type } = action.payload.data;
        const posts = pullLike(state.posts, postId, userId);
        state.posts = posts;
        const reels = pullLike(state.reels, postId, userId);
        state.reels = reels;
        if (state.postPageInfo) {
          state.postPageInfo = pullPostPageLike(state.postPageInfo, userId);
        }
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
        const { data, totalResult } = action.payload;
        state.explorePosts = filterPosts(state.explorePosts, data);
        state.explorePostsTotal = totalResult;
        state.exploreStatus = true;
        // toast.success(action.payload.message);
      })
      .addCase(fetchExplorePostsAsync.rejected, (state, action) => {
        toast.error(action.error.message);
      })
      .addCase(commentLikeAsync.fulfilled, (state, action) => {
        const { likedCommentId, user } = action.payload.data;
        state.postPageInfo = pushCommentLike(
          state.postPageInfo,
          likedCommentId,
          user
        );
      })
      .addCase(commentLikeAsync.rejected, (state, action) => {
        toast.error(action.error.message);
      })
      .addCase(commentDisLikeAsync.fulfilled, (state, action) => {
        const { unLikedCommentId, user } = action.payload.data;
        state.postPageInfo = pullCommentLike(
          state.postPageInfo,
          unLikedCommentId,
          user
        );
      })
      .addCase(commentDisLikeAsync.rejected, (state, action) => {
        toast.error(action.error.message);
      })
      .addCase(fetchReelsAsync.pending, (state) => {
        state.reelsStatus = "pending";
      })
      .addCase(fetchReelsAsync.fulfilled, (state, action) => {
        const { totalResult, data } = action.payload;
        state.reelsStatus = "success";
        state.reels = filterPosts(state.reels, data);
        state.totalReels = totalResult;
      })
      .addCase(fetchReelsAsync.rejected, (state, action) => {
        state.reelsStatus = "reject";
        toast.error(action.error.message);
      })
      .addCase(fetchSearchResultsAsync.pending, (state) => {
        state.searchStatus = "pending";
      })
      .addCase(fetchSearchResultsAsync.fulfilled, (state, action) => {
        state.searchStatus = "success";
        state.searchResults = action.payload.data;
      })
      .addCase(fetchSearchResultsAsync.rejected, (state, action) => {
        toast.error(action.error.message);
      })
      .addCase(fetchNotificationsCountAsync.fulfilled, (state, action) => {
        const { likesCount, commentsCount } = action.payload.data;
        state.notification.likesCount = likesCount;
        state.notification.commentsCount = commentsCount;
        if (likesCount > 0 || commentsCount > 0) {
          state.notification.isNewNotification = true;
        }
      })
      .addCase(fetchNotificationsCountAsync.rejected, (state, action) => {
        state.notification.notificationStatus = "pending";
        toast.error(action.error.message);
      })
      .addCase(fetchNotificationsAsync.fulfilled, (state, action) => {
        state.notification.notifications = action.payload.data;
        state.notification.notificationStatus = "success";
      })
      .addCase(fetchNotificationsAsync.rejected, (state, action) => {
        state.notification.notificationStatus = "error";
        toast.error(action.error.message);
      });
  },
});

export const {
  setNavModal,
  toggleNewPostModal,
  resetPostStatus,
  setActive,
  postPageStatusToggle,
  resetPostPageInfo,
  currentConversationStatusUpdate,
  updateCurrentConversation,
  recievedNewMessage,
  fetchConversations,
  selectExistingConversation,
  sendingMessageStatusUpdate,
  setPrimaryGeneralConvs,
  selectStoryFile,
  newNotificationRecieved,
  toggleIsNewNotification,
} = slice.actions;

const handleUpdateFollowingList = (postUser) => {
  return (dispatch) => {
    dispatch(authSlice.actions.updateFollowing(postUser));
  };
};

export default slice.reducer;
