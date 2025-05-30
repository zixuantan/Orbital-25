import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
	return (
		<div className="d-grid gap-2 d-md-flex justify-content-md-start">
			<Link to="/dashboard" className="btn btn-primary">
				Dashboard
			</Link>
			<Link to="/profile" className="btn btn-secondary">
				Profile
			</Link>
			<Link to="/groups" className="btn btn-info">
				Group Finder
			</Link>
			<Link to="/chat" className="btn btn-success">
				Group Chat
			</Link>
			<Link to="/study-room" className="btn btn-warning">
				Virtual Study Room
			</Link>
			<Link to="/stats" className="btn btn-dark">
				Stats
			</Link>
			<Link to="/settings" className="btn btn-light">
				Settings
			</Link>
			<a
				href="http://localhost:3000/"
				className="btn btn-outline-secondary"
				style={{ marginLeft: "8px" }}
			>
				Go to Landing
			</a>
		</div>
	);
};

export default Navbar;
