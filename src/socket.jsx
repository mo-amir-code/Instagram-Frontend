import io from "socket.io-client";

const SOCKET_ENDPOINT = import.meta.env.VITE_SERVER_ORIGIN;

let socket;

const connectSocket = (userId) => {
  socket = io(SOCKET_ENDPOINT, { query: `userId=${userId}` });

  console.log("connection");

  return () => {
    socket.disconnect(userId);
  };
};

export { socket, connectSocket };