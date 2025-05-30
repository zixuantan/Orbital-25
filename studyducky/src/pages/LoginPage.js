import React from 'react';
import './LoginPage.css';

function LoginPage() {
	return (
		<div className="login-page">
			<div className="logo-header">

				<img src="logo.png" alt="logo" width="150" height="150"/>
				<h1 id="website">StudyDucky</h1>

			</div>

			<p id="motiv">Kickstart your study journey now!</p>
			<button className="login-btn" 
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
