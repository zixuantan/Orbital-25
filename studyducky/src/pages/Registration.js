import React, { useState, useEffect } from "react";
import Select from "react-select";
import axios from "axios"; // send http req to backend
import "./Registration.css";

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
			.get(`${process.env.REACT_APP_BACKEND_URL}/me`, { withCredentials: true })
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
				`${process.env.REACT_APP_BACKEND_URL}/api/complete-registration`,
				{
					year,
					major,
					modulesTaken: selectedModules.map((mod) => mod.value),
				},
				{ withCredentials: true }
			);

			window.location.href = "/dashboard"; // go dashboard after successful registration
		} catch (err) {
			console.error("Registration error:", err);
		}
	};

	return (
		<div className="background">
			<h1 id="reg">Register</h1>
			<form className="reg-form" onSubmit={handleSubmit}>

				<label htmlFor="name">Name</label>
				<input id="name" type="text" value={name} readOnly />

				<label htmlFor="email">Email</label>
				<input id="email" type="email" value={email} readOnly />

				<label htmlFor="year">Year</label>
				<select
					id="year"
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

				<label htmlFor="major">Major</label>
				<select
					id="major"
					required
					value={major}
					onChange={(e) => setMajor(e.target.value)}
				>
					<option></option>
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
