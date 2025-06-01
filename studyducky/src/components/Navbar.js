import React from "react";
import { Link } from "react-router-dom";
import './Navbar.css';

const Navbar = () => {
	return (
		<div className="bar">
			<img id="bar-logo" src="logo.png" alt="logo"/>
			<div className="con-nav">
				<Link to="/main" className="nav-btn">
					Main
				</Link>
				<Link to="/profile" className="nav-btn">
					Profile
				</Link>
				<Link to="/groups" className="nav-btn">
					GroupFinder
				</Link>
				<Link to="/chat" className="nav-btn">
					Chats
				</Link>
				<Link to="/study-room" className="nav-btn">
					StudyRoom
				</Link>
				<Link to="/" className="landing-btn">
					Go to Landing
				</Link>
			</div>
			<Link
				to="/main"
				className="btn btn-outline-secondary"
				style={{ marginLeft: "8px" }}
			>
				Go to Main Page
			</Link>
		</div>
	);
};

export default Navbar;
