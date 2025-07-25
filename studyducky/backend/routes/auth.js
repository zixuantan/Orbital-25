import express from "express";
import passport from "passport";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

const isProd = process.env.NODE_ENV === "production";

const FRONTEND_URL = isProd
	? process.env.FRONTEND_URL_PROD
	: process.env.FRONTEND_URL;

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
			res.redirect(`${FRONTEND_URL}/main`);
		}
	}
);

router.get("/logout", (req, res) => {
	req.logout(() => {
		res.redirect("/");
	});
});

export default router;
