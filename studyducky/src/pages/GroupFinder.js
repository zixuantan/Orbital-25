import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";


function GroupFinder() {
	const location = useLocation();
	const groupType = location.state?.type || "study";

	const [user, setUser] = useState(null);
	const [groups, setGroups] = useState([]);
	const [availability, setAvailability] = useState({});
	const [joining, setJoining] = useState(null);

	useEffect(() => {
		// fetch current user
		axios
			.get("http://localhost:5050/me", {
				withCredentials: true,
			})
			.then((res) => setUser(res.data))
			.catch((err) => console.error("Error fetching user:", err));

		// fetch groups (groupfilter-style or fallback)
		axios
			.get(`http://localhost:5050/api/groups/by-type?type=${groupType}`, {
				withCredentials: true,
			})
			.then((res) => {
				console.log("Groups fetched from backend:", res.data);
				const responseGroups = res.data.group || res.data;
				const mappedGroups = Array.isArray(responseGroups[0])
					? responseGroups
					: responseGroups.map((g) => ({ group: g, score: null }));
				setGroups(mappedGroups);
			})
			.catch((err) => console.error("Error fetching groups:", err));
	}, [groupType]);

	const handleJoin = async (groupId) => {
		try {
			await axios.post(
				`http://localhost:5050/api/groups/${groupId}/join`,
				{
					userId: user._id,
					availability: availability[groupId] || "Not specified",
				},
				{ withCredentials: true }
			);
			alert("Joined group successfully!");
			setJoining(null);
		} catch (err) {
			console.error("Failed to join group:", err);
			alert("Failed to join group.");
		}
	};

	if (!user) return <p>Loading user info...</p>;

	return (
		<div className="App-header">
			<Navbar />
			<h2>Group Finder</h2>
			<p>Total groups found: {groups.length}</p>

			{groups.map(({ group, score }) => (
				<div key={group._id} className="card mb-3">
					<div className="card-body">
						<h5 className="card-title">{group.name}</h5>
						<p className="card-text">
							Type: {group.type} <br />
							Module: {group.module} <br />
							Members: {group.members.length} <br />
							{score !== null && <span>Score: {score}%</span>}
						</p>
						{joining === group._id ? (
							<>
								<input
									type="text"
									className="form-control mb-2"
									placeholder="Enter your availability"
									value={availability[group._id] || ""}
									onChange={(e) =>
										setAvailability((prev) => ({
											...prev,
											[group._id]: e.target.value,
										}))
									}
								/>
								<button
									className="btn btn-success"
									onClick={() => handleJoin(group._id)}
								>
									Confirm Join
								</button>
							</>
						) : (
							<button
								className="btn btn-primary"
								onClick={() => setJoining(group._id)}
							>
								Join Group
							</button>
						)}
					</div>
				</div>
			))}
		</div>
	);
}

export default GroupFinder;
