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
		console.log("➡️ Google hit the callback route");
		next();
	},
	passport.authenticate("google", { failureRedirect: "/" }),
	(req, res) => {
		console.log("✅ Google auth success, redirecting to /dashboard");
		res.redirect("/dashboard");
	}
);

// Logout route
router.get("/logout", (req, res) => {
	req.logout(() => {
		res.redirect("/");
	});
});

export default router;
