import React from "react";
import { Container, Badge } from "react-bootstrap";
import Navbar from "../components/Navbar";

const VirtualStudyRoom = () => {
	return (
		<Container className="App-header">
			<Navbar />
			<div style={{ textAlign: "center", marginTop: "2rem" }}>
				<h2>Virtual Study Room</h2>
				<p>Study with your peers without the need for a video call.</p>
				<Badge bg="info">Live</Badge>
			</div>
		</Container>
	);
};

export default VirtualStudyRoom;
