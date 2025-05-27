import React, { useState } from "react";
import Select from 'react-select';
import "./Profile.css";

const modsOption = [
  { value: 'BT2102', label: 'BT2102' },
  { value: 'IS1108', label: 'IS1108' },
  { value: 'IS2101', label: 'IS2101' },
  { value: 'CS2030', label: 'CS2030' },
  { value: 'MA1521', label: 'MA1521' },
];

function Profile() {
	const [selectedMods, setSelectedMods] = useState(modsOption.filter(mod =>
		['BT2102', 'IS2101', 'MA1521'].includes(mod.value)));
	
	return (
		<div className="overall-container">
			<div className="profile-side">

				<h1>Profile</h1>

				<div className="details">
					<div className="prof">

						<img src="profilepic.png" alt="profile" width="185" height="185"></img>

						<p>Annie</p>

					</div>

					<p id="about">About</p>
					<p id="desc">Just a motivated duck trying to stay afloat in the sea of deadlines. 🐣
					Lover of matcha, late-night cramming, and productive silence.</p>

				</div>

				<p id="badge">Badges</p>

				<div className="badge-section"> 
					<div className="first">

						<img src="firstbadge.png" alt="Just Getting Started" width="100" height="100"></img>
						<p id="first-title">Just Getting Started</p>
						<p id="first-desc">Join the Flock</p>

					</div>
					<div className="second">

						<img src="lockbadge.png" alt="Lock It In" width="100" height="100"></img>
						<p id="second-title">Lock It In</p>
						<p id="second-desc">Study more than an hour consecutively</p>

					</div>
				</div>
			</div>
			<div className="account-side">				
				<div className="form-container">
					
					<label>Name</label>
					<input type="text" value="Annie" readonly/>

					<label>Year</label>
					<select required>
						<option disabled selected>1</option>
						<option>2</option>
						<option>3</option>
						<option>4</option>
					</select>

					<label>Major</label>
					<select required>
						<option disabled selected>Business Analytics</option>
						<option>Architecture</option>
						<option>Business Administration</option>
						<option>Business Artificial Intelligence Systems</option>
						<option>Computer Science</option>
					</select>

					<label>Modules taken this semester</label>
					<Select
					options={modsOption}
        			isMulti
        			value={selectedMods}
        			onChange={setSelectedMods}
					/>

					<button type="submit" className="edit-btn">Edit</button>

				</div>
			</div>
		</div>
	);
}

export default Profile;
