import React, { useEffect, useState } from "react";
import axios from "axios";
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

function MainPage() {
	const [user, setUser] = useState(null);
	const [study, setStudyGroups] = useState([]);
	const [project, setProjectGroups] = useState([]);
	const [googleId, setGoogleId] = useState(null);
	const [dailyMinutes, setDailyMinutes] = useState(0);
	const [weeklyMinutes, setWeeklyMinutes] = useState([]);
	const [studyGoal, setStudyGoal] = useState(60);
	const [streak, setStreak] = useState(1);

	const weeklyData = {
		labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
		datasets: [
			{
				label: "Minutes",
				data: weeklyMinutes,
				backgroundColor: "#4abdac",
				borderRadius: 8,
			},
		],
	};
	const dailyData = {
		datasets: [
			{
				data: [
					Math.min(parseFloat(dailyMinutes), studyGoal),
					Math.max(studyGoal - parseFloat(dailyMinutes), 0),
				],
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
					setUser(data);
					setGoogleId(data.googleId);
					setStudyGoal(data.studyGoal || 60);
				}
			})
			.catch((err) => {
				console.error("Failed to get user info:", err);
			});
	}, []);

	useEffect(() => {
		if (!googleId) return;
		fetch(
			`${process.env.REACT_APP_BACKEND_URL}/api/user/${googleId}/groups`,
			{
				credentials: "include",
			}
		)
			.then((res) => res.json())
			.then((data) => {
				console.log("Fetched user groups:", data);
				setStudyGroups(data.studyGroups);
				setProjectGroups(data.projectGroups);
			});
	}, [googleId]);

	useEffect(() => {
		if (!googleId) return;

		fetch(
			`${process.env.REACT_APP_BACKEND_URL}/api/user/${googleId}/studystats`,
			{
				credentials: "include",
			}
		)
			.then((res) => res.json())
			.then((data) => {
				console.log("studystats response: ", data);

				const todaySec = data.today?.seconds || 0;
				setDailyMinutes((todaySec / 60).toFixed(1));

				setStreak(data.streak || 1);

				const history = data.history || {};
				console.log("History object from backend:", history);

				const now = new Date();
				const weekData = [];

				for (let i = 6; i >= 0; i--) {
					const d = new Date(now);
					d.setDate(now.getDate() - i);
					const key = d.toLocaleDateString("en-CA", {
						timeZone: "Asia/Singapore",
					});

					console.log(`Checking key ${key}: ${history[key]}`);

					const sec = history[key] || 0;
					weekData.push(Number((sec / 60).toFixed(1)));
				}

				console.log("Final weekly data (mins):", weekData);
				setWeeklyMinutes(weekData);
			})
			.catch((err) => {
				console.error("Failed to fetch study stats:", err);
			});
	}, [googleId]);

	return (
		<div className="overall-page">
			<Navbar />

			{user && (
				<p
					style={{
						fontSize: "20px",
						fontWeight: "bold",
						marginTop: "1rem",
						marginLeft: "1rem",
					}}
				>
					Welcome to your StudyDucky Dashboard, {user.name}!
				</p>
			)}

			<div className="stats">
				<h1 className="stats-header">Study Statistics</h1>

				<div className="records">
					<div className="graphs">
						<div className="daily">
							<p id="today">Today's Progress</p>
							<Doughnut data={dailyData} />
							<p
								style={{
									marginTop: "1rem",
									fontSize: "16px",
									fontWeight: "500",
								}}
							>
								Today's Goal: {studyGoal} minutes
							</p>
						</div>
						<div className="weekly">
							<p id="week">Weekly Study Hours</p>
							<Bar data={weeklyData} />
						</div>
					</div>

					<div className="streak">
						Current Streak: {streak} day{streak !== 1 ? "s" : ""}
					</div>
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
