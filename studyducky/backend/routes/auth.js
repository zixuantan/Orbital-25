import express from "express";
import passport from "passport";

const router = express.Router();

// Start Google login
router.get(
	"/google",
	passport.authenticate("google", { scope: ["profile", "email"] })
);

// Callback route from Google
router.get(
	"/google/callback",
	(req, res, next) => {
		console.log("Google hit the callback route");
		next();
	},
	passport.authenticate("google", { failureRedirect: "/" }),
	(req, res) => {
		// Check if the user has filled out their profile
		if (!req.user.year || !req.user.major) {
			console.log("Redirecting new user to registration");
			res.redirect("http://localhost:3000/register");
		} else {
			console.log("Redirecting existing user to homepage");
			res.redirect("http://localhost:3000/dashboard");
		}
	}
);

// Logout route
router.get("/logout", (req, res) => {
	req.logout(() => {
		res.redirect("/");
	});
});

export default router;
