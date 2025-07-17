import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import "./VirtualStudyRoom.css";
import socket from "../socket";

function VirtualStudyRoom() {
	const { groupId } = useParams();
	const [group, setGroup] = useState(null);
	const [user, setUser] = useState(null);
	const [usersRoom, setUsersRoom] = useState([]);
	const [startTime, setStartTime] = useState(null);
	const [timeStudied, setTimeStudied] = useState(0);
	const [eyesOpen, setEyesOpen] = useState(true);
	const deskPositions = [
		{ top: "3%", left: "-10%" },
  		{ top: "3%", left: "11.2%" },
  		{ top: "3%", left: "33.6%" },
  		{ top: "3%", left: "55.5%" },
  		{ top: "36.4%", left: "-12%" },
  		{ top: "36.4%", left: "9.6%" },
  		{ top: "36.4%", left: "33.6%" },
  		{ top: "36.4%", left: "57.3%" }
	];
	const formatTime = (seconds) => {
		const hour = String(Math.floor(seconds / 3600)).padStart(2, '0');
		const min = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
		const sec = String(seconds % 60).padStart(2, '0');
		return `${hour}:${min}:${sec}`;
	};

	useEffect(() => {
		socket.on("connect", () => {
			console.log("Socket connected to server:", socket.id);
		});
	}, []);

	useEffect(() => {
			console.log("Fetching group with ID:", groupId);
			fetch(`${process.env.REACT_APP_BACKEND_URL}/api/group/${groupId}`)
				.then((res) => res.json())
				.then((data) => {
					console.log("Fetched group data:", data);
					setGroup(data.group);
				})
				.catch((err) => {
					console.error("Error fetching group:", err);
				});
		}, [groupId]);

	useEffect(() => {
		fetch(`${process.env.REACT_APP_BACKEND_URL}/me`, {
			credentials: "include",
		})
			.then((res) => res.json())
			.then((data) => {
				console.log("User from /me:", data);
				setUser(data);
			})
			.catch((err) => console.error("Failed to fetch user:", err));
	}, []);

	useEffect(() => {
		if (!group) return; 

    	fetch(`${process.env.REACT_APP_BACKEND_URL}/api/group/${groupId}/studyroom?type=${group.type}`, {
      		credentials: "include",
    	})
		.then((res) => res.json())
      	.then((data) => setUsersRoom(data.users))
      	.catch((err) => console.error("Failed to fetch users", err));
  	}, [groupId]);

	useEffect(() => {
		if (!groupId || !user) return;
		if (!user?.name) {
			console.warn("User missing name before emitting joinStudyRoom", user);
		}

		const now = Date.now();
  		setStartTime(now);

		console.log("Joining studyroom with:", { groupId, user });
		
		
		socket.emit("joinStudyRoom", { groupId, user });

		socket.on("update-users", (users) => {
			setUsersRoom(users);
		});

		return () => {
			if (!user?._id) {
			console.warn("Skipping studytime: user is undefined");
			return;
		}
			const end = Date.now();
    		const timeSpent = Math.floor((end - now) / 1000); //seconds

			fetch(`${process.env.REACT_APP_BACKEND_URL}/api/studytime`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				credentials: "include",
				body: JSON.stringify({
					userId: user._id,
					timeSpent, //in seconds
				}),
			}).catch((err) => console.error("Failed to log study time:", err));

			socket.emit("leaveStudyRoom", { groupId, userId: user._id });
			socket.off("update-users");
		};
	}, [groupId, user]);

	useEffect(() => {
		let interval = null;
		if (startTime) {
			interval = setInterval(() => {
			setTimeStudied(Math.floor((Date.now() - startTime) / 1000)); 
			}, 1000);
		}

		return () => clearInterval(interval);
		}, [startTime]);

	useEffect(() => {
		const interval = setInterval(() => {
			setEyesOpen(false);
			setTimeout(() => setEyesOpen(true), 150); 
		}, 5000); 
		return () => clearInterval(interval);
	}, []);

	return (
		<div className="studyroom-page">
			<div className="studyroom-top">
				<Link to={`/chat/${groupId}`} className="backchat-btn">⮜</Link>
				<h1 className="studyroom-header">Virtual Study Room</h1>
				<Link to={`/avatar/${groupId}`}>
					<button className="custom-btn">Customize Avatar</button>
				</Link>
			</div>
			<div className="room">
				<h2 className="timer">{formatTime(timeStudied)}</h2>

				{usersRoom.map((user, index) => {
					const pos = deskPositions[index]; 
					return (
						<div className="duck-avatar"
						key={user._id}
						style={{ top: pos.top, left: pos.left }}>
							<p className="username">{user.name}</p>

							<div className="user-duck">
								<img src={`/duck-${user.avatar_color || "yellow"}.svg`}
								alt={`${user.name}'s duck`}
								className="duck-image"/>
								<img src={eyesOpen ? "/eyes-open.svg" : "/eyes-closed.svg"} className="eyes" alt="eyes" />							
								<img src={`/arms-${user.avatar_color || "yellow"}.svg`} alt="arms" className="arms"/>
								<img src="/laptop.png" alt="laptop" className="laptop"/>
							</div>
						
						</div>
					);
				})}
			</div>
			
		</div>
	);
};

export default VirtualStudyRoom;
//{group ? (
//					<h2 className="study-name">{group.name}</h2>
//				) : (
//					<p>Loading StudyRoom</p>
//				)}