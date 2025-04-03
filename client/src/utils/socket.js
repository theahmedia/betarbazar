import { io } from "socket.io-client";

// Use environment variable for dynamic URL
const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || "https://betarbazar.com";

// Create a socket connection instance
export const socket = io(SOCKET_URL, {
  autoConnect: false, // Manually control connection
  transports: ["websocket", "polling"], // WebSocket fallback
  reconnectionAttempts: 5, // Number of reconnection attempts
  reconnectionDelay: 3000, // Delay between reconnection attempts
  withCredentials: true, // If you're using authentication
});

// Event listener for connection success
socket.on('connect', () => {
  console.log('Socket connected:', socket.id);
});

// Event listener for connection failure
socket.on('connect_error', (error) => {
  console.error('Socket connection error:', error);
});

// Event listener for disconnection
socket.on('disconnect', (reason) => {
  console.log('Socket disconnected:', reason);
});
