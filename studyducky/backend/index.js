import express from "express";
import dotenv from "dotenv";
import session from "express-session";
import passport from "passport";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.js";
import "./config/passport.js";
import registerRoutes from "./routes/register.js";
import cors from "cors"; // backend and frontend run on different ports

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 5050;

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
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
			secure: false,
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

app.get("/me", (req, res) => {
	console.log("User in session:", req.user);
	res.json(req.user || { message: "Not logged in" });
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

app.listen(PORT, () => {
	console.log(`Server running at http://localhost:${PORT}`);
});
