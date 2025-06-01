import React, { useState } from "react";
import { Container, Form, Button, ListGroup } from "react-bootstrap";
import Navbar from "../components/Navbar";

const GroupChat = () => {
	const [messages, setMessages] = useState([]);

	const handleSendMessage = (event) => {
		event.preventDefault();
		const newMessage = event.target.elements.message.value;
		setMessages([...messages, newMessage]);
		event.target.reset();
	};

	return (
		<Container fluid className="App-header">
			<Navbar />
			<h2>Group Chat</h2>
			<ListGroup className="mb-3">
				{messages.map((msg, index) => (
					<ListGroup.Item key={index}>{msg}</ListGroup.Item>
				))}
			</ListGroup>
			<Form onSubmit={handleSendMessage}>
				<Form.Control
					type="text"
					name="message"
					placeholder="Type a message"
				/>
				<Button variant="success" type="submit" className="mt-2">
					Send
				</Button>
			</Form>
		</Container>
	);
};

export default GroupChat;
