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
import files from "./routes/files.js";
import cors from "cors"; // backend and frontend run on different ports

import { createServer } from "http";
import { Server } from "socket.io";

dotenv.config();

const isProd = process.env.NODE_ENV === "production";

const FRONTEND_URL = isProd
	? process.env.FRONTEND_URL_PROD
	: process.env.FRONTEND_URL;

const CALLBACK_URL = isProd
	? process.env.CALLBACK_URL_PROD
	: process.env.CALLBACK_URL;

connectDB();

const app = express();
const PORT = process.env.PORT || 5050;

app.use(
	cors({
		origin: FRONTEND_URL,
		credentials: true,
	})
);
app.use(express.json());

// Session
app.use(
	session({
		secret: process.env.SESSION_SECRET,
		resave: false,
		saveUninitialized: false,
		cookie: {
			httpOnly: true,
			sameSite: "lax",
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

const io = new Server(httpServer, {
	cors: {
		origin: [FRONTEND_URL, "http://localhost:3000"],
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

	socket.on("disconnect", () => {
		console.log("User disconnected:", socket.id);
	});
});

httpServer.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
