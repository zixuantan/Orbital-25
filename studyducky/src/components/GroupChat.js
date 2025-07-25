import React, { useEffect, useState } from "react";
import socket from "../socket";
import axios from "axios";
import "./GroupChat.css";

const GroupChat = ({ groupId, groupType }) => {
	const [messages, setMessages] = useState([]);
	const [input, setInput] = useState("");
	const [currentUserId, setCurrentUserId] = useState(null);
	const [group, setGroup] = useState(null);

	// fetch current user for displayname
	useEffect(() => {
		axios
			.get(`${process.env.REACT_APP_BACKEND_URL}/me`, { withCredentials: true })
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
			.get(`${process.env.REACT_APP_BACKEND_URL}/api/message/${groupType}/${groupId}`, {
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

	useEffect(() => {
			console.log("Fetching group with ID:", groupId);
			fetch(`${process.env.REACT_APP_BACKEND_URL}/api/group/${groupId}`)
				.then((res) => res.json())
				.then((data) => {
					console.log("Fetched group data:", data);
					setGroup(data.group);
				})
				.catch((err) => {
					console.error("Error fetching group:", err);
				});
		}, [groupId]);

	// send message
	const sendMessage = async () => {
		const userRes = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/me`, {
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
			`Sending POST to ${process.env.REACT_APP_BACKEND_URL}/api/message with payload:`,
			message
		);

		// send to socket
		socket.emit("sendMessage", message);
		// save to db
		await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/message`, message);
		setInput("");
	};

	return (
		<div className="chat-component">
			<div className="msg-box">
				{messages.map((m, i) => (
					<p className="message" key={i}>
						<b className="user">
							{m.sender?._id === currentUserId
								? "You"
								: m.sender?.name || "Unknown"}
							:
						</b>{" "}
						{m.content}
					</p>
				))}
			</div>
			<div className="msg-part">
				<input
					value={input}
					onChange={(e) => setInput(e.target.value)}
					placeholder="Type your message"
					className="msg-input"
				/>
				<button onClick={sendMessage} className="send-msg-btn">➣</button>

			</div>
		</div>
	);
};

export default GroupChat;
