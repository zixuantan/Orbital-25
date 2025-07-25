import React from "react";
import { Link } from 'react-router-dom';
import './LandingPage.css';

function LandingPage() {
	return (
		<div className="landing">
			<div className="top-bar">

				<img id="logo-img" src="logo.png" alt="logo"/>
				<Link to="/login" className="link">
				<button className="land-login">Log In</button>
				</Link>

			</div>
			<div className="intro">

				<h1 id="web-name">StudyDucky</h1>
				<p id="slogan">Quack your way to better grades — find course mates, 
					stay accountable, and study together in your virtual study room!</p>
				<Link to="/login" className="link">
				<button className="start-btn">Get Started</button>
				</Link>
			</div>
		</div>
	);
};

export default LandingPage;
