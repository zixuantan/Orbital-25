import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";

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
					Create a New {type.charAt(0).toUpperCase() + type.slice(1)}{" "}
					Group
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
					<div className="each-group">
						<h3 className="group-name">{group.name}</h3>
						<p className="group-details">
							Type: {group.type} <br />
							Module: {group.module} <br />
							Members: {group.members.length} <br />
							{group.type === "study" ? (
								<div>
									Calls: {group.calls} <br />
									When: {group.when} <br />
									Group Size: {group.groupSize} <br />
									Notes: {group.notes} <br />
									VSR Commitment: {group.VSR} <br />
									Preferred Duration: {group.duration} <br />
								</div>
							) : group.type === "project" ? (
								<div>
									Tutorial: {group.tutorial} <br />
									Commitment Level: {group.commitment} <br />
									Meeting Time: {group.meeting} <br />
									Work Pace: {group.pace} <br />
									Work Slots: {group.workSlots?.join(
										", "
									)}{" "}
									<br />
								</div>
							) : null}
							{score !== null && <span>Score: {score}%</span>}
						</p>
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
			))}
		</div>
	);
}

export default GroupFinder;
