import React, { useState, useEffect } from "react";
import Select from "react-select";
import axios from "axios";
import "./Profile.css";
import Navbar from "../components/Navbar";

const modsOption = [
	{ value: "BT2102", label: "BT2102" },
	{ value: "IS1108", label: "IS1108" },
	{ value: "IS2101", label: "IS2101" },
	{ value: "CS2030", label: "CS2030" },
	{ value: "MA1521", label: "MA1521" },
];

function Profile() {
	const [name, setName] = useState("");
	const [year, setYear] = useState("");
	const [major, setMajor] = useState("");
	const [selectedMods, setSelectedMods] = useState([]);
	const [isEditing, setIsEditing] = useState(false);
	const [studyGoal, setStudyGoal] = useState("60");

	useEffect(() => {
		axios
			.get(`${process.env.REACT_APP_BACKEND_URL}/me`, {
				withCredentials: true,
			})
			.then((res) => {
				const user = res.data;
				setName(user.name);
				setYear(user.year || "");
				setMajor(user.major || "");
				setStudyGoal(user.studyGoal || 60);
				setSelectedMods(
					(user.modulesTaken || []).map((mod) => ({
						value: mod,
						label: mod,
					}))
				);
			})
			.catch((err) => {
				console.error("Failed to fetch user data:", err);
			});
	}, []);

	const handleSave = async (e) => {
		e.preventDefault();

		if (!studyGoal || isNaN(studyGoal) || Number(studyGoal) < 1) {
			alert("Please enter a valid study goal (minimum 1 minute)");
			return;
		}

		console.log("Save button clicked");
		console.log("Payload:", {
			year,
			major,
			modulesTaken: selectedMods.map((mod) => mod.value),
		});

		try {
			await axios.put(
				`${process.env.REACT_APP_BACKEND_URL}/api/update-profile`,
				{
					year,
					major,
					modulesTaken: selectedMods.map((mod) => mod.value),
					studyGoal: Number(studyGoal),
				},
				{ withCredentials: true }
			);
			alert("Profile updated!");
			setIsEditing(false);
		} catch (err) {
			console.error(
				"Error updating profile:",
				err.response?.data || err.message
			);
		}
	};

	return (
		<div className="profile-page">
			<Navbar />
			<div className="overall-container">
				<div className="profile-side">
					<h1>Profile</h1>
					<div className="details">
						<div className="prof">
							<img
								src="profilepic.png"
								alt="profile"
								width="185"
								height="185"
							/>
							<p>{name}</p>
						</div>
						<p id="about">About</p>

						<p id="desc">
							Just a motivated duck trying to stay afloat in the
							sea of deadlines. 🐣 Lover of matcha, late-night
							cramming, and productive silence.
						</p>
					</div>
					<p id="badge">Badges</p>
					<div className="badge-section">
						<div className="first">
							<img
								src="firstbadge.png"
								alt="Just Getting Started"
								width="100"
								height="100"
							/>
							<p id="first-title">Just Getting Started</p>
							<p id="first-desc">Join the Flock</p>
						</div>
						<div className="second">
							<img
								src="lockbadge.png"
								alt="Lock In"
								width="100"
								height="100"
							/>
							<p id="second-title">Lock In</p>
							<p id="second-desc">
								Study more than an hour consecutively
							</p>
						</div>
					</div>
				</div>

				<div className="account-side">
					<form className="form-container" onSubmit={handleSave}>
						<label>Name</label>
						<input type="text" value={name} readOnly />

						<label>Year</label>
						<select
							required
							value={year}
							onChange={(e) => setYear(e.target.value)}
							disabled={!isEditing}
						>
							<option value="">Select</option>
							<option>1</option>
							<option>2</option>
							<option>3</option>
							<option>4</option>
						</select>

						<label>Major</label>
						<select
							required
							value={major}
							onChange={(e) => setMajor(e.target.value)}
							disabled={!isEditing}
						>
							<option value="">Select</option>
							<option>Architecture</option>
							<option>Business Administration</option>
							<option>Business Analytics</option>
							<option>
								Business Artificial Intelligence Systems
							</option>
							<option>Computer Science</option>
						</select>

						<label>Modules taken this semester</label>
						<Select
							isMulti
							options={modsOption}
							value={selectedMods}
							onChange={setSelectedMods}
							isDisabled={!isEditing}
							className="module-select"
						/>

						<label>Daily Study Goal (minutes)</label>
						<input
							type="number"
							min={1}
							value={studyGoal}
							onChange={(e) => {
								const val = e.target.value;
								setStudyGoal(val);
							}}
							disabled={!isEditing}
						/>

						{isEditing ? (
							<button type="submit" className="edit-btn">
								Save
							</button>
						) : (
							<button
								type="button"
								className="edit-btn"
								onClick={(e) => {
									e.preventDefault();
									setIsEditing(true);
								}}
							>
								Edit
							</button>
						)}
					</form>
				</div>
			</div>
		</div>
	);
}

export default Profile;
