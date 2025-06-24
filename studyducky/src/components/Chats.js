import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Chats.css";

const Chats = ({ title, groups = [] }) => {
	const [isOpen, setIsOpen] = useState(false);
	const navigate = useNavigate();

	return (
		<div className="groups">
			<div className="group-type" onClick={() => setIsOpen(!isOpen)}>
				<p id="title">{title}</p>
				<span className="extend">{isOpen ? "▴" : "▾"}</span>
			</div>

			{isOpen && (
				<ul className="group-list">
					{groups.map((group, index) => (
						<li
							key={index}
							className="chat"
							onClick={() => navigate(`/chat/${group._id}`)}
						>
							{group.name}
							<span className="arrow">›</span>
						</li>
					))}
				</ul>
			)}
		</div>
	);
};

export default Chats;
