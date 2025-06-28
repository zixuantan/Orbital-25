import React from "react";
import "./LoginPage.css";

function LoginPage() {
	return (
		<div className="login-page">
			<div className="logo-header">
				<img src="logo.png" alt="logo" width="150" height="150" />
				<h1 id="website">StudyDucky</h1>
			</div>

			<p id="motiv">Kickstart your study journey now!</p>
			<button
				className="login-btn"
				onClick={() =>
					(window.location.href =
						`${process.env.REACT_APP_BACKEND_URL}/auth/google`)
				}
			>
				<img
					src="google-logo.png"
					alt="google"
					width="35"
					height="35"
				/>
				<span>Login with Google</span>
			</button>
		</div>
	);
}

export default LoginPage;
