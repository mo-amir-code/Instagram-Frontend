import io from "socket.io-client";

const SOCKET_ENDPOINT = "http://localhost:8000";
let socket;

const connectSocket = (userId) => {
  socket = io(SOCKET_ENDPOINT, {
    query: `userId=${userId}`,
  });

  return () => {
    socket.disconnect(userId);
  };
};

export { socket, connectSocket };
