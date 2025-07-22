import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import './Navbar.css';

const Navbar = () => {
	const navigate = useNavigate();
	const handleLogout = async () => {
        try {
            await fetch(`${process.env.REACT_APP_BACKEND_URL}/auth/logout`, {
                method: "GET",
                credentials: "include", 
            });
            navigate("/"); 
        } catch (err) {
            console.error("Logout failed:", err);
        }
	}

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
				<Link to="/filter" className="nav-btn">
					GroupFinder
				</Link>
				<button className="landing-btn" onClick={handleLogout}>
					Logout
				</button>
			</div>
		</div>
	);
};

export default Navbar;
