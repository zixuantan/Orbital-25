import React, { useState, useEffect } from "react";
import Select from "react-select";
import axios from "axios"; // send http req to backend
import "./Registration.css";

const modsOption = [
	{ value: "BT2102", label: "BT2102" },
	{ value: "IS1108", label: "IS1108" },
	{ value: "IS2101", label: "IS2101" },
	{ value: "CS2030", label: "CS2030" },
	{ value: "MA1521", label: "MA1521" },
];

function Registration() {
	// fields
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [year, setYear] = useState("");
	const [major, setMajor] = useState("");
	const [selectedModules, setSelectedModules] = useState([]);

	// auto-population of name and email
	useEffect(() => {
		axios
			.get("http://localhost:5050/me", { withCredentials: true })
			.then((res) => {
				setName(res.data.name);
				setEmail(res.data.email);
			})
			.catch((err) => {
				console.error("Failed to fetch user data:", err);
			});
	}, []);

	// submit handler
	const handleSubmit = async (e) => {
		e.preventDefault(); // prevent default form reload
		try {
			await axios.post(
				"http://localhost:5050/api/complete-registration",
				{
					year,
					major,
					modulesTaken: selectedModules.map((mod) => mod.value),
				},
				{ withCredentials: true }
			);

			window.location.href = "/dashboard"; // go to dashboard after successful registration
		} catch (err) {
			console.error("Registration error:", err);
		}
	};

	return (
		<div className="background">
			<h1 id="reg">Register</h1>
			<form className="reg-form" onSubmit={handleSubmit}>

				<label>Name</label>
				<input type="text" value={name} readOnly />

				<label>Email</label>
				<input type="email" value={email} readOnly />

				<label>Year</label>
				<select
					required
					value={year}
					onChange={(e) => setYear(e.target.value)}
				>
					<option></option>
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
				>
					<option></option>
					<option>Architecture</option>
					<option>Business Administration</option>
					<option>Business Analytics</option>
					<option>Business Artificial Intelligence Systems</option>
					<option>Computer Science</option>
				</select>

				<label>Modules taken this semester</label>
				<Select
					isMulti
					options={modsOption}
					value={selectedModules}
					onChange={setSelectedModules}
					className="module-select"
				/>

				<button type="submit" className="register-btn">
					Register
				</button>
			</form>
		</div>
	);
}

export default Registration;
