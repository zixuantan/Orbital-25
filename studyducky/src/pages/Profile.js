import React from "react";
import { Container, Card } from "react-bootstrap";

function Profile() {
	return (
		<div className="background">
			<div className="profile-side">
				<h1>Profile</h1>


			</div>

			<div className="account-side">
				<h2>Account</h2>

				<label>Name</label>
				<input type="text" placeholder="Annie"/>

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
	)
}

export default Profile;
