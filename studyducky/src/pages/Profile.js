import React from "react";
import { Container, Card } from "react-bootstrap";

const Profile = () => {
	return (
		<Container className="mt-4">
			<Card>
				<Card.Body>
					<h3>User Profile</h3>
					<p>Name: John Doe</p>
					<p>Email: john.doe@example.com</p>
				</Card.Body>
			</Card>
		</Container>
	);
};

export default Profile;
