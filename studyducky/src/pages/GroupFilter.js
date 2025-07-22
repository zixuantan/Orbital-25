import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import "./GroupFilter.css";
import ModulesTaken from "../components/ModsTaken";
import { useNavigate } from "react-router-dom";

function GroupFilter() {
	const [groupSelected, setGroup] = useState("");
	const [moduleSelected, setModule] = useState("");
	const [callsSelected, setCalls] = useState("");
	const [whenSelected, setWhen] = useState("");
	const [sizeSelected, setSize] = useState("");
	const [notesSelected, setNotes] = useState("");
	const [VSRSelected, setVSR] = useState("");
	const [durationSelected, setDuration] = useState("");
	const [tutorialSelected, setTutorial] = useState("");
	const [commitSelected, setCommit] = useState("");
	const [meetSelected, setMeet] = useState("");
	const [paceSelected, setPace] = useState("");
	const [googleId, setGoogleId] = useState(null);
	const [daysSelected, setDays] = useState([]);
	const navigate = useNavigate();

	useEffect(() => {
		fetch(`${process.env.REACT_APP_BACKEND_URL}/me`, {
			credentials: "include",
		})
			.then((res) => res.json())
			.then((data) => {
				if (data.googleId) {
					setGoogleId(data.googleId);
				}
			})
			.catch((err) => {
				console.error("Failed to get user info:", err);
			});
	}, []);

	const handleData = (e) => {
		e.preventDefault();
		const prefData = {
			googleId,
			type: groupSelected,
			...(groupSelected === "study" && {
				module: moduleSelected,
				calls: callsSelected,
				when: whenSelected,
				groupSize: sizeSelected,
				notes: notesSelected,
				VSR: VSRSelected,
				duration: durationSelected,
			}),
			...(groupSelected === "project" && {
				module: moduleSelected,
				tutorial: tutorialSelected,
				commitment: commitSelected,
				meeting: meetSelected,
				pace: paceSelected,
				workSlots: daysSelected,
			}),
		};
		fetch(`${process.env.REACT_APP_BACKEND_URL}/api/groupfilter`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(prefData),
		})
			.then((res) => res.json())
			.then((data) => {
				console.log("Submitted:", data);
				navigate("/groups", {
					state: {
						type: groupSelected,
						filterData: data.group,
						module: moduleSelected,
						preferences: {
							calls: callsSelected,
							when: whenSelected,
							groupSize: sizeSelected,
							notes: notesSelected,
							VSR: VSRSelected,
							duration: durationSelected,
							tutorial: tutorialSelected,
							commitment: commitSelected,
							meeting: meetSelected,
							pace: paceSelected,
							workSlots: daysSelected,
						},
					},
				});
			})
			.catch((err) => console.error("Submission error:", err));
	};

	return (
		<div className="overall-filter">
			<Navbar />
			<div className="filter-page">
				<h1 id="filter-header">GroupFinder</h1>
				<p id="quote">Find your most compatible flock now!</p>

				<form className="filter-form" onSubmit={handleData}>
					<div className="indiv">
						<span className="questions">
							First, what kind of group are you looking for?
						</span>
						<select
							className="filter-select"
							required
							value={groupSelected}
							onChange={(e) => setGroup(e.target.value)}
						>
							<option value="" hidden></option>
							<option value="study">Study Group</option>
							<option value="project">Project Group</option>
						</select>
					</div>

					{groupSelected === "study" ? (
						<div>
							<ModulesTaken
								googleId={googleId}
								selectMod={setModule}
							/>

							<div className="indiv">
								<span className="questions">
									What do you want from these calls?
								</span>
								<select
									className="filter-select"
									required
									value={callsSelected}
									onChange={(e) => setCalls(e.target.value)}
								>
									<option value="" hidden></option>
									<option value="Just having presence/accountability">
										Just having presence/accountability
									</option>
									<option value="Occasional discussions">
										Occasional discussions
									</option>
									<option value="Daily check ins">
										Daily check ins
									</option>
								</select>
							</div>

							<div className="indiv">
								<span className="questions">
									When do you prefer to study?
								</span>
								<select
									className="filter-select"
									required
									value={whenSelected}
									onChange={(e) => setWhen(e.target.value)}
								>
									<option value="" hidden></option>
									<option value="Morning (7AM - 12PM)">
										Morning (7AM - 12PM)
									</option>
									<option value="Afternoon (12PM - 5PM)">
										Afternoon (12PM - 5PM)
									</option>
									<option value="Evening (5PM - 10PM)">
										Evening (5PM - 10PM)
									</option>
								</select>
							</div>

							<div className="indiv">
								<span className="questions">
									What is your group size preference?
								</span>
								<select
									className="filter-select"
									required
									value={sizeSelected}
									onChange={(e) => setSize(e.target.value)}
								>
									<option value="" hidden></option>
									<option value="2-3">2-3</option>
									<option value="4-5">4-5</option>
									<option value="6+">6+</option>
								</select>
							</div>

							<div className="indiv">
								<span className="questions">
									Are you interested in writing notes
									together?
								</span>
								<select
									className="filter-select"
									required
									value={notesSelected}
									onChange={(e) => setNotes(e.target.value)}
								>
									<option value="" hidden></option>
									<option value="Yes">Yes</option>
									<option value="No">No</option>
								</select>
							</div>

							<div className="indiv">
								<span className="questions">
									How committed are you to the Virtual Study
									Rooms?
								</span>
								<select
									className="filter-select"
									required
									value={VSRSelected}
									onChange={(e) => setVSR(e.target.value)}
								>
									<option value="" hidden></option>
									<option value="Daily">Daily</option>
									<option value="A few times a week">
										A few times a week
									</option>
									<option value="Mostly near exams">
										Mostly near exams
									</option>
								</select>
							</div>

							<div className="indiv">
								<span className="questions">
									What is your preferred study duration?
								</span>
								<select
									className="filter-select"
									required
									value={durationSelected}
									onChange={(e) =>
										setDuration(e.target.value)
									}
								>
									<option value="" hidden></option>
									<option value="Less than 1 hour">
										Less than 1 hour
									</option>
									<option value="1-2 hours">1-2 hours</option>
									<option value="2 hours">2 hours</option>
								</select>
							</div>
						</div>
					) : groupSelected === "project" ? (
						<div>
							<ModulesTaken
								googleId={googleId}
								selectMod={setModule}
							/>

							<div className="indiv">
								<span className="questions">
									Which tutorial slot do you have? (Follow NUSMods code eg 2A)
								</span>
								<input
									type="text"
									className="filter-select"
									required
									value={tutorialSelected}
									onChange={(e) => {									
										const formattedValue = e.target.value.replace(/[^a-zA-Z0-9]/g, "").toUpperCase();
										setTutorial(formattedValue);
									}}
								/>
							</div>

							<div className="indiv">
								<span className="questions">
									What's your level of commitment?
								</span>
								<select
									className="filter-select"
									required
									value={commitSelected}
									onChange={(e) => setCommit(e.target.value)}
								>
									<option value="" hidden></option>
									<option value="1">1</option>
									<option value="2">2</option>
									<option value="3">3</option>
									<option value="4">4</option>
									<option value="5">5</option>
								</select>
							</div>

							<div className="indiv">
								<span className="questions">
									What is your preferred meeting time?
								</span>
								<select
									className="filter-select"
									required
									value={meetSelected}
									onChange={(e) => setMeet(e.target.value)}
								>
									<option value="" hidden></option>
									<option value="Morning (7AM - 12PM)">
										Morning (7AM - 12PM)
									</option>
									<option value="Afternoon (12PM - 5PM)">
										Afternoon (12PM - 5PM)
									</option>
									<option value="Evening (5PM - 10PM)">
										Evening (5PM - 10PM)
									</option>
								</select>
							</div>

							<div className="indiv">
								<span className="questions">
									What is your work pace preference?
								</span>
								<select
									className="filter-select"
									required
									value={paceSelected}
									onChange={(e) => setPace(e.target.value)}
								>
									<option value="" hidden></option>
									<option value="Start early">Start early</option>
									<option value="Balanced pace">
										Balanced pace
									</option>
									<option value="Cram last minute">
										Cram last minute
									</option>
								</select>
							</div>

							<div className="indiv">
								<span className="questions">
									What are your preferred work slots?
								</span>
								<div className="checkbox-portion">
									{[
										"Monday",
										"Tuesday",
										"Wednesday",
										"Thursday",
										"Friday",
									].map((day) => (
										<div className="checkbox-row" key={day}>
											<input
												type="checkbox"
												id={day}
												name={day}
												className="checkbox"
												checked={daysSelected.includes(
													day
												)}
												onChange={(e) => {
													if (e.target.checked) {
														setDays((prev) => [
															...prev,
															day,
														]);
													} else {
														setDays((prev) =>
															prev.filter(
																(slot) =>
																	slot !== day
															)
														);
													}
												}}
											/>
											<label for={day}>{day}</label>
										</div>
									))}
								</div>
							</div>
						</div>
					) : null}
					<button type="submit" className="search-btn">
						Find Group
					</button>
				</form>
			</div>
		</div>
	);
}

export default GroupFilter;
