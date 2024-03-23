import io from "socket.io-client";

const SOCKET_ENDPOINT = "https://instagram-fullstack-amir.vercel.app/";
// const SOCKET_ENDPOINT = "http://localhost:8000/";
let socket;

const connectSocket = (userId) => {
  socket = io(SOCKET_ENDPOINT, { query: `userId=${userId}` });

  console.log("connection");

  return () => {
    socket.disconnect(userId);
  };
};

export { socket, connectSocket };
