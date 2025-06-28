import React, { useEffect, useState } from "react";
import "./MainPage.css";
import { Bar } from "react-chartjs-2";
import { Doughnut } from "react-chartjs-2";
import { ArcElement } from "chart.js";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Tooltip,
	Legend,
} from "chart.js";
import { Link } from "react-router-dom";
import Chats from "../components/Chats";
import Navbar from "../components/Navbar";

ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	Tooltip,
	Legend,
	ArcElement
);

const week = [2.0, 3.0, 1.5, 4.0, 2.5, 4.5, 3.0];
const day = 3;

function MainPage() {
	const [study, setStudyGroups] = useState([]);
	const [project, setProjectGroups] = useState([]);
	const [googleId, setGoogleId] = useState(null);
	const weeklyData = {
		labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
		datasets: [
			{
				label: "Hours",
				data: week,
				backgroundColor: "#4abdac",
				borderRadius: 8,
			},
		],
	};
	const dailyData = {
		datasets: [
			{
				data: [day, 24 - day],
				backgroundColor: ["#4abdac", "#fff"],
				borderWidth: 0,
			},
		],
	};

	useEffect(() => {
		fetch(`${process.env.REACT_APP_BACKEND_URL}/me`, {
			credentials: "include",
		})
			.then((res) => res.json())
			.then((data) => {
				if (data.googleId) {
					setGoogleId(data.googleId);
				}
			})
			.catch((err) => {
				console.error("Failed to get user info:", err);
			});
	}, []);

	useEffect(() => {
		if (!googleId) return;
		fetch(`${process.env.REACT_APP_BACKEND_URL}/api/user/${googleId}/groups`, {
			credentials: "include",
		})
			.then((res) => res.json())
			.then((data) => {
				console.log("Fetched user groups:", data);
				setStudyGroups(data.studyGroups);
				setProjectGroups(data.projectGroups);
			});
	}, [googleId]);
	return (
		<div className="overall-page">
			<Navbar />

			<div className="stats">
				<h1>Study Statistics</h1>

				<div className="daily">
					<p id="today">Today's Progress</p>
					<Doughnut data={dailyData} />
				</div>
				<div className="weekly">
					<p id="week">Weekly Study Hours</p>
					<Bar data={weeklyData} />
				</div>
			</div>

			<div className="chats">
				<div className="header">
					<h2>Group Chats</h2>

					<div className="finder">
						<span>Want to find more flocks to join?</span>
						<Link to="/filter">
							<button className="finder-btn">GroupFinder</button>
						</Link>
					</div>
				</div>

				<Chats title="Study Groups" groups={study} />

				<div className="project-groups">
					<Chats title="Project Groups" groups={project} />
				</div>
			</div>
		</div>
	);
}

export default MainPage;
