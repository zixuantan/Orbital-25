import express from "express";
import dotenv from "dotenv";
import session from "express-session";
import passport from "passport";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.js";
import "./config/passport.js";

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 5050;

// Session middleware
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

app.get("/me", (req, res) => {
	console.log("User in session:", req.user);
	res.json(req.user || { message: "Not logged in" });
});

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/auth", authRoutes);

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

app.get("/test", (req, res) => {
	console.log("Route /test hit");
	res.send("Test route working");
});

app.listen(PORT, () => {
	console.log(`Server running at http://localhost:${PORT}`);
});
