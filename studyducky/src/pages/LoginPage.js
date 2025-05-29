import React from 'react';
import { Link } from 'react-router-dom';
import './LoginPage.css';

function LoginPage() {
	return (
		<div className="overall-page">
			<form className="login-section">
				<div className="details">
					<h1>Log In</h1>

					<label>Email</label>
					<input type="email"/>

					<label>Password</label>
					<input type="password"/>

					<button type="submit" className="login-btn">Log In</button>
				</div>
			</form>

			<div className="signup-section">
				<div className="group">

					<h2>New to StudyDucky?</h2>
					<p>Sign up now to kickstart your study journey!</p>
					<Link to="/Registration.js">
					<button className="signup-btn">Sign Up</button>
					</Link>

				</div>

			</div>
		</div>
	);
}

export default LoginPage;
