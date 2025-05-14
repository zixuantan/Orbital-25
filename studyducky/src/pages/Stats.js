import React from "react";
import { Container, ProgressBar } from "react-bootstrap";

const Stats = () => {
	return (
		<Container className="mt-4">
			<h2>Study Statistics</h2>
			<p>Track your progress and earn badges.</p>
			<ProgressBar now={60} label="60% Study Goal" />
		</Container>
	);
};

export default Stats;
