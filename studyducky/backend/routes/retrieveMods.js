import express from "express";
import User from "../models/User.js";

const router = express.Router();

router.get("/mods/:googleId", async (req, res) => {
	try {
		const user = await User.findOne({ googleId: req.params.googleId });
		if (!user) return res.status(404).json({ error: "User not found" });

		res.json(user.modulesTaken); 
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: "Server error" });
	}
});

export default router;
