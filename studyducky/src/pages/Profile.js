import React from "react";
import "./Profile.css";

function Profile() {
	return (
		<div className="overall-container">
			<div className="profile-side">
				<div className="details">

					<h1>Profile</h1>

					<div className="prof">

						<img src="profilepic.png" alt="profile" width="185" height="185"></img>

						<p>Annie</p>
					</div>
					<label id="about">About</label>
					<p id="desc">Just a motivated duck trying to stay afloat in the sea of deadlines. 🐣
					Lover of matcha, late-night cramming, and productive silence.</p>
				</div>

				<div className="badge-section"> 
					<label id="badge">Badges</label>

				</div>

			</div>

			<div className="account-side">

				<div className="form-container">
					<h1>Account</h1>
					
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

				</div>
			</div>

		</div>
	);
}

export default Profile;
