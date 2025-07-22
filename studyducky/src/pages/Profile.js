import React, { useState, useEffect } from "react";
import Select from "react-select";
import axios from "axios";
import "./Profile.css";
import Navbar from "../components/Navbar";

const modsOption = [
	{ value: "BT1101", label: "BT1101" },
	{ value: "BT2101", label: "BT2101" },
	{ value: "BT2102", label: "BT2102" },
	{ value: "IS1108", label: "IS1108" },
	{ value: "IS1128", label: "IS1128" },
	{ value: "IS2101", label: "IS2101" },
	{ value: "IS2218", label: "IS2218" },
	{ value: "IS3103", label: "IS3103" },
	{ value: "CS1010", label: "CS1010" },
	{ value: "CS1010A", label: "CS1010A" },
	{ value: "CS1010J", label: "CS1010J" },
	{ value: "CS1010S", label: "CS1010S" },
	{ value: "CS2030", label: "CS2030" },
	{ value: "CS2030S", label: "CS2030S" },
	{ value: "CS2040", label: "CS2040" },
	{ value: "CS2040S", label: "CS2040S" },
	{ value: "CS2101", label: "CS2101" },
	{ value: "CS2103T", label: "CS2103T" },
	{ value: "MA1521", label: "MA1521" },
	{ value: "MA1522", label: "MA1522" },
	{ value: "MA2104", label: "MA2104" },
	{ value: "ST2334", label: "ST2334" },
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
							<option>Accountancy</option>
							<option>Anthropology</option>
							<option>Architecture</option>
							<option>Business Administration</option>
							<option>Business Analytics</option>
							<option>
								Business Artificial Intelligence Systems
							</option>
							<option>Business Economics</option>
							<option>Chemistry</option>
							<option>Computer Science</option>
							<option>Data Science and Analytics</option>
							<option>Economics</option>
							<option>Finance</option>
							<option>Information Security</option>
							<option>Innovation & Entrepreneurship</option>
							<option>Leadership & Human Capital Management</option>
							<option>Life Sciences</option>
							<option>Marketing</option>
							<option>Mathematics</option>
							<option>Operations & Supply Chain Management</option>
							<option>Philosophy</option>
							<option>Physics</option>
							<option>Political Science</option>
							<option>Real Estate</option>
							<option>Psychology</option>
							<option>Social Work</option>
							<option>Sociology</option>
							<option>Statistics</option>
							<option>Quantitative Finance</option>
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
