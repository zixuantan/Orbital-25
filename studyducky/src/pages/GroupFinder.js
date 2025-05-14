import React from "react";
import { Container, Card, Button } from "react-bootstrap";

const GroupFinder = () => {
	return (
		<Container className="mt-4">
			<h2>Find Study Groups</h2>
			<Card className="mt-3">
				<Card.Body>
					<h5>Suggested Groups</h5>
					<p>
						Find the best fit study groups based on your courses and
						schedule.
					</p>
					<Button variant="primary">Join Group</Button>
				</Card.Body>
			</Card>
		</Container>
	);
};

export default GroupFinder;
