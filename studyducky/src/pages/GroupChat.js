import React, { useState, useEffect } from "react";
import { Form, ListGroup } from "react-bootstrap";
import Navbar from "../components/Navbar";
import { useParams } from 'react-router-dom';

function GroupChat() {
	const { groupId } = useParams();
  	const [group, setGroup] = useState(null);
	const [messages, setMessages] = useState([]);

	const handleSendMessage = (event) => {
		event.preventDefault();
		const newMessage = event.target.elements.message.value;
		setMessages([...messages, newMessage]);
		event.target.reset();
	};

	useEffect(() => {
		console.log("Fetching group with ID:", groupId);
    	fetch(`http://localhost:5050/api/group/${groupId}`)
      	.then((res) => res.json())
      	.then((data) => {
			console.log("Fetched group data:", data);
			setGroup(data.group);
        	setMessages(data.messages);
      	}) //;
		.catch((err) => {
      		console.error("Error fetching group:", err);
    	});
  	}, [groupId]);

	return (
		<div className="chat-page">
			<Navbar />
			<h1 className="group-name">Group Chat: {group?.name}</h1>
			<ListGroup className="mb-3">
				{messages.map((msg, index) => (
					<ListGroup.Item key={index}>{msg}</ListGroup.Item>
				))}
			</ListGroup>
			<form onSubmit={handleSendMessage}>
				<Form.Control
					type="text"
					name="message"
					placeholder="Type a message"
				/>
				<button variant="success" type="submit" className="msg-btn">
					Send
				</button>
			</form>
		</div>
	);
};

export default GroupChat;
