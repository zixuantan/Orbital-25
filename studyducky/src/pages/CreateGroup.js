import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";

function CreateGroup() {
	const location = useLocation();
	const groupType = location.state?.type || "";
	const preselectedModule = location.state?.module || "";
	const preferences = location.state?.preferences || {};

	const [groupName, setGroupName] = useState("");
	const [module, setModule] = useState(preselectedModule);
	const [user, setUser] = useState(null);
	const navigate = useNavigate();

	useEffect(() => {
		axios
			.get("http://localhost:5050/me", { withCredentials: true })
			.then((res) => setUser(res.data))
			.catch((err) => console.error("Error fetching user:", err));
	}, []);

	const handleCreate = async (e) => {
		e.preventDefault();
		if (!groupName || !module) {
			alert("Please fill all fields");
			return;
		}

		const cleanedPreferences = Object.fromEntries(
			Object.entries(preferences).filter(([_, v]) => v !== "")
		);

		try {
			await axios.post(
				"http://localhost:5050/api/groups",
				{
					name: groupName,
					type: groupType,
					module: module,
					creatorId: user._id,
					...cleanedPreferences,
				},
				{ withCredentials: true }
			);
			alert("Group created successfully!");
			navigate("/main", { state: { type: groupType } });
		} catch (err) {
			console.error("Failed to create group:", err);
			alert("Error creating group");
		}
	};

	if (!user) return <p>Loading user info...</p>;

	return (
		<div className="App-header">
			<Navbar />
			<h2>
				Create a {groupType === "study" ? "Study" : "Project"} Group
			</h2>
			<form onSubmit={handleCreate}>
				<input
					type="text"
					placeholder="Group Name"
					className="form-control my-2"
					value={groupName}
					onChange={(e) => setGroupName(e.target.value)}
				/>
				<input
					type="text"
					className="form-control my-2"
					value={module}
					readOnly
				/>
				<button type="submit" className="btn btn-success">
					Create Group
				</button>
			</form>
		</div>
	);
}

export default CreateGroup;
