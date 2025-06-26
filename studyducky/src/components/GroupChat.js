import React, { useEffect, useState } from "react";
import socket from "../socket";
import axios from "axios";

const GroupChat = ({ groupId, groupType }) => {
	const [messages, setMessages] = useState([]);
	const [input, setInput] = useState("");
	const [currentUserId, setCurrentUserId] = useState(null);

	// fetch current user for displayname
	useEffect(() => {
		axios
			.get("http://localhost:5050/me", { withCredentials: true })
			.then((res) => setCurrentUserId(res.data._id))
			.catch((err) => console.error("Failed to get current user:", err));
	}, []);

	// fetch messages and join socket room
	useEffect(() => {
		if (!groupId || !groupType) return;

		console.log(
			`Fetching messages from /api/message/${groupType}/${groupId}`
		);

		socket.emit("joinRoom", { groupId });

		// fetch chat history from backend
		axios
			.get(`http://localhost:5050/api/message/${groupType}/${groupId}`, {
				withCredentials: true,
			})
			.then((res) => setMessages(res.data))
			.catch((err) => console.error("Error loading messages:", err));

		socket.on("receiveMessage", (msg) => {
			setMessages((prev) => [...prev, msg]);
		});

		return () => {
			socket.off("receiveMessage");
		};
	}, [groupId, groupType]);

	// send message
	const sendMessage = async () => {
		const userRes = await axios.get("http://localhost:5050/me", {
			withCredentials: true,
		});
		const senderId = userRes.data._id;
		const senderName = userRes.data.name;

		const message = {
			groupId,
			groupType,
			senderId,
			content: input,
			sender: { _id: senderId, name: senderName },
		};

		console.log(
			"Sending POST to http://localhost:5050/api/message with payload:",
			message
		);

		// send to socket
		socket.emit("sendMessage", message);
		// save to db
		await axios.post("http://localhost:5050/api/message", message);
		setInput("");
	};

	return (
		<div>
			<h2>Group Chat</h2>
			<div style={{ height: "300px", overflowY: "scroll" }}>
				{messages.map((m, i) => (
					<p key={i}>
						<b>
							{m.sender?._id === currentUserId
								? "You"
								: m.sender?.name || "Unknown"}
							:
						</b>{" "}
						{m.content}
					</p>
				))}
			</div>
			<input
				value={input}
				onChange={(e) => setInput(e.target.value)}
				placeholder="Type your message"
			/>
			<button onClick={sendMessage}>Send</button>
		</div>
	);
};

export default GroupChat;
