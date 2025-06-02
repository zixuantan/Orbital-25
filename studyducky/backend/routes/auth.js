import express from "express";
import passport from "passport";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

const FRONTEND_URL = process.env.FRONTEND_URL;

router.get(
	"/google",
	passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
	"/google/callback",
	(req, res, next) => {
		console.log("Google hit the callback route");
		next();
	},
	passport.authenticate("google", { failureRedirect: "/" }),
	(req, res) => {
		if (!req.user.year || !req.user.major) {
			console.log("Redirecting new user to registration");
			res.redirect(`${FRONTEND_URL}/register`);
		} else {
			console.log("Redirecting existing user to homepage");
			res.redirect(`${FRONTEND_URL}/dashboard`);
		}
	}
);

router.get("/logout", (req, res) => {
	req.logout(() => {
		res.redirect("/");
	});
});

export default router;
