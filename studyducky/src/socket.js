import { io } from "socket.io-client";

const socket = io("http://localhost:5050", {
	withCredentials: true,
});

export default socket;
