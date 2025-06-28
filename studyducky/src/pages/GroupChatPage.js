import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import GroupChat from "../components/GroupChat.js";
import "./GroupChatPage.css";

function GroupChatPage() {
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
		fetch(`${process.env.REACT_APP_BACKEND_URL}/api/group/${groupId}`)
			.then((res) => res.json())
			.then((data) => {
				console.log("Fetched group data:", data);
				setGroup(data.group);
				setMessages(data.messages);
			})
			.catch((err) => {
				console.error("Error fetching group:", err);
			});
	}, [groupId]);

	return (
		<div className="chat-page">
			<div className="chat-top">

				<Link to="/main" className="backmain-btn">⮜</Link>
				{group ? (
					<div className="group-stuff">
						<h1 className="group-name">{group.name}</h1>
						<Link to={`/files/${group.folderId}`} className="files-btn">Files</Link>
					</div>
				) : (
					<p>Loading chat...</p>
				)}
				

			</div>
			{group && (
			<GroupChat groupId={groupId} groupType={group.type} />
			)}
	
		</div>
	);
}

export default GroupChatPage;
