import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import "./GroupFinder.css";

function GroupFinder() {
	const location = useLocation();
	const { type, filterData, module, preferences } = location.state || {};
	const navigate = useNavigate();
	const [user, setUser] = useState(null);
	const [groups, setGroups] = useState([]);
	const [joining, setJoining] = useState(null);

	useEffect(() => {
		if (!filterData) {
			console.warn("Data not passed from groupFilter");
		} else {
			console.log("Received filtered groups:", filterData);
		}
	}, [filterData]);

	useEffect(() => {
		setGroups(filterData);
	}, [filterData]);

	useEffect(() => {
		// fetch current user
		axios
			.get("http://localhost:5050/me", {
				withCredentials: true,
			})
			.then((res) => setUser(res.data))
			.catch((err) => console.error("Error fetching user:", err));
	});

	const handleJoin = async (groupId, type) => {
		try {
			const res = await fetch(
				`http://localhost:5050/api/joingroup/${groupId}`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					credentials: "include",
					body: JSON.stringify({ groupId, type }),
				}
			);
			const data = await res.json();
			console.log("Join result:", data);
			navigate(`/chat/${groupId}`);
		} catch (err) {
			console.error("Join failed:", err);
		}
	};

	if (!user) return <p>Loading user info...</p>;

	return (
		<div className="overall-finder">
			<Navbar />
			<h1 id="finder-header">GroupFinder</h1>
			<p className="group-info">Total groups found: {groups.length}</p>

			<div className="create-group">
				<h2 className="create-header">
					No Groups to join? Create a new {type.charAt(0).toUpperCase() + type.slice(1)}{" "} Group now!
				</h2>
				<button
					className="create-btn"
					onClick={() =>
						navigate("/create-group", {
							state: {
								type: type,
								module: module,
								preferences: preferences,
							},
						})
					}
				>
					Create Group
				</button>
			</div>

			{groups.map(({ group, score }) => (
				<div key={group._id} className="group-options">
					<h3 id="group-name">{group.name}</h3>

					<div className="group-details">

						<div className="group-pref">
							<p className="pref">Module: {group.module} </p>
							<p className="pref">Members: {group.members.length} </p>
							{group.type === "study" ? (
								<div>
									<p className="pref">Call Purpose: {group.calls}</p>
									<p className="pref">Time Preference: {group.when}</p>
									<p className="pref">Group Size: {group.groupSize}</p>
									<p className="pref">Note Sharing: {group.notes}</p>
									<p className="pref">Virtual Study Room Commitment: {group.VSR}</p>
									<p className="pref">Preferred Duration: {group.duration}</p>
								</div>
							) : group.type === "project" ? (
								<div>
									<p className="pref">Tutorial Slot: {group.tutorial}</p>
									<p className="pref">Commitment Level: {group.commitment}</p>
									<p className="pref">Meeting Time: {group.meeting}</p>
									<p className="pref">Work Pace: {group.pace}</p>
									<p className="pref">Work Slots: {group.workSlots?.join(
										", "
									)}{" "}
									</p>
								</div>
							) : null}
						</div>

						<div className="details-right">

							<div className="comp-score" style={{ '--score': score }}>
								{score !== null && <span id="score">Score: {score}%</span>}
							</div>

							{joining === group._id ? (
								<div>
									<button
										className="join-btn"
										onClick={() => handleJoin(group._id, type)}
									>
										Confirm Join
									</button>
								</div>
							) : (
								<div>
									<button
										className="join-btn"
										onClick={() => setJoining(group._id)}
									>
										Join Group
									</button>
								</div>
							)}
						</div>
					</div>
				</div>
			))}
		</div>
	);
}

export default GroupFinder;
