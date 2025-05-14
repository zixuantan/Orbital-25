import React from "react";
import { Button, Container } from "react-bootstrap";

const LandingPage = () => {
	return (
		<Container className="text-center mt-5">
			<h1 className="display-4">Welcome to StudyDucky</h1>
			<p>Connect, study, and succeed together!</p>
			<Button variant="success" href="/login">
				Get Started
			</Button>
		</Container>
	);
};

export default LandingPage;
