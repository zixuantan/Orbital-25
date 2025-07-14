import express from "express";
import User from "../models/User.js";

const router = express.Router();

router.post("/studytime", async (req, res) => {
    const { userId, timeSpent } = req.body; //seconds
    const dateKey = new Date().toLocaleDateString("en-CA", { timeZone: "Asia/Singapore" });

    try {
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ error: "User not found" });
        console.log("Received timeSpent:", timeSpent);

        user.studyStatistics.totalHours = (user.studyStatistics.totalHours || 0) + timeSpent / 3600;

        if (!user.studyStatistics.today || user.studyStatistics.today.date !== dateKey) {
            user.studyStatistics.today = {
                date: dateKey,
                seconds: 0
            };
        }
        user.studyStatistics.today.seconds += timeSpent;

        if (!user.studyStatistics.history) {
            user.studyStatistics.history = new Map();
        }
        const previous = user.studyStatistics.history.get(dateKey) || 0;
        user.studyStatistics.history.set(dateKey, previous + timeSpent);

        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayKey = yesterday.toLocaleDateString("en-CA", { timeZone: "Asia/Singapore" });

        if (!user.studyStatistics.history.has(yesterdayKey)) {
            user.studyStatistics.history.set(yesterdayKey, 0);
        }

        const studiedToday = user.studyStatistics.history.get(dateKey) > 0;
        const studiedYesterday = user.studyStatistics.history.get(yesterdayKey) > 0;

        if (studiedToday) {
            if (studiedYesterday) {
                user.studyStatistics.streak = (user.studyStatistics.streak || 0) + 1;
            } else {
                user.studyStatistics.streak = 1;
            }
        }

        await user.save();
        res.json({ success: true });
    } catch (err) {
        console.error("Failed to log study time:", err);
        res.status(500).json({ error: "Internal server error" });
    }
});

export default router;