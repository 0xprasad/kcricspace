import { io } from 'socket.io-client';

const SOCKET_URL = 'http://localhost:5000';

// Auto Connect is false by default so we can connect only when authenticated or needed
export const socket = io(SOCKET_URL, {
  autoConnect: false,
});
