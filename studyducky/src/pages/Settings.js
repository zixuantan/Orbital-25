import React from "react";
import { Container, Form, Button } from "react-bootstrap";

const Settings = () => {
	return (
		<Container className="mt-4">
			<h2>Settings</h2>
			<Form>
				<Form.Group className="mb-3">
					<Form.Label>Notification Preferences</Form.Label>
					<Form.Check type="checkbox" label="Email Notifications" />
					<Form.Check type="checkbox" label="Push Notifications" />
				</Form.Group>
				<Button variant="primary">Save Changes</Button>
			</Form>
		</Container>
	);
};

export default Settings;
