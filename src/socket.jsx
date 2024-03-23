import io from "socket.io-client";

const SOCKET_ENDPOINT = "https://instagram-backend-amir.vercel.app/";
// const SOCKET_ENDPOINT = "http://localhost:8000/";
let socket;

const connectSocket = (userId) => {
  socket = io(SOCKET_ENDPOINT, { query: `userId=${userId}`, transports: ["websocket"]});

  console.log("connection");

  return () => {
    socket.disconnect(userId);
  };
};

export { socket, connectSocket };
