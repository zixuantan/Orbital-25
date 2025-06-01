import React, { useEffect, useState } from "react";
import axios from "axios";
import './Dashboard.css';
import Navbar from "../components/Navbar";

const Dashboard = () => {
	const [user, setUser] = useState(null);

	useEffect(() => {
		axios
			.get("http://localhost:5050/me", { withCredentials: true })
			.then((res) => setUser(res.data))
			.catch((err) => console.error("Failed to fetch user:", err));
	}, []);

	if (!user) return <p className="welc">Loading...</p>

	return (
		<div className="dash-page">
			<Navbar />
			<h2 id="dashboard">Dashboard</h2>
			<p className="welc">Welcome to your StudyDucky dashboard, {user.name}!</p>
		</div>
	);
};

export default Dashboard;
