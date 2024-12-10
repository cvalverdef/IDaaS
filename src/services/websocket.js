import { io } from "socket.io-client";

const SOCKET_URL = "wss://api.kyc-kyb.ws/stream";

const socket = io(SOCKET_URL, {
  transports: ["websocket"],
});

socket.on("connect", () => {
  console.info("WebSocket connected:", socket.id);
});

export default socket;
