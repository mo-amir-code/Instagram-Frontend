import io from "socket.io-client";

const SOCKET_ENDPOINT = import.meta.env.VITE_SOCKET_ORIGIN;
let socket;

const connectSocket = (userId) => {
  try {  
    socket = io(SOCKET_ENDPOINT, { query: `userId=${userId}`, transports: ["websocket", "polling"] });
    console.log("Socket connection: ", socket);
  } catch (error) {
    console.log(error)
  }

  return () => {
    socket.disconnect(userId);
  };
};

export { socket, connectSocket };
