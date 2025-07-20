import express from "express";
import User from "../models/User.js";

const router = express.Router();

router.put("/update-profile", async (req, res) => {
	try {
		if (!req.user) {
			return res.status(401).json({ message: "Not authenticated" });
		}

		const { year, major, modulesTaken, studyGoal } = req.body;

		const updatedUser = await User.findByIdAndUpdate(
			req.user._id,
			{ year, major, modulesTaken, studyGoal },
			{ new: true }
		);

		if (!updatedUser) {
			return res.status(404).json({ message: "User not found" });
		}

		res.status(200).json({
			message: "User profile updated",
			user: updatedUser,
		});
	} catch (err) {
		console.error("Error in update-profile route:", err);
		res.status(500).json({ message: "Server error" });
	}
});

export default router;
