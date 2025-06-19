import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";

function GroupFinder() {
	const location = useLocation();

	const [module, setModule] = useState(location.state?.module || "");
	const [preferences, setPreferences] = useState(
		location.state?.preferences || {}
	);
	const groupType = location.state?.type || "study";

	const navigate = useNavigate();
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

		// fetch matched groups with score
		if (!module || !groupType) return;

		axios
			.post(
				"http://localhost:5050/api/groupfilter",
				{
					type: groupType,
					module: module,
					...preferences, 
				},
				{ withCredentials: true }
			)
			.then((res) => {
				console.log("Matched groups with score:", res.data);
				const responseGroups = res.data.group || [];
				setGroups(responseGroups); 
			})
			.catch((err) =>
				console.error("Error fetching matched groups:", err)
			);
	}, [groupType, module, preferences]);

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

			<div className="mb-4">
				<h4>
					Create a New{" "}
					{groupType.charAt(0).toUpperCase() + groupType.slice(1)}{" "}
					Group
				</h4>
				<button
					className="btn btn-outline-primary"
					onClick={() =>
						navigate("/create-group", {
							state: {
								type: groupType,
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
				<div key={group._id} className="card mb-3">
					<div className="card-body">
						<h5 className="card-title">{group.name}</h5>
						<p className="card-text">
							Type: {group.type} <br />
							Module: {group.module} <br />
							Members: {group.members.length} <br />
							{group.type === "study" ? (
								<>
									Calls: {group.calls} <br />
									When: {group.when} <br />
									Group Size: {group.groupSize} <br />
									Notes: {group.notes} <br />
									VSR Commitment: {group.VSR} <br />
									Preferred Duration: {group.duration} <br />
								</>
							) : group.type === "project" ? (
								<>
									Tutorial: {group.tutorial} <br />
									Commitment Level: {group.commitment} <br />
									Meeting Time: {group.meeting} <br />
									Work Pace: {group.pace} <br />
									Work Slots: {group.workSlots?.join(
										", "
									)}{" "}
									<br />
								</>
							) : null}
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
