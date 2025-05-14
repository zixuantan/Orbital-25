import React from "react";
import { Container, Badge } from "react-bootstrap";

const VirtualStudyRoom = () => {
	return (
		<Container className="mt-4 text-center">
			<h2>Virtual Study Room</h2>
			<p>Study with your peers without the need for a video call.</p>
			<Badge bg="info">Live</Badge>
		</Container>
	);
};

export default VirtualStudyRoom;
