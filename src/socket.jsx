import io from "socket.io-client";

const SOCKET_ENDPOINT = import.meta.env.VITE_SERVER_ORIGIN;
let socket;

const connectSocket = (userId) => {
  socket = io(SOCKET_ENDPOINT, { query: `userId=${userId}` })
    .then(() => console.log("connection"))
    .catch((error) => console.log(error));

  return () => {
    socket.disconnect(userId);
  };
};

export { socket, connectSocket };
