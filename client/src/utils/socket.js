import { io } from "socket.io-client";

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || "http://localhost:5000";

export const socket = io(SOCKET_URL, {
  autoConnect: false,
  transports: ["websocket", "polling"], // Ensure WebSocket & polling fallback
  reconnectionAttempts: 5,
  reconnectionDelay: 3000,
  withCredentials: true, // If using authentication
});