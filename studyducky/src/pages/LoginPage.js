import React from 'react';
import "./LoginPage.css";

function LoginPage() {
	return (
		<div className="overall-page">
			<div className="header">

				<img src="logo.png" alt="logo" width="150" height="150"/>
				<h1>StudyDucky</h1>

			</div>

			<p>Kickstart your study journey now!</p>
			<button 
				onClick={() =>
					(window.location.href =
						"http://localhost:5050/auth/google")
					}
			>
				Login with Google
			</button>
		</div>
	);
}

export default LoginPage;
