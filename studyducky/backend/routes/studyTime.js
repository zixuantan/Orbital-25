import express from "express";
import User from "../models/User.js";

const router = express.Router();

router.post("/studytime", async (req, res) => {
	const { userId, timeSpent } = req.body; //seconds
	const dateKey = new Date().toLocaleDateString("en-CA", {
		timeZone: "Asia/Singapore",
	});

	try {
		const user = await User.findById(userId);
		if (!user) return res.status(404).json({ error: "User not found" });
		console.log("Received timeSpent:", timeSpent);

		user.studyStatistics.totalHours =
			(user.studyStatistics.totalHours || 0) + timeSpent / 3600;

		if (
			!user.studyStatistics.today ||
			user.studyStatistics.today.date !== dateKey
		) {
			user.studyStatistics.today = {
				date: dateKey,
				seconds: 0,
			};
		}
		user.studyStatistics.today.seconds += timeSpent;

		if (!user.studyStatistics.history) {
			user.studyStatistics.history = new Map();
		}
		const previous = user.studyStatistics.history.get(dateKey) || 0;
		user.studyStatistics.history.set(dateKey, previous + timeSpent);

		let streak = 0;
		const todayDate = new Date(dateKey);

		for (let i = 0; ; i++) {
			const date = new Date(todayDate);
			date.setDate(todayDate.getDate() - i);
			const key = date.toLocaleDateString("en-CA", {
				timeZone: "Asia/Singapore",
			});

			if (
				user.studyStatistics.history.has(key) &&
				user.studyStatistics.history.get(key) > 0
			) {
				streak++;
			} else {
				break;
			}
		}

		user.studyStatistics.streak = streak;

		await user.save();
		res.json({ success: true });
	} catch (err) {
		console.error("Failed to log study time:", err);
		res.status(500).json({ error: "Internal server error" });
	}
});

router.post("/avatarcolor", async (req, res) => {
	const { userId, color } = req.body;
	const avatarColors = [
		"yellow",
		"blue",
		"red",
		"green",
		"pink",
		"purple",
		"grey",
		"white",
		"brown",
	];

	if (!avatarColors.includes(color)) {
		return res.status(400).json({ error: "Invalid color" });
	}

	try {
		const user = await User.findByIdAndUpdate(
			userId,
			{ avatar_color: color },
			{ new: true }
		);
		if (!user) return res.status(404).json({ error: "User not found" });

		res.json({ success: true, avatar_color: user.avatar_color });
	} catch (err) {
		console.error("Failed to update avatar color:", err);
		res.status(500).json({ error: "Internal server error" });
	}
});

router.get("/user/:userId/studystats", async (req, res) => {
	try {
		const user = await User.findOne({ googleId: req.params.userId });
		if (!user) return res.status(404).json({ error: "User not found" });

		const history =
			user.studyStatistics.history instanceof Map
				? Object.fromEntries(user.studyStatistics.history)
				: user.studyStatistics.history;

		res.json({
			today: user.studyStatistics.today,
			history,
			totalHours: user.studyStatistics.totalHours,
			streak: user.studyStatistics.streak,
		});
	} catch (err) {
		console.error("Failed to get study stats:", err);
		res.status(500).json({ error: "Internal server error" });
	}
});

export default router;
