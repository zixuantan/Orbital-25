import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import axios from "axios";
import Navbar from "../components/Navbar";

const Dashboard = () => {
	const [user, setUser] = useState(null);

	useEffect(() => {
		axios
			.get("http://localhost:5050/me", { withCredentials: true })
			.then((res) => setUser(res.data))
			.catch((err) => console.error("Failed to fetch user:", err));
	}, []);

	if (!user) return <p>Loading...</p>;

	return (
		<Container className="mt-4">
			<Navbar />
			<h2>Dashboard</h2>
			<p>Welcome to your StudyDucky dashboard, {user.name}!</p>
		</Container>
	);
};

export default Dashboard;
