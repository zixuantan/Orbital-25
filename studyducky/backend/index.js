import express from "express";
import dotenv from "dotenv";
import session from "express-session";
import passport from "passport";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.js";
import "./config/passport.js";
import registerRoutes from "./routes/register.js";
import updateProfile from "./routes/updateProfile.js";
import retrieveMods from "./routes/retrieveMods.js";
import groupFilter from "./routes/groupFilter.js"; //filter
import groupRoutes from "./routes/groups.js"; //show groups in db
import joinGroup from "./routes/joinGroup.js";
import retrieveChat from "./routes/retrieveChat.js";
import retrieveGroups from "./routes/retrieveGroups.js";
import messageRoutes from "./routes/messageRoutes.js";
import googleDrive from "./routes/googleDrive.js";
import retrieveRoomUsers from "./routes/retrieveRoomUsers.js";
import files from "./routes/files.js";
import studyTime from "./routes/studyTime.js";
import cors from "cors"; // backend and frontend run on different ports

import { createServer } from "http";
import { Server } from "socket.io";

dotenv.config();
console.log("CURRENT ENVIRONMENT index.js:", process.env.NODE_ENV);

const isProd = process.env.NODE_ENV === "production";

const FRONTEND_URL_PROD = process.env.FRONTEND_URL_PROD;
const FRONTEND_URL = isProd
	? process.env.FRONTEND_URL_PROD
	: process.env.FRONTEND_URL;

console.log("FRONTEND_URL_PROD from env:", FRONTEND_URL_PROD);
console.log("FRONTEND_URL selected:", FRONTEND_URL);

const allowedOrigins = [FRONTEND_URL, FRONTEND_URL_PROD];

const logOrigin = (req, res, next) => {
	console.log("Request Origin:", req.headers.origin);
	next();
};

connectDB();

const app = express();
app.set("trust proxy", 1);
const PORT = process.env.PORT || 5050;

app.use(logOrigin);

app.use(
	cors({
		origin: function (origin, callback) {
			if (!origin || allowedOrigins.includes(origin)) {
				callback(null, true);
			} else {
				console.warn("CORS rejected origin:", origin);
				callback(new Error("Not allowed by CORS"));
			}
		},
		credentials: true,
	})
);
app.use(express.json()); //added in after issue with sending msges in gc
// Session
app.use(
	session({
		secret: process.env.SESSION_SECRET,
		resave: false,
		saveUninitialized: false,
		cookie: {
			httpOnly: true,
			sameSite: "none",
			secure: isProd,
			maxAge: 24 * 60 * 60 * 1000,
		},
	})
);

// Passport
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/auth", authRoutes);
app.use("/api", registerRoutes);
app.use("/api", updateProfile);
app.use("/api", retrieveMods);
app.use("/api", groupFilter);
app.use("/api/groups", groupRoutes);
app.use("/api", joinGroup);
app.use("/api", retrieveChat);
app.use("/api", retrieveGroups);
app.use("/api", messageRoutes);
app.use("/api/drive", googleDrive);
app.use("/api/drive", files);
app.use("/api/group", retrieveRoomUsers);
app.use("/api", studyTime);

app.get("/me", (req, res) => {
	console.log("User in session:", req.user); // req.user populated by Passport.js after successful auth
	res.json(req.user || { message: "Not logged in" }); // if user is logged in and session is valid, sends user obj as JSON back to frontend, else sends not logged in
});

app.get("/", (req, res) => {
	res.send("Home Page");
});

app.get("/dashboard", (req, res) => {
	if (req.isAuthenticated()) {
		res.send(`Welcome, ${req.user.name}`);
	} else {
		res.redirect("/");
	}
});

app.get("/debug-session", (req, res) => {
	res.json({
		session: req.session,
		user: req.user,
	});
});

const httpServer = createServer(app);

const studyRoomUsers = {}; 

const io = new Server(httpServer, {
	cors: {
		origin: function (origin, callback) {
			if (!origin || allowedOrigins.includes(origin)) {
				callback(null, true);
			} else {
				console.warn("SOCKET CORS rejected origin:", origin);
				callback(new Error("Socket origin not allowed"));
			}
		},
		credentials: true,
	},
});

io.on("connection", (socket) => {
	console.log("User connected:", socket.id);

	socket.on("joinRoom", ({ groupId }) => {
		socket.join(groupId);
		console.log(`User ${socket.id} joined room ${groupId}`);
	});

	socket.on("sendMessage", (messageData) => {
		io.to(messageData.groupId).emit("receiveMessage", messageData);
	});

	socket.on("joinStudyRoom", ({ groupId, user }) => {
		console.log("joinStudyRoom triggered with:", { groupId, user });

  	if (!user || !user.name) {
    	console.error("User is missing or incomplete:", user);
    	return; 
  	}

		console.log(`${user.name} joined studyroom ${groupId}`);
		socket.join(groupId);
		socket.groupId = groupId;
		socket.user = user;

		if (!studyRoomUsers[groupId]) {
			studyRoomUsers[groupId] = [];
		}

		if (!studyRoomUsers[groupId].some((u) => u.id === user.id)) {
		studyRoomUsers[groupId].push(user);
		}

		io.to(groupId).emit("update-users", studyRoomUsers[groupId]);
	});

	socket.on("leaveStudyRoom", ({ groupId, userId }) => {
		console.log(`User ${userId} left studyroom ${groupId}`);
		socket.leave(groupId);

		if (studyRoomUsers[groupId]) {
			studyRoomUsers[groupId] = studyRoomUsers[groupId].filter(
				(u) => u.id !== userId
			);
			io.to(groupId).emit("update-users", studyRoomUsers[groupId]);
		}
	});

	socket.on("disconnect", () => {
		console.log("User disconnected:", socket.id);
		const { groupId, user } = socket;

		if (groupId && user && studyRoomUsers[groupId]) {
			studyRoomUsers[groupId] = studyRoomUsers[groupId].filter(
				(u) => u.id !== user.id
			);
			io.to(groupId).emit("update-users", studyRoomUsers[groupId]);
		}
	});
});

httpServer.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
