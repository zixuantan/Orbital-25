import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import "./CreateGroup.css";

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
			.get(`${process.env.REACT_APP_BACKEND_URL}/me`, { withCredentials: true })
			.then((res) => setUser(res.data))
			.catch((err) => console.error("Error fetching user:", err));
	}, []);

	const handleCreate = async (e) => {
		console.log("🚀 handleCreate triggered");
		e.preventDefault();
		if (!groupName || !module) {
			alert("Please fill all fields");
			return;
		}

		const cleanedPreferences = Object.fromEntries(
			Object.entries(preferences).filter(([_, v]) => v !== "")
		);

		try {
		
			const folderRes = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/drive/create-folder`,
			{ groupName },
			{ withCredentials: true }
			);
			console.log("Folder creation response:", folderRes.data);

			const folderId = folderRes.data.folderId;
			console.log("Folder ID:", folderId);
			console.log("📁 folderId being sent to /api/groups:", folderId);

			await axios.post(
				`${process.env.REACT_APP_BACKEND_URL}/api/groups`,
				{
					name: groupName,
					type: groupType,
					module: module,
					creatorId: user._id,
					folderId,
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
		<div className="create-page">
			<Navbar />
			<h1 id="createpg-header">Create a {groupType === "study" ? "Study" : "Project"} Group</h1>
			<p id="fill-in">Fill in the following details.</p>
			<form className="form-group" onSubmit={handleCreate}>

				<label>What would you like to name this group?</label>
				<input
					type="text"
					className="creation-details"
					value={groupName}
					onChange={(e) => setGroupName(e.target.value)}
				/>

				<label>Which module is it for?</label>
				<input
					type="text"
					className="creation-details"
					value={module}
					readOnly
				/>
				<button type="submit" className="create-btn">
					Create Group
				</button>
			</form>
		</div>
	);
}

export default CreateGroup;
