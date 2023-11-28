export const handleStartChat = (actions, data) => {
  const {
    dispatch,
    currentConversationStatusUpdate,
    socket,
    updateCurrentConversation,
  } = actions;
  const { userId, loggedInUserId } = data;
  socket.emit("start-conversation", { userId, loggedInUserId }, (cbData) => {
    if (cbData.status === "success") {
      dispatch(updateCurrentConversation(cbData));
    } else {
      dispatch(currentConversationStatusUpdate("error"));
    }
  });
};
