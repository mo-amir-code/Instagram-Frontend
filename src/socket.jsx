import io from "socket.io-client";

const SOCKET_ENDPOINT = "https://instagram-backend-w2k6.onrender.com/";
let socket;

const connectSocket = (userId) => {
  socket = io(SOCKET_ENDPOINT, {query: `userId=${userId}`,
  });

  console.log("connection");

  return () => {
    socket.disconnect(userId);
  };
};

export { socket, connectSocket };
